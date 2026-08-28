import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Flame,
  MonitorPlay,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Video,
} from 'lucide-react';
import { shopeeProducts } from '../shopeeProducts';
import { videos } from '../data';
import type { Product, Video as VideoType } from '../types';

const previewById: Record<string, string> = {
  v20: '/videos/v20-air-fryer-philco.mp4', v21: '/videos/v21-escova-secadora-britania.mp4',
  v22: '/videos/v22-processador-britania.mp4', v23: '/videos/v23-ventilador-mesa.mp4',
  v24: '/videos/v24-aspirador-vertical.mp4', v25: '/videos/v25-liquidificador-mondial.mp4',
  v26: '/videos/v26-tenis-feminino.mp4',
  v11: '/videos/v11-chaleira.mp4', v2: '/videos/v2-facas.mp4', v5: '/videos/v5-panelas.mp4',
  v6: '/videos/v6-parafusadeira.mp4', v10: '/videos/v10-copo-termico.mp4', v4: '/videos/v4-filtro-linha.mp4',
  v13: '/videos/v13-kit-ferramentas.mp4', v7: '/videos/v7-tiras-clareadoras.mp4', v12: '/videos/v12-massageador.mp4',
  v9: '/videos/v9-magnesio.mp4', v1: '/videos/v1-oculos.mp4', v8: '/videos/v8-capa-celular.mp4', v3: '/videos/v5-panelas.mp4',
};

const steps = [
  { label: 'Produto', icon: ShoppingBag },
  { label: 'Vídeo', icon: MonitorPlay },
  { label: 'Revisão', icon: CheckCircle2 },
];

const SHOPEE_LIVE_STUDIO_URL = 'https://live.shopee.com.br/pc/setup?from=seller_center';

function LiveVideoOption({ video, selected, onSelect }: { key?: string; video: VideoType; selected: boolean; onSelect: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: '100px 0px', threshold: 0.15 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <button ref={cardRef} onClick={onSelect} className={`relative overflow-hidden rounded-2xl border bg-black transition ${selected ? 'border-orange-400 shadow-[0_0_28px_rgba(249,115,22,.18)]' : 'border-white/10 hover:border-white/25'}`}>
      <div className="aspect-[9/14]">
        {isVisible ? <video src={previewById[video.id]} poster={video.thumbnail} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="none" disablePictureInPicture /> : <img src={video.thumbnail} alt={video.productName} className="h-full w-full object-cover" loading="lazy" decoding="async" />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-left text-xs font-bold text-white">{video.productName}</p>
      {selected && <CheckCircle2 className="absolute right-3 top-3 h-6 w-6 text-orange-400" />}
    </button>
  );
}

export function LiveBuilderView() {
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product>(shopeeProducts[0]);
  const [selectedVideo, setSelectedVideo] = useState<VideoType>(videos[0]);

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(selectedProduct);
    if (step === 1) return Boolean(selectedVideo);
    return true;
  }, [selectedProduct, selectedVideo, step]);

  return (
    <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-7 sm:px-6 lg:px-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-orange-400/20 bg-[radial-gradient(circle_at_10%_0%,rgba(249,115,22,.2),transparent_34%),#0a0807] p-6 sm:p-8">
        <div className="relative"><span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-orange-300"><Sparkles className="h-3.5 w-3.5"/> Preparação para afiliados</span><h1 className="mt-4 text-3xl font-display font-black text-white sm:text-4xl">Prepare sua live, passo a passo.</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">Escolha o produto, escolha o vídeo e abra o Live Studio da Shopee com tudo decidido.</p></div>
      </section>

      <nav className="grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[.025] p-2 sm:gap-2">
        {steps.map(({ label, icon: Icon }, index) => <button key={label} onClick={() => index <= step && setStep(index)} className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-3 text-[10px] font-black transition sm:text-xs ${index === step ? 'bg-orange-500 text-white shadow-[0_8px_24px_rgba(249,115,22,.2)]' : index < step ? 'text-emerald-400' : 'text-slate-500'}`}>{index < step ? <Check className="h-4 w-4"/> : <Icon className="h-4 w-4"/>}<span className="hidden sm:inline">{label}</span></button>)}
      </nav>

      <section className="min-h-[540px] rounded-[2.25rem] border border-white/10 bg-[#0b0908] p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .2 }}>
            {step === 0 && <div><StepTitle eyebrow="Etapa 1" title="Escolha o produto principal" description="Os dados de preço e comissão vêm do catálogo e servem como referência para sua divulgação."/><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{shopeeProducts.slice(0, 12).map((product) => <button key={product.id} onClick={() => setSelectedProduct(product)} className={`overflow-hidden rounded-2xl border text-left transition ${selectedProduct.id === product.id ? 'border-orange-400 bg-orange-500/10 shadow-[0_0_28px_rgba(249,115,22,.16)]' : 'border-white/10 bg-white/[.025] hover:border-white/20'}`}><div className="relative aspect-[16/9]"><img src={product.image} alt="" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/><span className="absolute bottom-3 left-3 text-sm font-black text-white">{product.price}</span>{selectedProduct.id === product.id && <CheckCircle2 className="absolute right-3 top-3 h-6 w-6 text-orange-400"/>}</div><div className="p-4"><p className="line-clamp-2 min-h-10 text-sm font-bold text-white">{product.name}</p><p className="mt-2 text-xs font-bold text-emerald-400">Comissão {product.commission}</p></div></button>)}</div></div>}

            {step === 1 && <div><StepTitle eyebrow="Etapa 2" title="Escolha um vídeo de apoio" description="Os vídeos visíveis rodam automaticamente em preview. Selecione o que deseja levar para a revisão."/><div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{videos.map((video) => <LiveVideoOption key={video.id} video={video} selected={selectedVideo.id === video.id} onSelect={() => setSelectedVideo(video)} />)}</div></div>}

            {step === 2 && <div><StepTitle eyebrow="Etapa 3" title="Revise antes de abrir o Live Studio" description="Confira sua seleção. Ao continuar, o Live Studio da Shopee será aberto em uma nova aba."/><div className="mt-8 grid gap-5 lg:grid-cols-3"><SummaryCard icon={PackageCheck} label="Produto selecionado" title={selectedProduct.name} detail={`${selectedProduct.price} · Comissão ${selectedProduct.commission}`} image={selectedProduct.image}/><SummaryCard icon={Video} label="Vídeo selecionado" title={selectedVideo.productName} detail="Criativo escolhido para apoiar sua live" image={selectedVideo.thumbnail}/><SummaryCard icon={Flame} label="Destino" title="Live Studio Shopee" detail="Abra o painel oficial para configurar e iniciar a transmissão"/></div><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-500">Pontos de apoio</p><p className="mt-2 text-sm leading-relaxed text-white">{selectedProduct.recommendation}</p></div></div>}
          </motion.div>
        </AnimatePresence>
      </section>

      <footer className="flex items-center justify-between gap-3">
        <button onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-xs font-bold text-white disabled:opacity-30"><ArrowLeft className="h-4 w-4"/> Voltar</button>
        {step < steps.length - 1 ? <button onClick={() => canContinue && setStep((value) => Math.min(steps.length - 1, value + 1))} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-xs font-black text-white shadow-[0_10px_28px_rgba(249,115,22,.2)] disabled:opacity-40">Continuar <ArrowRight className="h-4 w-4"/></button> : <a href={SHOPEE_LIVE_STUDIO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-black text-white shadow-[0_12px_34px_rgba(249,115,22,.28)]">Abrir Live Studio <ExternalLink className="h-4 w-4"/></a>}
      </footer>
    </main>
  );
}

function StepTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-orange-300">{eyebrow}</p><h2 className="mt-2 text-2xl font-display font-black text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{description}</p></div>;
}

function SummaryCard({ icon: Icon, label, title, detail, image }: { icon: typeof Flame; label: string; title: string; detail: string; image?: string }) {
  return <div className="rounded-[1.75rem] border border-white/10 bg-white/[.025] p-5">{image ? <img src={image} alt="" className="mb-4 h-32 w-full rounded-2xl object-cover"/> : <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300"><Icon className="h-6 w-6"/></div>}<p className="text-[10px] font-black uppercase tracking-[.15em] text-orange-300">{label}</p><h3 className="mt-2 line-clamp-2 font-bold text-white">{title}</h3><p className="mt-2 text-xs text-slate-400">{detail}</p></div>;
}
