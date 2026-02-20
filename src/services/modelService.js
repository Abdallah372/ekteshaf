import * as tmImage from '@teachablemachine/image';
import { WASTE_TYPES, MODEL_LABEL_MAP } from '../utils/labels';

class ModelService {
  constructor() {
    this.models = {
      mini: { model: null, labels: [], path: '/models/mini/' },
      huge: { model: null, labels: [], path: '/models/huge/' }
    };
    this.currentSize = "mini";
    this.loading = false;
    this.confidenceThreshold = 0.65; // Minimum confidence to accept a prediction
  }

  setModelSize(size) {
    if (this.models[size]) {
      this.currentSize = size;
      return true;
    }
    return false;
  }

  /**
   * Loads the model of the current size if it hasn't been loaded yet.
   */
  async loadModel(size = this.currentSize) {
    const config = this.models[size];
    if (config.model) return config.model;

    if (this.loading) {
      while (this.loading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.models[size].model;
    }

    this.loading = true;

    try {
      const checkpointURL = config.path + "model.json";
      const metadataURL = config.path + "metadata.json";

      console.log(`Loading ${size} Model from ${config.path}...`);
      config.model = await tmImage.load(checkpointURL, metadataURL);
      config.labels = config.model.getClassLabels();
      
      console.log(`${size} Model Loaded Successfully. Labels:`, config.labels);
      return config.model;
    } catch (err) {
      console.error(`Model Loading Error (${size}):`, err);
      throw new Error(`فشل تحميل نموذج ${size}. يرجى التحقق من الملفات.`);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Returns categories covered by a specific model.
   */
  getModelCategories(size = this.currentSize) {
    const labels = this.models[size].labels;
    return labels.map(label => {
      const key = MODEL_LABEL_MAP[label.toLowerCase()] || label.toLowerCase();
      return WASTE_TYPES[key] || { arabic: label, name: label };
    });
  }

  /**
   * Classifies an image and handles low confidence as "Unknown".
   */
  async classifyWaste(imageElement) {
    try {
      const model = await this.loadModel();
      const predictions = await model.predict(imageElement);
      
      // Sort predictions by probability descending
      predictions.sort((a, b) => b.probability - a.probability);
      
      const topPrediction = predictions[0];
      const confidence = topPrediction.probability;
      
      // Handle "Unknown" if confidence is too low
      if (confidence < this.confidenceThreshold) {
        return {
          ...WASTE_TYPES.unknown,
          confidence: (confidence * 100).toFixed(1),
          lowConfidence: true
        };
      }

      const label = topPrediction.className.toLowerCase();
      const internalKey = MODEL_LABEL_MAP[label] || label;
      const categoryData = WASTE_TYPES[internalKey] || WASTE_TYPES.unknown;

      return {
        ...categoryData,
        confidence: (confidence * 100).toFixed(1),
        categoryKey: internalKey
      };
    } catch (err) {
      console.error("Classification Error:", err);
      throw new Error("فشلت عملية التحليل. يرجى المحاولة مرة أخرى.");
    }
  }
}

const serviceInstance = new ModelService();
export default serviceInstance;
