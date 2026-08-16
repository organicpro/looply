import { useMemo, useState } from 'react';
import { BarChart3, ExternalLink, Flame, Search, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { shopeeProducts as products } from '../shopeeProducts';
import type { Product } from '../types';
import { CreateProductFlowModal } from './CreateProductFlowModal';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export function RadarView({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(products.map((product) => product.category)))], []);
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === 'Todos' || product.category === category);
  }), [category, search]);

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show" className="products-view max-w-[1500px] mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-10 space-y-7">
        <motion.section variants={item} className="relative overflow-hidden rounded-[2.25rem] border border-orange-400/20 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(249,115,22,0.08)_45%,rgba(255,255,255,0.025))] p-6 sm:p-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
                <ShoppingBag className="h-3.5 w-3.5" /> Inteligência de produtos Shopee
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-display font-black text-white tracking-tight">Radar de oportunidades</h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-300">Produtos selecionados por demanda, potencial de conteúdo e comissão. Todos os cards levam ao anúncio correspondente na Shopee.</p>
            </div>
            <button onClick={() => setIsCreateModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_35px_rgba(249,115,22,0.25)] transition hover:-translate-y-0.5">
              <Sparkles className="h-4 w-4" /> Adicionar produto
            </button>
          </div>
        </motion.section>

        <motion.div variants={item} className="glass-panel rounded-[1.75rem] p-4 flex flex-col lg:flex-row gap-4 lg:items-center">
          <label className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produto ou nicho..." className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400/50" />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[65%]">
            {categories.map((option) => (
              <button key={option} onClick={() => setCategory(option)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${category === option ? 'bg-orange-500 text-white shadow-[0_8px_24px_rgba(249,115,22,0.2)]' : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'}`}>{option}</button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product, index) => (
            <motion.article key={product.id} variants={item} onClick={() => onSelectProduct(product)} className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0f]/95 shadow-[0_16px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-orange-400/35">
              <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-xl"><Flame className="h-3 w-3 fill-orange-400 text-orange-400" /> TOP #{index + 1}</div>
                <div className="absolute right-4 top-4 rounded-full border border-emerald-400/25 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-black text-emerald-300">{product.variation}</div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-orange-300">Preço Shopee</p><p className="text-2xl font-black text-white">{product.price}</p></div>
                  <div className="rounded-xl border border-white/15 bg-black/55 px-3 py-2 text-right backdrop-blur-xl"><p className="text-[9px] uppercase text-slate-400">Vendidos</p><p className="text-sm font-black text-white">{product.sales}</p></div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-300">{product.category}</p>
                <h2 className="mt-2 min-h-12 text-base font-bold leading-snug text-white line-clamp-2">{product.name}</h2>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-3"><p className="text-[9px] uppercase tracking-wider text-slate-500">Comissão estimada</p><p className="mt-1 font-black text-emerald-400">{product.commission}</p></div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-3"><p className="text-[9px] uppercase tracking-wider text-slate-500">Score Looply</p><p className="mt-1 font-black text-orange-300">{product.aiScore}/100</p></div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-xs font-bold text-slate-200 hover:bg-white/[0.08]"><BarChart3 className="h-4 w-4" /> Analisar</button>
                  <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-black text-white shadow-[0_8px_22px_rgba(249,115,22,0.2)]"><ExternalLink className="h-4 w-4" /> Abrir na Shopee</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredProducts.length === 0 && <div className="glass-panel rounded-[2rem] p-12 text-center"><TrendingUp className="mx-auto h-8 w-8 text-orange-400" /><p className="mt-3 font-bold text-white">Nenhum produto encontrado</p><p className="mt-1 text-sm text-slate-400">Tente outro termo ou selecione todos os nichos.</p></div>}
      </motion.div>
      <CreateProductFlowModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  );
}
