import { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Play,
  ShoppingBag,
  BarChart3,
  Tag,
  Flame,
  ChevronRight,
  Sparkles,
  Clock,
  X,
  Calendar,
  Tv,
  TrendingUp,
  Copy,
  Check,
  Wand2,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export function ProductDetailView({ product, onBack }: { product: Product, onBack: () => void }) {
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '30D' | '90D' | '180D'>('30D');
  const [isUgcOpen, setIsUgcOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<'hook' | 'asmr' | 'pain' | 'unboxing'>('hook');
  const [copied, setCopied] = useState(false);

  // Extract variables with proper fallback
  const priceRange = product.priceRange || `${product.price} - R$ ${Math.round(parseFloat(product.price.replace(/[^\d,]/g, '').replace(',', '.')) * 1.8)},00`;
  const affiliatePotential = product.affiliatePotential || 92;
  const creatorConversion = product.creatorConversion || '2.4%';
  const concentration = product.concentration || 'Alta';
  const liveRevenuePercent = product.liveRevenuePercent || 38;
  const videoRevenuePercent = product.videoRevenuePercent || 68;
  const ugcSourcePercent = product.ugcSourcePercent || videoRevenuePercent;
  const liveSourcePercent = product.liveSourcePercent || liveRevenuePercent;

  // Multiplier calculation for dynamic timeframe interactivity
  const getFactor = (tf: typeof timeframe) => {
    switch (tf) {
      case '1D': return 0.033;
      case '7D': return 0.23;
      case '30D': return 1.0;
      case '90D': return 3.1;
      case '180D': return 6.2;
    }
  };

  const factor = getFactor(timeframe);

  // Parse raw revenue and sales values for timeframe calculations
  const parseValue = (valStr: string) => {
    const numeric = parseFloat(valStr.replace(/[^\d.]/g, ''));
    const isMillion = valStr.toUpperCase().includes('M');
    const isK = valStr.toUpperCase().includes('K');
    if (isMillion) return numeric * 1000000;
    if (isK) return numeric * 1000;
    return numeric;
  };

  const formatValue = (num: number, isCurrency: boolean) => {
    if (num >= 1000000) {
      return (isCurrency ? 'R$ ' : '') + (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (isCurrency ? 'R$ ' : '') + (num / 1000).toFixed(1) + 'K';
    }
    return (isCurrency ? 'R$ ' : '') + num.toLocaleString('pt-BR');
  };

  const rawRevenue = parseValue(product.revenue);
  const rawSales = parseValue(product.sales);

  const calculatedRevenue = formatValue(Math.round(rawRevenue * factor), true);
  const calculatedSales = formatValue(Math.round(rawSales * factor), false);

  const dateLabel = {
    '1D': 'Hoje',
    '7D': 'Últimos 7 dias',
    '30D': '10 de jun. - 10 de jul.',
    '90D': 'Últimos 3 meses',
    '180D': 'Últimos 6 meses'
  }[timeframe];

  // UGC scripts specific to this product
  const getScript = () => {
    const name = product.name;
    const category = product.category;
    switch (activeTemplate) {
      case 'hook':
        return {
          title: "Gancho Viral Invejável 🌟",
          scene1: "[CORTAR PARA] Close-up estético segurando o produto em iluminação natural suave.",
          audio1: "\"Eu juro que tentei guardar esse segredo, mas o resultado desse produto de " + category + " é simplesmente ridículo de tão bom...\"",
          scene2: "[CORTAR PARA] Demonstração prática do produto em ação de forma super satisfatória.",
          audio2: "\"Se você também sofre com isso na sua rotina diária, você precisa ver esse antes e depois. Ele resolve o problema em segundos!\"",
          scene3: "[CORTAR PARA] Close do produto ao lado do preço promocional piscando na tela.",
          audio3: "\"E o melhor: achei com cupom de afiliar na minha bio agora mesmo. Corre antes que acabe o estoque!\""
        };
      case 'asmr':
        return {
          title: "ASMR Estético Altamente Satisfatório 🤫",
          scene1: "[CORTAR PARA] Dedos batendo de leve na embalagem do produto fazendo sons de clique.",
          audio1: "*(Sons nítidos de unhas batendo na superfície e embalagem abrindo de forma lenta)*",
          scene2: "[CORTAR PARA] Utilização em close-up com áudio super amplificado (gotejar, encaixar, ligar).",
          audio2: "*(Áudio sussurrado)* \"Esse é o produto mais relaxante e satisfatório que você vai comprar hoje...\"",
          scene3: "[CORTAR PARA] Link na Bio flutuando na tela.",
          audio3: "*(Som satisfatório de clique)* \"Garanta o seu no primeiro link da minha bio com frete grátis!\""
        };
      case 'pain':
        return {
          title: "Dor extrema + Solução Perfeita 💔",
          scene1: "[CORTAR PARA] Você com cara de frustração extrema lidando com um problema chato do cotidiano.",
          audio1: "\"Eu costumava passar tanta raiva tentando resolver esse problema todo santo dia...\"",
          scene2: "[CORTAR PARA] Mostrando a chegada do produto e a transformação instantânea.",
          audio2: "\"Até que eu descobri o " + name + ". Ele mudou meu jogo completamente. Olha como é ridiculamente simples!\"",
          scene3: "[CORTAR PARA] Você sorrindo aliviado e segurando o produto no peito.",
          audio3: "\"Se você quer economizar seu tempo e sanidade mental, clica no botão e pega o seu agora!\""
        };
      case 'unboxing':
        return {
          title: "Unboxing Autêntico & Review Sincero 📦",
          scene1: "[CORTAR PARA] Caixa misteriosa dos Correios sendo aberta com tesoura.",
          audio1: "\"Chegou o pacote que eu estava mais ansioso para testar este mês! Vamos ver se é tudo isso mesmo...\"",
          scene2: "[CORTAR PARA] Mostrando os detalhes do produto e os acabamentos premium de pertinho.",
          audio2: "\"A qualidade me surpreendeu demais. O material é super resistente e o design é extremamente premium pelo preço.\"",
          scene3: "[CORTAR PARA] Close final com classificação de estrelas brilhando.",
          audio3: "\"Dou nota 10/10 sem pensar duas vezes! Link oficial de desconto liberado nos meus stories!\""
        };
    }
  };

  const script = getScript();

  const handleCopyScript = () => {
    const scriptText = `--- ${script.title} ---\n\nCENA 1: ${script.scene1}\nÁUDIO: ${script.audio1}\n\nCENA 2: ${script.scene2}\nÁUDIO: ${script.audio2}\n\nCENA 3: ${script.scene3}\nÁUDIO: ${script.audio3}`;
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="product-detail-view min-h-screen bg-[#080503] text-[#f1f5f9] font-sans antialiased pb-20 selection:bg-orange-500/30 selection:text-white relative overflow-hidden">
      {/* Dynamic Glass Mesh Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto py-12 px-6 md:px-10 space-y-10 relative z-10">

        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-slate-300 hover:text-white transition-all text-sm font-semibold group glass-button px-5 py-2.5 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-orange-400" /> Voltar ao Radar
          </button>

          <div className="flex items-center gap-2 glass-panel rounded-full px-5 py-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID do Produto:</span>
             <span className="text-[11px] font-mono font-bold text-orange-300">{product.id}</span>
          </div>
        </div>

        {/* Dynamic Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[430px_1fr] gap-12 items-start">

          {/* Left Column (Sticky Image & Strategy Recommendation) */}
          <div className="space-y-8 lg:sticky lg:top-8">

            {/* Elegant Framed Product Image */}
            <div className="aspect-square rounded-[2.5rem] overflow-hidden glass-panel p-5 relative group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700 shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Strategic Recommendation Panel */}
            <div className="glass-panel rounded-[2.2rem] p-8 space-y-5 shadow-xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#fb923c] uppercase tracking-[0.2em] drop-shadow-sm">Recomendação Estratégica</span>
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(251,146,60,0.8)]" />
              </div>
              <p className="text-[15px] font-medium text-slate-200 leading-relaxed italic opacity-95">
                "{product.recommendation}"
              </p>
            </div>
          </div>

          {/* Right Column (Metrics, Performance and Action Actions) */}
          <div className="space-y-10">

            {/* Category and Badges */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-sky-500/20 text-sky-200 border border-sky-400/40 text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm">
                  {product.category}
                </span>
                <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-2 bg-amber-500/25 border border-amber-500/50 px-4 py-1.5 rounded-full shadow-sm">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-amber-200 uppercase tracking-[0.2em]">Escalando agora</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                {product.name}
              </h1>
            </div>

            {/* Price and Affiliate Potential */}
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">

              {/* CURRENT PRICE Card */}
              <div className="glass-panel p-8 rounded-[2rem] flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">PREÇO ATUAL</span>
                  <div className="text-3xl font-display font-bold text-emerald-400 tracking-tight drop-shadow-sm">
                    {priceRange}
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-400" /> Preço com alta variação no mercado
                </div>
              </div>

              {/* AFFILIATE POTENTIAL Card */}
              <div className="glass-panel p-8 rounded-[2rem] flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Potencial para Afiliado</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-display font-bold text-orange-400 drop-shadow-sm">{affiliatePotential}%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Score Máximo</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full space-y-1.5">
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${affiliatePotential}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 h-full rounded-full shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>MÉDIO</span>
                    <span>EXCELENTE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PERFORMANCE METRICS CONTAINER (WITH TIMEFRAME SELECTOR) */}
            <div className="glass-panel rounded-[2.2rem] p-8 space-y-8">

              {/* Header and timeframe tabs selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  <h3 className="font-display font-bold text-lg text-white">Métricas de Desempenho</h3>
                </div>

                {/* Timeframe Selector Tabs */}
                <div className="flex bg-white/[0.04] backdrop-blur-xl border border-white/10 p-1 rounded-xl">
                  {(['1D', '7D', '30D', '90D', '180D'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        timeframe === tf
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selected Label */}
              <div className="flex items-center justify-between text-xs text-slate-300 bg-white/[0.04] backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" /> Período selecionado
                </span>
                <span className="font-bold text-slate-100">{dateLabel}</span>
              </div>

              {/* Shopee intelligence metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'SCORE LOOPLY', value: `${product.aiScore}/100`, note: product.variation, color: 'text-orange-300' },
                  { label: 'VENDIDOS', value: calculatedSales, note: 'Unidades na Shopee', color: 'text-white' },
                  { label: 'PREÇO SHOPEE', value: product.price, note: 'Preço do anúncio', color: 'text-white' },
                  { label: 'COMISSÃO ESTIMADA', value: product.commission, note: 'Por pedido aprovado', color: 'text-emerald-400' },
                  { label: 'CONVERSÃO ESTIMADA', value: creatorConversion, note: 'Potencial do criativo', color: 'text-orange-400' },
                  { label: 'VÍDEOS MAPEADOS', value: product.viralVideos.toString(), note: 'Referências criativas', color: 'text-amber-400' },
                  { label: 'LOJA', value: product.shop, note: 'Origem do anúncio', color: 'text-orange-300' },
                  { label: 'DEMANDA', value: concentration, note: 'Mercado ativo', color: 'text-orange-400' },
                ].map((metric) => (
                  <div key={metric.label} className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{metric.label}</span>
                    <div className="space-y-1 min-w-0">
                      <span className={`text-lg sm:text-xl font-display font-bold block leading-tight truncate ${metric.color}`}>{metric.value}</span>
                      <span className="text-[10px] text-slate-300 font-semibold block">{metric.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Discovery channel mix */}
            <div className="glass-panel rounded-[2.2rem] p-8 space-y-6">
              <div className="flex items-center gap-3"><Tv className="w-5 h-5 text-orange-400" /><h3 className="font-display font-bold text-lg text-white">Canais de descoberta</h3></div>
              <div className="space-y-5">
                {[
                  { label: 'Shopee Vídeo e conteúdo UGC', value: ugcSourcePercent, color: 'from-orange-500 to-amber-500' },
                  { label: 'Busca e recomendações Shopee', value: 100 - ugcSourcePercent, color: 'from-orange-600 to-amber-500' },
                ].map((channel) => (
                  <div key={channel.label} className="space-y-2">
                    <div className="flex justify-between items-center gap-4 text-sm"><span className="font-bold text-slate-200">{channel.label}</span><span className="font-mono font-bold text-orange-300">{channel.value}%</span></div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/10"><motion.div initial={{ width: 0 }} animate={{ width: `${channel.value}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} className={`bg-gradient-to-r ${channel.color} h-full rounded-full`} /></div>
                  </div>
                ))}
              </div>
            </div>
            {/* ACTION BUTTONS BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">

              {/* PRIMARY ACTION: GENERATE UGC (Interactive script block) */}
              <button
                onClick={() => setIsUgcOpen(true)}
                className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white text-base font-bold h-16 rounded-2xl hover:opacity-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(249,115,22,0.35)] border border-white/20 active:scale-[0.98] group"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" /> Gerar Roteiros UGC (IA)
              </button>

              {/* SECONDARY ACTION: AFFILIATE LINK */}
              <a
                href={product.affiliateLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass-button text-white text-base font-bold h-16 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
              >
                <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-orange-300 transition-colors" /> Abrir na Shopee
              </a>
            </div>
          </div>
        </div>

        {/* VIDEOS VIRAL SECTION FROM LIBRARY */}
        <div className="space-y-8 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-white tracking-tight drop-shadow-sm">Criativos de Referência</h2>
              <p className="text-slate-400 text-sm font-medium">Exemplos de alta conversão para o nicho de {product.category}</p>
            </div>
            <button className="text-sm font-bold text-orange-400 hover:text-white transition-colors flex items-center gap-2 group">
              Biblioteca Completa <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[9/16] glass-panel glass-panel-hover rounded-[2rem] relative group overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover animate-video-live opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-md">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                  <span>PREVIEW DIRETO #{i}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 animate-progress-loop shadow-[0_0_8px_#f97316]" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                   <p className="text-xs font-bold text-white line-clamp-1 drop-shadow-md">Criativo Viral #{i}</p>
                   <p className="text-[10px] text-orange-300 font-semibold tracking-wide flex items-center gap-1">
                     <TrendingUp className="w-3 h-3 text-orange-400" /> Conversão Elevada
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UGC SCRIPT GENERATOR IA DIALOG MODAL OVERLAY */}
      <AnimatePresence>
        {isUgcOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Modal Glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUgcOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl"
            />

            {/* Modal card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="glass-panel rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/20 z-10"
            >
              {/* Colored lighting accent */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_10px_rgba(249,115,22,0.8)]" />

              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-400/30">
                    <Sparkles className="w-5 h-5 text-orange-300" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Criador de Scripts UGC</h3>
                    <p className="text-xs text-slate-300">Roteiros virais focados em alta conversão e engajamento</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUgcOpen(false)}
                  className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">

                {/* Script type tabs list */}
                <div className="flex flex-wrap gap-2.5 bg-white/[0.04] backdrop-blur-xl p-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => { setActiveTemplate('hook'); setCopied(false); }}
                    className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTemplate === 'hook'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🌟 Gancho Viral
                  </button>
                  <button
                    onClick={() => { setActiveTemplate('asmr'); setCopied(false); }}
                    className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTemplate === 'asmr'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    🤫 ASMR Estético
                  </button>
                  <button
                    onClick={() => { setActiveTemplate('pain'); setCopied(false); }}
                    className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTemplate === 'pain'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    💔 Dor + Solução
                  </button>
                  <button
                    onClick={() => { setActiveTemplate('unboxing'); setCopied(false); }}
                    className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTemplate === 'unboxing'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    📦 Unboxing Sincero
                  </button>
                </div>

                {/* Rendered script display */}
                <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-5 max-h-[350px] overflow-y-auto shadow-inner relative group/script">

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-white/10 border border-white/10 px-3 py-1 rounded-full">ROTEIRO ATIVO</span>
                    <span className="text-xs font-semibold text-orange-300 flex items-center gap-1.5"><Wand2 className="w-3.5 h-3.5" /> IA Otimizado</span>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed">
                    {/* Scene 1 */}
                    <div className="space-y-1 border-l-2 border-orange-500/40 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider block">CENA 1</span>
                      <p className="text-slate-300 text-xs italic">{script.scene1}</p>
                      <p className="text-white font-medium mt-1">"{script.audio1}"</p>
                    </div>

                    {/* Scene 2 */}
                    <div className="space-y-1 border-l-2 border-orange-500/40 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider block">CENA 2</span>
                      <p className="text-slate-300 text-xs italic">{script.scene2}</p>
                      <p className="text-white font-medium mt-1">"{script.audio2}"</p>
                    </div>

                    {/* Scene 3 */}
                    <div className="space-y-1 border-l-2 border-orange-500/40 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider block">CENA 3</span>
                      <p className="text-slate-300 text-xs italic">{script.scene3}</p>
                      <p className="text-white font-medium mt-1">"{script.audio3}"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 md:p-8 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-orange-400 animate-pulse" /> Recomenda-se usar voz sintética ou natural energética.
                </span>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCopyScript}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-white font-bold px-6 h-12 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-white/20"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar Roteiro
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
