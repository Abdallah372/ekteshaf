import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Upload, Brain, SwitchCamera, X, Info, LayoutGrid, Loader2,
  CupSoda, FileText, Container, FlaskConical, Shirt, Footprints, Package, Apple, Battery, HelpCircle 
} from 'lucide-react';
import engine from '../services/modelService';
import ResultCard from './ResultCard';

const CategoryIcons = {
  CupSoda, FileText, Container, FlaskConical, Shirt, Footprints, Package, Apple, Battery, HelpCircle
};

const Analyzer = () => {
  const [stream, setStream] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [mode, setMode] = useState('mini');
  const [inventory, setInventory] = useState([]);

  const fileRef = useRef(null);
  const viewRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    bootstrap(mode);
  }, []);

  const bootstrap = async (target) => {
    try {
      engine.active = target;
      await engine.initialize();
      setInventory(engine.getCategories(target));
      setError(null);
    } catch (err) {
      setError("Model initialization failed");
    }
  };

  const switchMode = (target) => {
    setMode(target);
    bootstrap(target);
    setResult(null);
  };

  const bootCamera = async () => {
    try {
      setCameraActive(true);
      const media = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) videoRef.current.srcObject = media;
    } catch (err) {
      setError("Please grant camera access");
      setCameraActive(false);
    }
  };

  const killCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  const snapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const c = canvasRef.current;
      c.width = videoRef.current.videoWidth;
      c.height = videoRef.current.videoHeight;
      c.getContext('2d').drawImage(videoRef.current, 0, 0);
      setStream(c.toDataURL('image/jpeg'));
      setResult(null);
      killCamera();
    }
  };

  const runInterference = async () => {
    if (!stream) return;
    setIsProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const output = await engine.predict(viewRef.current);
      setResult(output);
    } catch (err) {
      setError("Vision engine failure");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-card p-5 border-white/5">
         <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl">
               <Brain size={20} />
            </div>
            <h3 className="text-lg font-black text-white">محرك الرؤية</h3>
         </div>

         <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-white/5">
            <button 
               onClick={() => switchMode('mini')}
               className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${mode === 'mini' ? 'bg-primary text-slate-950 glow-primary' : 'text-slate-400 hover:text-white'}`}
            >
               سريع
            </button>
            <button 
               onClick={() => switchMode('huge')}
               className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${mode === 'huge' ? 'bg-primary text-slate-950 glow-primary' : 'text-slate-400 hover:text-white'}`}
            >
               دقيق
            </button>
         </div>
      </div>

      <div className="glass-panel overflow-hidden border-white/5 bg-slate-900/40">
         <div className="p-4 sm:p-8 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {inventory.map((item, id) => (
              <motion.div 
                key={id} 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-4 bg-slate-800/10 border-white/5 hover:border-primary/20 transition-all flex flex-col items-center text-center gap-3"
              >
                 <div className={`w-14 h-14 rounded-2xl ${item.color || 'bg-primary/10'} flex items-center justify-center text-white relative group`}>
                    <div className="absolute inset-0 bg-inherit blur-lg opacity-40 group-hover:opacity-100 transition-opacity" />
                    {(() => {
                        const Icon = CategoryIcons[item.icon] || LayoutGrid;
                        return <Icon size={24} className="relative z-10" />;
                    })()}
                 </div>
                 <div>
                    <h4 className="font-black text-xs text-white mb-1">{item.arabic}</h4>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-card p-6 flex-grow flex flex-col items-center justify-center border-white/5 relative group">
            <div className="relative w-full aspect-video rounded-[24px] bg-slate-950/20 overflow-hidden border-2 border-dashed border-white/5 group-hover:border-primary/20 transition-all flex items-center justify-center">
              <AnimatePresence mode="wait">
                {cameraActive ? (
                  <motion.div key="vid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end justify-center pb-12">
                       <div className="flex gap-6">
                         <button onClick={snapshot} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all text-primary">
                            <Camera size={32} />
                         </button>
                         <button onClick={killCamera} className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-all">
                            <X size={32} />
                         </button>
                       </div>
                    </div>
                  </motion.div>
                ) : stream ? (
                  <motion.div key="img" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <img ref={viewRef} src={stream} alt="Source" className="w-full h-full object-cover" onLoad={runInterference} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={bootCamera} className="btn-primary py-3 px-8">
                          <SwitchCamera size={18} /> إعادة المسح
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="init" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-12">
                     <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-primary">
                        <Camera size={48} />
                     </div>
                     <h4 className="text-2xl font-black text-white mb-3">مسح ذكي</h4>
                     <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto">
                        قم بتفعيل الكاميرا أو رفع صورة لبدء التحليل العصبي للنفايات.
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full mt-8">
               <button 
                  onClick={bootCamera}
                  disabled={isProcessing || cameraActive}
                  className="h-16 sm:h-20 bg-primary text-slate-950 rounded-[20px] sm:rounded-[24px] font-black text-base sm:text-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
               >
                  <Camera size={20} /> الكاميرا
               </button>
               <button 
                  onClick={() => fileRef.current.click()}
                  disabled={isProcessing || cameraActive}
                  className="h-16 sm:h-20 bg-white/5 border border-white/10 text-white rounded-[20px] sm:rounded-[24px] font-black text-base sm:text-lg hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
               >
                  <Upload size={20} /> رفع صورة
               </button>
               <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => {
                  const f = e.target.files[0];
                  if(f) {
                     const r = new FileReader(); 
                     r.onload = (v) => { setStream(v.target.result); setResult(null); }; 
                     r.readAsDataURL(f);
                  }
               }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
           <AnimatePresence mode="wait">
             {isProcessing ? (
               <motion.div 
                 key="load" 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="glass-card h-full flex flex-col items-center justify-center p-12 text-center"
               >
                  <div className="relative w-48 h-48 mb-12">
                     <div className="absolute inset-0 rounded-[40px] border-[16px] border-white/5" />
                     <div className="absolute inset-0 rounded-[40px] border-[16px] border-primary border-t-transparent animate-spin" />
                     <Loader2 className="absolute inset-0 m-auto text-primary opacity-20" size={64} />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-2">جاري التحليل...</h4>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     Inference in progress
                  </p>
               </motion.div>
             ) : result ? (
               <ResultCard key="res" result={result} />
             ) : (
               <div className="glass-card h-full border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-20 text-slate-700">
                  <Info size={64} className="mb-8 opacity-20" />
                  <h4 className="text-xl font-black opacity-40">جاهز</h4>
                  <p className="text-xs font-bold opacity-30 mt-2">بانتظار بيانات الإدخال</p>
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
