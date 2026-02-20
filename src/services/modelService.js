import * as tmImage from '@teachablemachine/image';
import { WASTE_TYPES, MODEL_LABEL_MAP } from '../utils/labels';

class ModelService {
  constructor() {
    this.configs = {
      mini: { path: `${import.meta.env.BASE_URL}models/mini/` },
      huge: { path: `${import.meta.env.BASE_URL}models/huge/` }
    };

    this.cache = new Map();
    this.activeSize = 'mini';
    this.isBootstraping = false;
    this.threshold = 0.65;
  }

  set active(size) {
    if (this.configs[size]) {
      this.activeSize = size;
    }
  }

  get active() {
    return this.activeSize;
  }

  async initialize(size = this.activeSize) {
    if (this.cache.has(size)) return this.cache.get(size).model;

    if (this.isBootstraping) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (!this.isBootstraping) {
            clearInterval(check);
            resolve(this.cache.get(size)?.model);
          }
        }, 100);
      });
    }

    this.isBootstraping = true;

    try {
      const config = this.configs[size];
      const model = await tmImage.load(
        `${config.path}model.json`,
        `${config.path}metadata.json`
      );

      const labels = model.getClassLabels();
      this.cache.set(size, { model, labels });

      return model;
    } catch (error) {
      console.error(`[Engine] Failed to load ${size}:`, error);
      throw error;
    } finally {
      this.isBootstraping = false;
    }
  }

  getCategories(size = this.activeSize) {
    const data = this.cache.get(size);
    if (!data) return [];

    return data.labels.map(label => {
      const id = MODEL_LABEL_MAP[label.toLowerCase()] || label.toLowerCase();
      return WASTE_TYPES[id] || { arabic: label, name: label };
    });
  }

  async predict(source) {
    const engine = await this.initialize();
    const raw = await engine.predict(source);
    
    raw.sort((a, b) => b.probability - a.probability);
    
    const top = raw[0];
    const score = top.probability;

    if (score < this.threshold) {
      return {
        ...WASTE_TYPES.unknown,
        confidence: (score * 100).toFixed(1),
        isLowConfidence: true
      };
    }

    const label = top.className.toLowerCase();
    const key = MODEL_LABEL_MAP[label] || label;
    const meta = WASTE_TYPES[key] || WASTE_TYPES.unknown;

    return {
      ...meta,
      confidence: (score * 100).toFixed(1),
      key
    };
  }
}

export default new ModelService();
