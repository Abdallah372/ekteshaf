import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Brain, SwitchCamera, X, Info, LayoutGrid, Loader2 } from 'lucide-react';
import modelService from '../services/modelService';
import statsService from '../services/statsService';
import ResultCard from './ResultCard';

const Analyzer = () => {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeModel, setActiveModel] = useState("mini");
  const [showModelCategories, setShowModelCategories] = useState(true);

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    loadSelectedModel(activeModel);
  }, []);

  const loadSelectedModel = async (size) => {
    try {
      modelService.setModelSize(size);
      await modelService.loadModel();
      setError(null);
    } catch (err) {
      setError("فشل تحميل نموذج الذكاء الاصطناعي");
    }
  };

  const handleModelChange = (size) => {
    setActiveModel(size);
    loadSelectedModel(size);
    setResult(null);
  };

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("يرجى منح صلاحية الكاميرا للبدء");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      setPreview(canvas.toDataURL('image/jpeg'));
      setResult(null);
      stopCamera();
    }
  };

  const processImage = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      // Simulate specialized AI processing delay for UX feel
      await new Promise(r => setTimeout(r, 1200));
      const classification = await modelService.classifyWaste(imageRef.current);
      setResult(classification);
      if (!classification.lowConfidence) {
        statsService.addScan(classification);
      }
    } catch (err) {
      setError("فشل محرك التحليل الذكي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Minimal Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-card p-5 border-white/5">
         <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl">
               <Brain size={20} />
            </div>
            <h3 className="text-lg font-black text-white">محرك الرؤية</h3>
         </div>

         <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-white/5">
            <button 
               onClick={() => handleModelChange("mini")}
               className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeModel === "mini" ? 'bg-primary text-slate-950 shadow-lg glow-primary' : 'text-slate-400 hover:text-white'}`}
            >
               سريع
            </button>
            <button 
               onClick={() => handleModelChange("huge")}
               className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeModel === "huge" ? 'bg-primary text-slate-950 shadow-lg glow-primary' : 'text-slate-400 hover:text-white'}`}
            >
               دقيق
            </button>
         </div>
      </div>

      <AnimatePresence>
        {showModelCategories && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/40 backdrop-blur border border-white/50 rounded-[32px] overflow-hidden"
          >
            <div className="p-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
               {modelService.getModelCategories(activeModel).map((cat, i) => (
                 <div key={i} className="glass-card p-5 bg-white/60 hover:bg-white transition-all flex flex-col items-center gap-3 border-white">
                    <div className={`w-12 h-12 rounded-2xl ${cat.color || 'bg-slate-200'} flex items-center justify-center text-white shadow-lg`}>
                       <LayoutGrid size={20} />
                    </div>
                    <span className="font-black text-[11px] text-primary">{cat.arabic}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        {/* Interaction Zone */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-card p-6 flex-grow flex flex-col items-center justify-center border-white/80 relative group">
            
            <div className="relative w-full aspect-video rounded-[24px] bg-slate-900/5 overflow-hidden border-2 border-dashed border-slate-200 group-hover:border-primary/20 transition-all flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isCameraOpen ? (
                  <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex items-end justify-center pb-12">
                       <div className="flex gap-6">
                         <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-3xl hover:scale-105 active:scale-95 transition-all text-primary ring-8 ring-white/10">
                            <Camera size={32} />
                         </button>
                         <button onClick={stopCamera} className="w-20 h-20 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-all">
                            <X size={32} />
                         </button>
                       </div>
                    </div>
                  </motion.div>
                ) : preview ? (
                  <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <img ref={imageRef} src={preview} alt="Input" className="w-full h-full object-cover" onLoad={processImage} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={startCamera} className="btn-primary py-3 px-6 text-sm">
                          <SwitchCamera size={18} /> التغيير
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-12">
                     <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl text-secondary animate-float">
                        <Camera size={48} />
                     </div>
                     <h4 className="text-2xl font-black text-primary mb-3">ابدأ الفرز الذكي</h4>
                     <p className="text-sm font-bold text-slate-400 max-w-xs mx-auto leading-relaxed">
                        استخدم الكاميرا أو قم برفع صورة لفرز النفايات بذكاء اصطناعي فائق السرعة.
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full mt-8">
               <button 
                  onClick={startCamera}
                  disabled={loading || isCameraOpen}
                  className="h-20 bg-primary text-white rounded-[24px] font-black text-lg shadow-2xl shadow-primary/20 hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center justify-center gap-4 group"
               >
                  <Camera className="group-hover:scale-110 transition-transform" /> الكاميرا
               </button>
               <button 
                  onClick={() => fileInputRef.current.click()}
                  disabled={loading || isCameraOpen}
                  className="h-20 bg-white border-2 border-slate-100 text-primary rounded-[24px] font-black text-lg hover:bg-slate-50 transition-all disabled:opacity-50 flex items-center justify-center gap-4 group"
               >
                  <Upload className="group-hover:scale-110 transition-transform" /> رفع صورة
               </button>
               <input type="file" ref={fileInputRef} onChange={(e) => {
                  const f = e.target.files[0];
                  if(f) {
                     const r = new FileReader(); r.onload = (ev) => { setPreview(ev.target.result); setResult(null); }; r.readAsDataURL(f);
                  }
               }} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        {/* Results Hub */}
        <div className="lg:col-span-5">
           <AnimatePresence mode="wait">
             {loading ? (
               <motion.div 
                 key="l" 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="glass-card h-full flex flex-col items-center justify-center p-12 text-center"
               >
                  <div className="relative w-48 h-48 mb-12">
                     <div className="absolute inset-0 rounded-[40px] border-[16px] border-slate-50" />
                     <div className="absolute inset-0 rounded-[40px] border-[16px] border-secondary border-t-transparent animate-spin" />
                     <Loader2 className="absolute inset-0 m-auto text-secondary animate-spin-slow" size={64} />
                  </div>
                  <h4 className="text-3xl font-black text-primary mb-2">جاري المعالجة...</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                     Neural Network Inference in Progress
                  </p>
               </motion.div>
             ) : result ? (
               <ResultCard key="r" result={result} />
             ) : (
               <div className="glass-card h-full border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-20 text-slate-300">
                  <Info size={64} className="mb-8 opacity-20" />
                  <h4 className="text-xl font-black opacity-40">بانتظار البيانات</h4>
                  <p className="text-xs font-bold opacity-30 mt-2">صور المنتج للحصول على التحليل</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Analyzer;
