import React, { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { products } from '../data';
import kettleInoxImg from '../assets/images/kettle_inox_studio_1785605255374.jpg';
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Download, 
  Maximize2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Flame, 
  Monitor, 
  BookOpen, 
  Shirt, 
  Package, 
  ChefHat, 
  Wand2, 
  RefreshCw, 
  Copy, 
  CheckCircle2,
  Share2,
  Film,
  Zap,
  Sliders,
  Plus
} from 'lucide-react';

interface ViralProductOption {
  id: string;
  name: string;
  badge: string;
  badgeType: 'viral' | 'trending';
  demand: string;
  image: string;
}

const viralProductsList: ViralProductOption[] = products.map((prod, index) => ({
  id: prod.id,
  name: prod.name,
  badge: index < 3 ? `#${index + 1} VIRAL` : '🔥 Em Alta',
  badgeType: index < 3 ? 'viral' : 'trending',
  demand: 'Alta Demanda',
  image: prod.image
}));

interface ScenarioOption {
  id: string;
  title: string;
  icon: typeof ChefHat;
  description: string;
}

const scenarioOptions: ScenarioOption[] = [
  {
    id: 'marble',
    title: 'Bancada de Mármore',
    icon: ChefHat,
    description: 'Iluminação estétrica de estúdio em bancada nobre de mármore branco.'
  },
  {
    id: 'gamer',
    title: 'Setup Gamer / Tech',
    icon: Monitor,
    description: 'Ambiente futurista com luzes neon RGB e mesa de alta tecnologia.'
  },
  {
    id: 'desk',
    title: 'Mesa de Escritório',
    icon: BookOpen,
    description: 'Cenário profissional minimalista em madeira de demolição e notebooks.'
  },
  {
    id: 'closet',
    title: 'Closet & Maquiagem',
    icon: Shirt,
    description: 'Espelho camarim iluminado com fundo de arara de roupas e maquiagem.'
  },
  {
    id: 'unboxing',
    title: 'Unboxing (Madeira)',
    icon: Package,
    description: 'Mesa rústica de madeira nobre para unboxing cinematográfico.'
  }
];

interface CreateProductFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProductFlowModal({ isOpen, onClose }: CreateProductFlowModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProduct, setSelectedProduct] = useState<ViralProductOption | null>(viralProductsList[0]); // Default to Chaleira Elétrica
  const [customProductName, setCustomProductName] = useState('');
  const [customProductImage, setCustomProductImage] = useState<string | null>(null);
  const [isUploadingCustom, setIsUploadingCustom] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('marble');
  const [scriptStyle, setScriptStyle] = useState('review');
  const [voiceAi, setVoiceAi] = useState('julia');
  const [duration, setDuration] = useState('30s');
  
  // Specific Video Variations for Kettle ("Chaleira")
  const [kettleMarbleVariant, setKettleMarbleVariant] = useState<'white_marble' | 'green_marble'>('white_marble');
  const [kettleOfficeVariant, setKettleOfficeVariant] = useState<'office_unboxing' | 'office_modern'>('office_unboxing');
  const [kettleGamerVariant, setKettleGamerVariant] = useState<'gamer_rgb' | 'gamer_cyberpunk'>('gamer_rgb');
  
  // Generation & Preview state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isExtending, setIsExtending] = useState(false);
  const [extendOptionsOpen, setExtendOptionsOpen] = useState(false);
  const [videoDurationSeconds, setVideoDurationSeconds] = useState(30);
  const [extendSuccessMsg, setExtendSuccessMsg] = useState('');
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomProductImage(url);
      const customProd: ViralProductOption = {
        id: 'custom-' + Date.now(),
        name: customProductName.trim() || 'Meu Produto Exclusivo',
        badge: '✨ PERSONALIZADO',
        badgeType: 'trending',
        demand: 'Alta Demanda',
        image: url
      };
      setSelectedProduct(customProd);
      setIsUploadingCustom(false);
    }
  };

  const handleAddCustomText = () => {
    if (customProductName.trim()) {
      const customProd: ViralProductOption = {
        id: 'custom-' + Date.now(),
        name: customProductName.trim(),
        badge: '✨ PERSONALIZADO',
        badgeType: 'trending',
        demand: 'Alta Demanda',
        image: customProductImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
      };
      setSelectedProduct(customProd);
      setIsUploadingCustom(false);
    }
  };

  const handleStartGeneration = () => {
    setStep(3);
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 12;
      });
    }, 400);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  const handleExtendVideo = (addedSeconds: number, reason: string) => {
    setIsExtending(true);
    setExtendOptionsOpen(false);
    setTimeout(() => {
      setIsExtending(false);
      setVideoDurationSeconds((prev) => prev + addedSeconds);
      setExtendSuccessMsg(`Vídeo estendido em +${addedSeconds}s! (${reason})`);
      setTimeout(() => setExtendSuccessMsg(''), 4000);
    }, 1800);
  };

  const activeScenarioObj = scenarioOptions.find((s) => s.id === selectedScenario) || scenarioOptions[0];
  const isKettle = selectedProduct?.name?.toLowerCase().includes('chaleira') || selectedProduct?.name?.toLowerCase().includes('kettle');
  const isMarbleScenario = selectedScenario === 'marble';
  const isOfficeScenario = selectedScenario === 'desk' || selectedScenario === 'unboxing';
  
  const isSpecialKettleMarble = isMarbleScenario && isKettle;
  const isSpecialKettleOffice = isOfficeScenario && isKettle;
  const isGamerScenario = selectedScenario === 'gamer';
  const isSpecialKettleGamer = isGamerScenario && isKettle;
  const isSpecialKettleVideo = isSpecialKettleMarble || isSpecialKettleOffice || isSpecialKettleGamer;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel w-full max-w-5xl rounded-[2.8rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/20 my-auto relative"
      >
        {/* Glow Accent Header line with Cyan & Pink Chromatic Aberration */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00f2fe] via-pink-500 to-[#ff007f] shadow-[0_0_20px_rgba(0,242,254,0.8)]" />

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <Logo size={42} showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-gradient-to-r from-[#00f2fe]/20 to-[#ff0055]/20 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                  Gerador IA de Vídeos
                </span>
                <span className="text-xs text-slate-400 font-semibold">Etapa {step} de 3</span>
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight drop-shadow-sm mt-0.5">
                {step === 1 && 'Criar Novo Produto & Vídeo Viral'}
                {step === 2 && 'Configuração & Cenário do Vídeo'}
                {step === 3 && 'Preview do Vídeo Gerado'}
              </h2>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SELECIONE O PRODUTO VIRAL */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Header Title & Subtitle */}
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  Selecione o Produto Viral
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
                  Escolha o produto que será o foco do seu vídeo. Nossa IA vai adaptar o roteiro e as interações do influencer para destacar os melhores ângulos e benefícios deste item.
                </p>
              </div>

              {/* Upload my own product Box */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all shadow-inner relative overflow-hidden group">
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-pink-300 group-hover:bg-pink-500/10 transition-all shrink-0">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      usar meu próprio produto
                    </h4>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                      faça upload de uma foto — a IA gera o vídeo completo
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  {isUploadingCustom ? (
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <input 
                        type="text" 
                        placeholder="Nome do seu produto..." 
                        value={customProductName}
                        onChange={(e) => setCustomProductName(e.target.value)}
                        className="bg-slate-900 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 w-full md:w-60"
                      />
                      <label className="cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs hover:opacity-90 whitespace-nowrap">
                        Enviar Foto
                        <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
                      </label>
                      <button 
                        onClick={handleAddCustomText}
                        className="glass-button text-xs font-bold px-3 py-2.5 rounded-xl text-slate-200 hover:text-white"
                      >
                        Confirmar
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsUploadingCustom(true)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs md:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-pink-400" /> + adicionar
                    </button>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-[1px] bg-white/10" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  ou escolha um produto em alta
                </span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {viralProductsList.map((prod) => {
                  const isSelected = selectedProduct?.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col group ${
                        isSelected 
                          ? 'bg-gradient-to-b from-pink-500/20 to-slate-900/90 border-2 border-pink-500 shadow-[0_0_25px_rgba(244,63,94,0.35)] scale-[1.02]' 
                          : 'glass-panel glass-panel-hover border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Image container */}
                      <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-900/80">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className={`text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-md border ${
                            prod.badgeType === 'viral' 
                              ? 'bg-pink-600/90 border-pink-400 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)]' 
                              : 'bg-slate-950/80 border-white/20 text-white backdrop-blur-md'
                          }`}>
                            {prod.badge}
                          </span>
                        </div>

                        {/* Selected Checkmark overlay (exact style from reference 2) */}
                        {isSelected && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white rounded-full p-1.5 shadow-[0_0_15px_rgba(244,63,94,0.8)] border border-white/40">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <h4 className="font-bold text-xs md:text-sm text-white leading-snug line-clamp-2">
                          {prod.name}
                        </h4>
                        
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg shadow-sm">
                            {prod.demand}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Next Button */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedProduct}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold text-base rounded-full shadow-[0_0_25px_rgba(244,63,94,0.4)] border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-40"
                >
                  Próximo <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONFIGURAÇÃO DO VÍDEO & CENÁRIOS */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Selected product bar banner */}
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedProduct?.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Produto Selecionado:</span>
                    <p className="text-sm font-bold text-white">{selectedProduct?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-pink-400 hover:text-white transition-colors underline"
                >
                  Trocar Produto
                </button>
              </div>

              {/* Title Section */}
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  Configuração do Vídeo
                </h3>
                <p className="text-slate-300 text-sm">
                  Defina o ambiente e a estilização para a geração automatizada do criativo.
                </p>
              </div>

              {/* CENÁRIO SECTION (Identical to Image Reference 1) */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block">
                  CENÁRIO
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                  {scenarioOptions.map((scen) => {
                    const IconComponent = scen.icon;
                    const isSelected = selectedScenario === scen.id;
                    return (
                      <button
                        key={scen.id}
                        onClick={() => setSelectedScenario(scen.id)}
                        className={`p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 min-h-[120px] ${
                          isSelected
                            ? 'bg-[#180d16] border-2 border-pink-500 shadow-[0_0_20px_rgba(244,63,94,0.35)] text-pink-400 scale-105'
                            : 'bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <IconComponent className={`w-7 h-7 ${isSelected ? 'text-pink-400' : 'text-slate-400'}`} />
                        <span className={`text-xs md:text-sm font-bold leading-tight ${isSelected ? 'text-pink-300' : 'text-slate-200'}`}>
                          {scen.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-xs text-slate-300 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>
                    <strong>Detalhe do Cenário:</strong> {activeScenarioObj.description}
                  </span>
                </div>
              </div>

              {/* Additional AI Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* Estilo do Roteiro */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Estilo de Roteiro
                  </label>
                  <select 
                    value={scriptStyle}
                    onChange={(e) => setScriptStyle(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="review" className="bg-slate-900 text-white">Análise Rápida / Review</option>
                    <option value="hook" className="bg-slate-900 text-white">Hook Polêmico & Curiosidade</option>
                    <option value="asmr" className="bg-slate-900 text-white">ASMR Estético Unboxing</option>
                    <option value="transformation" className="bg-slate-900 text-white">Antes & Depois Dor-Solução</option>
                  </select>
                </div>

                {/* Voz / Influencer IA */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Voz / Influencer IA
                  </label>
                  <select 
                    value={voiceAi}
                    onChange={(e) => setVoiceAi(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="julia" className="bg-slate-900 text-white">Júlia (Jovem & Energética)</option>
                    <option value="lucas" className="bg-slate-900 text-white">Lucas (Reviews Tech & Confiável)</option>
                    <option value="camila" className="bg-slate-900 text-white">Camila (Lifestyle & Estética)</option>
                  </select>
                </div>

                {/* Duração */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Duração
                  </label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="15s" className="bg-slate-900 text-white">15s (Shorts / Reels Veloz)</option>
                    <option value="30s" className="bg-slate-900 text-white">30s (Ideal Padrão TikTok)</option>
                    <option value="60s" className="bg-slate-900 text-white">60s (Completo em Detalhes)</option>
                  </select>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3.5 glass-button text-slate-200 font-bold text-sm rounded-full flex items-center gap-2 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                <button
                  onClick={handleStartGeneration}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-base rounded-full shadow-[0_0_30px_rgba(244,63,94,0.5)] border border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <Wand2 className="w-5 h-5 text-white" /> Gerar Vídeo Viral (IA)
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PREVIEW DO VÍDEO GERADO & REQUISITOS (BAIXAR VÍDEO & ESTENDER VÍDEO) */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {isGenerating ? (
                /* Generating Loader Animation */
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center border border-white/30 shadow-[0_0_30px_rgba(244,63,94,0.6)]">
                      <Wand2 className="w-10 h-10 text-white animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h3 className="text-2xl font-display font-bold text-white">Sintetizando Vídeo com IA...</h3>
                    <p className="text-slate-300 text-sm">
                      Combinando produto <span className="text-pink-300 font-bold">{selectedProduct?.name}</span> no cenário <span className="text-pink-300 font-bold">{activeScenarioObj.title}</span>.
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md bg-white/10 h-3 rounded-full overflow-hidden border border-white/20">
                    <motion.div 
                      className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 h-full rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)]"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-pink-300 font-bold">{generationProgress}% concluído</span>
                </div>
              ) : (
                /* Generated Video Preview Screen */
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
                  
                  {/* Left: 9:16 Vertical Phone Video Player Preview */}
                  <div className="generated-video-preview relative aspect-[9/16] w-full max-w-[340px] mx-auto rounded-[2.5rem] overflow-hidden bg-slate-950 border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                    {/* Simulated video background */}
                    {isSpecialKettleMarble ? (
                      kettleMarbleVariant === 'white_marble' ? (
                        /* VIDEO 1: MÁRMORE BRANCO */
                        <div className="relative w-full h-full overflow-hidden bg-slate-900">
                          <video src="/videos/marmore-1.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video de marmore 1" />
                          <div className="absolute inset-0 bg-black/20" />
                          
                          {/* Kettle foreground on white marble */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-56 h-56 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center p-2 shadow-2xl">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox" 
                                className="w-full h-full object-contain rounded-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/60 shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">
                              🎬 Vídeo 1: Mármore Branco
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Encaixe na base, tampa e travamento em bancada de mármore branco
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* VIDEO 2: MÁRMORE VERDE */
                        <div className="relative w-full h-full overflow-hidden bg-slate-900">
                          <video src="/videos/marmore-2.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video de marmore 2" />
                          <div className="absolute inset-0 bg-emerald-950/20" />

                          {/* Kettle foreground on green marble */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-56 h-56 rounded-full bg-emerald-950/40 backdrop-blur-md border border-emerald-400/30 flex items-center justify-center p-2 shadow-2xl">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox" 
                                className="w-full h-full object-contain rounded-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/60 shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                              🎬 Vídeo 2: Mármore Verde
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Pessoa levantando a chaleira e servindo água quente em bancada verde
                            </span>
                          </div>
                        </div>
                      )
                    ) : isSpecialKettleOffice ? (
                      kettleOfficeVariant === 'office_unboxing' ? (
                        /* VIDEO 1 ESCRITÓRIO: UNBOXING MESA DE MADEIRA */
                        <div className="relative w-full h-full overflow-hidden bg-amber-950">
                          <video src="/videos/escritorio-1.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video de escritorio 1" />
                          <div className="absolute inset-0 bg-black/30" />

                          {/* Box & Kettle overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-60 h-60 rounded-3xl bg-amber-900/30 backdrop-blur-md border border-amber-500/30 flex flex-col items-center justify-center p-3 shadow-2xl">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox" 
                                className="w-44 h-44 object-contain rounded-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="mt-2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/60 shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-amber-500/30 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                              📦 Vídeo 1: Unboxing Escritório
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Mesa de madeira com caixa de entrega, papel pardo e montagem da base
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* VIDEO 2 ESCRITÓRIO: ESCRITÓRIO MODERNO JANELA VISTA CIDADE */
                        <div className="relative w-full h-full overflow-hidden bg-slate-900">
                          <video src="/videos/escritorio-2.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video de escritorio 2" />
                          <div className="absolute inset-0 bg-slate-950/30" />

                          {/* Kettle overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-60 h-60 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-cyan-500/30 flex flex-col items-center justify-center p-3 shadow-2xl">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox" 
                                className="w-44 h-44 object-contain rounded-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="mt-2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/60 shadow-[0_0_18px_rgba(244,63,94,0.9)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-cyan-500/30 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                              🏢 Vídeo 2: Escritório Moderno
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Mesa com vista para cidade, notebook, xícara e fervura rápida no trabalho
                            </span>
                          </div>
                        </div>
                      )
                    ) : isSpecialKettleGamer ? (
                      kettleGamerVariant === 'gamer_rgb' ? (
                        /* VIDEO 1 GAMER: SETUP GAMER RGB NEON DARK MESA PRETA */
                        <div className="relative w-full h-full overflow-hidden bg-slate-950">
                          <video src="/videos/setup-gamer.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video gamer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-black/40 to-cyan-950/40" />

                          {/* Gamer Keyboard & PC Case Glow background elements */}
                          <div className="absolute top-1/4 right-4 w-32 h-32 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" />
                          <div className="absolute bottom-1/3 left-4 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl animate-pulse" />

                          {/* Kettle overlay on black gamer desk */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-60 h-60 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-purple-500/40 flex flex-col items-center justify-center p-3 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox Gamer" 
                                className="w-44 h-44 object-contain rounded-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="mt-2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,1)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-purple-500/40 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                              🎮 Vídeo 1: Setup Gamer RGB (Mesa Preta)
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Teclado mecânico, iluminação neon lilás/azul e chaleira fervendo ao lado do PC
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* VIDEO 2 GAMER: SETUP STREAMER CYBERPUNK NEON */
                        <div className="relative w-full h-full overflow-hidden bg-slate-950">
                          <video src="/videos/setup-gamer.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label="Video gamer 2" />
                          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-black/30 to-blue-950/40" />

                          {/* Kettle overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="relative w-60 h-60 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/40 flex flex-col items-center justify-center p-3 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                              <img 
                                src={kettleInoxImg} 
                                alt="Chaleira Inox Gamer" 
                                className="w-44 h-44 object-contain rounded-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
                              />
                              {/* Red LED glowing light on base */}
                              <div className="mt-2 flex items-center gap-1.5 bg-black/90 px-3 py-1 rounded-full border border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,1)] animate-pulse">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                                <span className="text-[9px] font-bold text-rose-300 font-mono">LED VERMELHO LIGADO</span>
                              </div>
                            </div>
                          </div>

                          {/* Top Scene Label */}
                          <div className="absolute top-12 left-3 right-3 bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-cyan-500/40 text-center shadow-xl">
                            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                              ⚡ Vídeo 2: Setup Gamer Cyberpunk
                            </span>
                            <span className="text-[9px] text-slate-300 block font-medium mt-0.5">
                              Luzes neon cyan/rosa, microfone de stream e chaleira de fervura ultra rápida
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <img 
                        src={selectedProduct?.image} 
                        alt="" 
                        className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                      />
                    )}
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 pointer-events-none" />

                    {/* Top Status Bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold text-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Vídeo Gerado em 4K
                      </span>
                      <span>{videoDurationSeconds}s</span>
                    </div>

                    {/* Play / Pause Toggle Button */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-pink-500/80 backdrop-blur-md text-white flex items-center justify-center border border-white/30 shadow-2xl">
                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white ml-1" />}
                      </div>
                    </button>

                    {/* Sound toggle */}
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute top-14 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 z-10"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>

                    {/* Bottom Overlay Info & Product Link Card */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-3 z-10">
                      <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 flex items-center gap-2.5 shadow-lg">
                        <img src={selectedProduct?.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/20" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{selectedProduct?.name}</p>
                          <p className="text-[10px] text-pink-300 font-medium">Comprar com desconto exclusivo</p>
                        </div>
                      </div>

                      <div className="space-y-1 text-white">
                        <p className="text-xs font-bold flex items-center gap-1.5">
                          @influencer_ia <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                        </p>
                        <p className="text-[11px] text-slate-200 line-clamp-2">
                          Olha esse achado surpreendente no cenário {activeScenarioObj.title}! 😱🔥 #viral #achadinhos #chaleira
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Controls, Download, Extend Video & Details */}
                  <div className="space-y-6">
                    
                    {/* Header info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Sucesso na Geração
                        </span>
                        <span className="text-xs text-slate-400">Resolução: 1080x1920 (TikTok / Reels)</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {selectedProduct?.name}
                      </h3>
                      <p className="text-sm text-slate-300">
                        Cenário: <strong className="text-pink-300">{activeScenarioObj.title}</strong> | Voz: <strong className="text-pink-300">{voiceAi.toUpperCase()}</strong>
                      </p>
                    </div>

                    {/* SPECIAL SELECTOR SWITCHER FOR KETTLE VIDEOS (UM OU OUTRO) */}
                    {isSpecialKettleMarble && (
                      <div className="hidden bg-slate-900/90 border border-pink-500/30 p-4 rounded-2xl space-y-3 shadow-xl">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-pink-400 shrink-0 animate-pulse" />
                          <div>
                            <span className="text-xs font-bold text-white block">Vídeos de Mármore para Chaleira</span>
                            <span className="text-[10px] text-slate-300">Escolha a versão desejada (exibido um por vez):</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button 
                            onClick={() => setKettleMarbleVariant('white_marble')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleMarbleVariant === 'white_marble' 
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-white/40 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-400" />
                            Mármore Branco
                          </button>

                          <button 
                            onClick={() => setKettleMarbleVariant('green_marble')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleMarbleVariant === 'green_marble' 
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-white/40 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-300" />
                            Mármore Verde
                          </button>
                        </div>
                      </div>
                    )}

                    {isSpecialKettleOffice && (
                      <div className="hidden bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl space-y-3 shadow-xl">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                          <div>
                            <span className="text-xs font-bold text-white block">Vídeos de Escritório para Chaleira</span>
                            <span className="text-[10px] text-slate-300">Escolha a versão desejada (exibido um por vez):</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button 
                            onClick={() => setKettleOfficeVariant('office_unboxing')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleOfficeVariant === 'office_unboxing' 
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-white/40 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-400" />
                            Unboxing (Mesa de Madeira)
                          </button>

                          <button 
                            onClick={() => setKettleOfficeVariant('office_modern')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleOfficeVariant === 'office_modern' 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-white/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-200" />
                            Escritório Moderno (Vista da Cidade)
                          </button>
                        </div>
                      </div>
                    )}

                    {isSpecialKettleGamer && (
                      <div className="hidden bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl space-y-3 shadow-xl">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
                          <div>
                            <span className="text-xs font-bold text-white block">Vídeos de Setup Gamer para Chaleira</span>
                            <span className="text-[10px] text-slate-300">Escolha a versão desejada (exibido um por vez):</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button 
                            onClick={() => setKettleGamerVariant('gamer_rgb')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleGamerVariant === 'gamer_rgb' 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-white/40 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 border border-purple-200" />
                            RGB Dark (Teclado & PC)
                          </button>

                          <button 
                            onClick={() => setKettleGamerVariant('gamer_cyberpunk')}
                            className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                              kettleGamerVariant === 'gamer_cyberpunk' 
                                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white border-white/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-[1.02]' 
                                : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-200" />
                            Streamer Cyberpunk
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Success Alert for Extension or Download */}
                    <AnimatePresence>
                      {extendSuccessMsg && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-2xl text-emerald-300 text-sm font-bold flex items-center gap-3 shadow-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          {extendSuccessMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* MAIN REQUIRED ACTION BUTTONS AREA (Baixar Vídeo & Estender Vídeo) */}
                    <div className="glass-panel p-6 rounded-[2.2rem] space-y-5 border border-white/15 shadow-xl">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4 text-pink-400" /> Ações do Criativo
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* BOTÃO 1: BAIXAR VÍDEO (As explicitly requested by user) */}
                        <button
                          onClick={handleDownload}
                          disabled={isDownloading}
                          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
                            downloadSuccess 
                              ? 'bg-emerald-600 text-white shadow-emerald-500/30' 
                              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:opacity-90 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-white/20'
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" /> Renderizando Download...
                            </>
                          ) : downloadSuccess ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" /> Vídeo Baixado com Sucesso!
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5" /> Baixar Vídeo
                            </>
                          )}
                        </button>

                        {/* BOTÃO 2: ESTENDER VÍDEO (As explicitly requested by user) */}
                        <div className="relative">
                          <button
                            onClick={() => setExtendOptionsOpen(!extendOptionsOpen)}
                            disabled={isExtending}
                            className="w-full py-4 px-6 rounded-2xl font-bold text-sm md:text-base glass-button text-white flex items-center justify-center gap-3 transition-all active:scale-95 border border-pink-400/40 hover:bg-pink-500/20 shadow-md"
                          >
                            {isExtending ? (
                              <>
                                <Wand2 className="w-5 h-5 text-pink-400 animate-spin" /> Estendendo Duração...
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-5 h-5 text-pink-400" /> Estender Vídeo
                              </>
                            )}
                          </button>

                          {/* Extend Options Dropdown menu */}
                          {extendOptionsOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-full left-0 right-0 mt-2 z-20 bg-slate-900 border border-white/20 rounded-2xl p-3 shadow-2xl space-y-2 backdrop-blur-2xl"
                            >
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Opções de Extensão com IA:</p>
                              
                              <button
                                onClick={() => handleExtendVideo(15, 'Novo Hook Inicial +15s')}
                                className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-white hover:bg-pink-500/20 hover:text-pink-300 transition-colors flex items-center justify-between"
                              >
                                <span>+15s Adicionar Gancho Viral Inicial</span>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">15 seg</span>
                              </button>

                              <button
                                onClick={() => handleExtendVideo(30, 'Demonstração de Benefícios +30s')}
                                className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-white hover:bg-pink-500/20 hover:text-pink-300 transition-colors flex items-center justify-between"
                              >
                                <span>+30s Demonstração e Teste em Uso</span>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">30 seg</span>
                              </button>

                              <button
                                onClick={() => handleExtendVideo(15, 'Chamada de Ação CTA +15s')}
                                className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-white hover:bg-pink-500/20 hover:text-pink-300 transition-colors flex items-center justify-between"
                              >
                                <span>+15s Chamada para Ação / CTA Oferta</span>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">15 seg</span>
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Reset & Close */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 glass-button px-5 py-2.5 rounded-full"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Criar Outro Vídeo
                      </button>

                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-all"
                      >
                        Concluir
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
