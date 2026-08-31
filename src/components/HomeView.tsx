import { ExternalLink, PackageCheck, Play, Radio, Search, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { shopeeProducts as products } from '../shopeeProducts';
import { ExtensionDownloadButton } from './ExtensionDownloadButton';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
export function HomeView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const topProducts = [...products].sort((a, b) => b.aiScore - a.aiScore).slice(0, 7);
  return (
    <motion.main variants={container} initial="hidden" animate="show" className="dashboard-view max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 space-y-7">
      <motion.section variants={item} className="relative overflow-hidden rounded-[2.5rem] border border-orange-400/20 bg-[#0a0808] p-7 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(249,115,22,0.23),transparent_38%),radial-gradient(circle_at_100%_20%,rgba(249,115,22,0.18),transparent_36%)]" />
        <div className="dashboard-hero-grid relative grid lg:grid-cols-[1.25fr_.75fr] gap-6 sm:gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-orange-300"><PackageCheck className="h-3.5 w-3.5" /> Looply para afiliados Shopee</span>
            <h1 className="mt-5 max-w-3xl text-3xl sm:text-5xl font-display font-black leading-[1.05] tracking-tight text-white">Encontre o produto certo.<br/><span className="bg-gradient-to-r from-orange-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Crie antes da concorrência.</span></h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">Uma central de inteligência para descobrir produtos, analisar demanda, estimar comissões e transformar oportunidades da Shopee em vídeos que vendem.</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate('live-builder')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-[0_14px_34px_rgba(249,115,22,0.24)] transition hover:-translate-y-0.5"><Radio className="h-4 w-4" /> Montar minha live</button>
              <button onClick={() => onNavigate('radar')} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"><Search className="h-4 w-4 text-orange-400" /> Explorar produtos</button>
              <ExtensionDownloadButton />
            </div>
          </div>
          <div className="dashboard-product-mosaic grid grid-cols-2 gap-3">
            {topProducts.slice(0, 4).map((product, index) => (
              <button key={product.id} onClick={() => onNavigate('radar')} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left ${index === 0 ? 'col-span-2 aspect-[2.25/1]' : 'aspect-square'}`}>
                <img src={product.image} alt="" className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3"><p className="line-clamp-1 text-xs font-bold text-white">{product.name}</p><p className="mt-0.5 text-[10px] font-black text-orange-300">Score {product.aiScore}</p></div>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={item} className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 p-5 sm:p-7"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-300">Seleção do dia</p><h2 className="mt-1 text-xl font-display font-black text-white">Produtos com melhor oportunidade</h2></div><button onClick={() => onNavigate('radar')} className="inline-flex items-center gap-2 text-xs font-black text-orange-300 hover:text-white">Ver catálogo completo <ExternalLink className="h-3.5 w-3.5" /></button></div>
        <div className="divide-y divide-white/[0.06]">
          {topProducts.slice(0,5).map((product, index) => (
            <div key={product.id} className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_120px_120px_100px_auto] items-center gap-3 sm:gap-5 p-4 sm:px-7 hover:bg-white/[0.025] transition">
              <span className="text-xs font-black text-slate-600">{String(index + 1).padStart(2, '0')}</span>
              <div className="flex min-w-0 items-center gap-3"><img src={product.image} alt="" className="h-12 w-12 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer"/><div className="min-w-0"><p className="truncate text-sm font-bold text-white">{product.name}</p><p className="truncate text-[10px] text-slate-500">{product.category}</p></div></div>
              <div className="hidden md:block"><p className="text-[9px] uppercase text-slate-500">Preço</p><p className="text-xs font-bold text-white">{product.price}</p></div>
              <div className="hidden md:block"><p className="text-[9px] uppercase text-slate-500">Comissão</p><p className="text-xs font-bold text-emerald-400">{product.commission}</p></div>
              <div className="hidden md:block"><p className="text-[9px] uppercase text-slate-500">Score</p><p className="text-xs font-black text-orange-300">{product.aiScore}/100</p></div>
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500/10 px-3 py-2 text-[10px] font-black text-orange-300 hover:bg-orange-500 hover:text-white">Shopee <ExternalLink className="h-3 w-3"/></a>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Radar Shopee', text: 'Descubra produtos e comissões.', icon: Search, tab: 'radar' },
          { title: 'Vídeos que vendem', text: 'Use criativos em preview.', icon: Video, tab: 'gallery' },
          { title: 'Estratégia de conteúdo', text: 'Transforme pesquisa em venda.', icon: Play, tab: 'lessons' },
        ].map(({ title, text, icon: Icon, tab }) => (
          <motion.button variants={item} key={title} onClick={() => onNavigate(tab)} className="glass-panel group rounded-[1.75rem] p-5 text-left transition hover:border-orange-400/25"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/15 text-orange-300"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-bold text-white group-hover:text-orange-200">{title}</h3><p className="mt-1 text-xs text-slate-400">{text}</p></motion.button>
        ))}
      </section>
    </motion.main>
  );
}
