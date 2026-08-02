import { useState } from 'react';
import { 
  Flame, 
  LayoutGrid, 
  Layers, 
  BarChart3, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data';
import { Product } from '../types';
import { CreateProductFlowModal } from './CreateProductFlowModal';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function RadarView({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto py-12 px-8 space-y-10"
      >
        {/* Header Tabs & "criar produto novo" Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-xl">
          <div className="flex bg-white/[0.04] p-1.5 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)] border border-white/20">
              <LayoutGrid className="w-4 h-4" /> Todos os Produtos
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 text-slate-300 hover:text-white rounded-xl text-sm font-bold transition-all hover:bg-white/5">
              <Layers className="w-4 h-4" /> Dividir por Nicho
            </button>
          </div>

          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-2xl text-sm font-extrabold shadow-[0_0_30px_rgba(244,63,94,0.5)] border border-white/30 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            + criar produto novo
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={item}
              className="glass-panel glass-panel-hover rounded-[2.2rem] overflow-hidden group cursor-pointer flex flex-col h-full hover:shadow-[0_0_35px_rgba(244,63,94,0.25)] hover:border-pink-500/40"
              onClick={() => onSelectProduct(product)}
            >
              {/* Image Container */}
              <div className="aspect-square relative m-3 rounded-[1.6rem] overflow-hidden bg-slate-900/60 border border-white/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-slate-950/70 border border-white/20 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur-xl">
                    <Flame className="w-3 h-3 text-pink-500 fill-pink-500" />
                    Top #{index + 1}
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <div className="bg-black/50 backdrop-blur-xl text-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-white/20">
                    {product.category}
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-slate-950/90 text-rose-400 border border-rose-500/50 backdrop-blur-xl text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 uppercase tracking-wider shadow-xl">
                    <Flame className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                    <span>ALTA DEMANDA</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-2 space-y-4 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-white line-clamp-2 leading-tight h-10 group-hover:text-pink-300 transition-colors">
                  {product.name}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-emerald-400 font-bold text-lg drop-shadow-sm">{product.price.split(',')[0]}</span>
                    <span className="text-emerald-400 font-bold text-xs">,{product.price.split(',')[1] || '90'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>{product.revenue}</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>{product.sales} vendidos</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 glass-button text-slate-200 rounded-xl text-[11px] font-bold hover:text-white">
                    <BarChart3 className="w-3.5 h-3.5" />
                    Análise
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.affiliateLink) {
                        window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-[11px] font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:opacity-90 border border-white/20 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Afiliar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Create Product Flow Modal */}
      <CreateProductFlowModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
}
