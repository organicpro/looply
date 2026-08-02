import { useState, useEffect } from 'react';
import { 
  Plus, 
  ShoppingBag,
  Play,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Radio,
  Tv,
  DollarSign,
  Clock,
  Users,
  Activity,
  RefreshCw,
  Eye,
  Zap,
  X,
  RotateCcw,
  Sliders,
  Check,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis,
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

interface CustomMetrics {
  hojeGmv: number;
  d7Gmv: number;
  d30Gmv: number;
  hojeHoras: string;
  d7Horas: string;
  d30Horas: string;
  hojeViewers: number;
  d7Viewers: number;
  d30Viewers: number;
  hojePedidos: number;
  d7Pedidos: number;
  d30Pedidos: number;
  canalOfficialGmv: number;
  canalBeautyGmv: number;
}

const DEFAULT_METRICS: CustomMetrics = {
  hojeGmv: 0,
  d7Gmv: 0,
  d30Gmv: 0,
  hojeHoras: '0h 0m',
  d7Horas: '0h 0m',
  d30Horas: '0h 0m',
  hojeViewers: 0,
  d7Viewers: 0,
  d30Viewers: 0,
  hojePedidos: 0,
  d7Pedidos: 0,
  d30Pedidos: 0,
  canalOfficialGmv: 0,
  canalBeautyGmv: 0
};

export function HomeView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [timeRange, setTimeRange] = useState<'hoje' | '7d' | '30d'>('hoje');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const [metrics, setMetrics] = useState<CustomMetrics>(() => {
    try {
      if (localStorage.getItem('yviral_metrics_reset_v1') !== 'true') {
        localStorage.removeItem('yviral_custom_metrics');
        localStorage.setItem('yviral_metrics_reset_v1', 'true');
      }
      const saved = localStorage.getItem('yviral_custom_metrics');
      return saved ? JSON.parse(saved) : DEFAULT_METRICS;
    } catch {
      return DEFAULT_METRICS;
    }
  });

  // Secret keyboard listener: type 'yviral' or '1234' or 'secret' anywhere to open panel!
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

      if (
        keyBuffer.includes('yviral') || 
        keyBuffer.includes('1234') || 
        keyBuffer.includes('admin') || 
        keyBuffer.includes('secret') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's')
      ) {
        setIsSecretOpen(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBadgeClick = () => {
    const next = clickCount + 1;
    if (next >= 3) {
      setIsSecretOpen(true);
      setClickCount(0);
    } else {
      setClickCount(next);
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const saveMetrics = (newMetrics: CustomMetrics) => {
    setMetrics(newMetrics);
    localStorage.setItem('yviral_custom_metrics', JSON.stringify(newMetrics));
  };

  const resetMetrics = () => {
    setMetrics(DEFAULT_METRICS);
    localStorage.removeItem('yviral_custom_metrics');
  };

  // Dynamic values based on timeRange selection
  const currentTotalGmv = timeRange === 'hoje' ? metrics.hojeGmv : timeRange === '7d' ? metrics.d7Gmv : metrics.d30Gmv;
  const currentLiveGmv = Math.round(currentTotalGmv * 0.68);
  const currentVitrineGmv = currentTotalGmv - currentLiveGmv;
  const currentHoras = timeRange === 'hoje' ? metrics.hojeHoras : timeRange === '7d' ? metrics.d7Horas : metrics.d30Horas;
  const currentViewers = timeRange === 'hoje' ? metrics.hojeViewers : timeRange === '7d' ? metrics.d7Viewers : metrics.d30Viewers;
  const currentPedidos = timeRange === 'hoje' ? metrics.hojePedidos : timeRange === '7d' ? metrics.d7Pedidos : metrics.d30Pedidos;
  const ticketMedio = currentPedidos > 0 ? (currentTotalGmv / currentPedidos).toFixed(2) : '0.00';

  // Dynamic Chart Data according to timeRange
  const chartData = timeRange === 'hoje' ? [
    { time: '00:00', gmv: Math.round(currentTotalGmv * 0.04), horas: 0.5 },
    { time: '04:00', gmv: Math.round(currentTotalGmv * 0.08), horas: 1.0 },
    { time: '08:00', gmv: Math.round(currentTotalGmv * 0.22), horas: 2.2 },
    { time: '12:00', gmv: Math.round(currentTotalGmv * 0.45), horas: 3.5 },
    { time: '16:00', gmv: Math.round(currentTotalGmv * 0.68), horas: 4.8 },
    { time: '20:00', gmv: Math.round(currentTotalGmv * 0.88), horas: 5.8 },
    { time: '23:59', gmv: currentTotalGmv, horas: 6.25 },
  ] : timeRange === '7d' ? [
    { time: 'Seg', gmv: Math.round(currentTotalGmv * 0.10), horas: 5.2 },
    { time: 'Ter', gmv: Math.round(currentTotalGmv * 0.12), horas: 6.1 },
    { time: 'Qua', gmv: Math.round(currentTotalGmv * 0.15), horas: 6.8 },
    { time: 'Qui', gmv: Math.round(currentTotalGmv * 0.13), horas: 5.8 },
    { time: 'Sex', gmv: Math.round(currentTotalGmv * 0.18), horas: 7.0 },
    { time: 'Sáb', gmv: Math.round(currentTotalGmv * 0.20), horas: 7.5 },
    { time: 'Dom', gmv: Math.round(currentTotalGmv * 0.12), horas: 4.1 },
  ] : [
    { time: 'Semana 1', gmv: Math.round(currentTotalGmv * 0.21), horas: 42 },
    { time: 'Semana 2', gmv: Math.round(currentTotalGmv * 0.24), horas: 45 },
    { time: 'Semana 3', gmv: Math.round(currentTotalGmv * 0.27), horas: 48 },
    { time: 'Semana 4', gmv: Math.round(currentTotalGmv * 0.28), horas: 49 },
  ];

  const pieData = [
    { name: 'TikTok Live Stream', value: Math.round(currentTotalGmv * 0.68), color: '#f43f5e' },
    { name: 'TikTok Shop Vitrine', value: Math.round(currentTotalGmv * 0.22), color: '#00f2fe' },
    { name: 'Vídeos Virais (Feed)', value: Math.round(currentTotalGmv * 0.10), color: '#f59e0b' },
  ];

  // Active live channels table data
  const liveChannels = [
    {
      id: 'st-1',
      channel: '@yviral.official',
      host: 'Aline Santos',
      status: 'ONLINE',
      viewers: timeRange === 'hoje' ? '320' : timeRange === '7d' ? '1.2K' : '4.5K',
      hoursStreamed: timeRange === 'hoje' ? '3h 40m' : timeRange === '7d' ? '22h 10m' : '98h 40m',
      gmvGenerated: `R$ ${(timeRange === 'hoje' ? metrics.canalOfficialGmv : timeRange === '7d' ? metrics.d7Gmv * 0.6 : metrics.d30Gmv * 0.6).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      topProduct: 'Perfume Attracione Men',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
    },
    {
      id: 'st-2',
      channel: '@yviral.beauty',
      host: 'Carla Mendez',
      status: 'ONLINE',
      viewers: timeRange === 'hoje' ? '160' : timeRange === '7d' ? '950' : '3.9K',
      hoursStreamed: timeRange === 'hoje' ? '2h 35m' : timeRange === '7d' ? '20h 20m' : '85h 40m',
      gmvGenerated: `R$ ${(timeRange === 'hoje' ? metrics.canalBeautyGmv : timeRange === '7d' ? metrics.d7Gmv * 0.4 : metrics.d30Gmv * 0.4).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      topProduct: 'Top / Body Modelador Feminino',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop'
    },
    {
      id: 'st-3',
      channel: '@yviral.tech',
      host: 'Lucas Silva',
      status: 'AGENDADA',
      viewers: '0',
      hoursStreamed: '0h (Prev. 19:00)',
      gmvGenerated: 'R$ 0,00',
      topProduct: 'Relógio M60 PRO Smartwatch',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1500px] mx-auto py-8 px-4 sm:px-6 md:px-10 space-y-8 relative"
    >
      {/* Header with Title & Date Range Toggle */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Dashboard de Lives & GMV
            </h1>
            <span 
              onClick={handleBadgeClick}
              title="Clique 3x para abrir configurações secretas"
              className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full cursor-pointer hover:border-emerald-400/50 transition-colors select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              TikTok Shop Ativo
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Visão geral de faturamento, métricas de engajamento e transmissões ao vivo.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/10 shadow-inner">
            {(['hoje', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all select-none ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === 'hoje' ? 'Hoje' : range === '7d' ? '7 Dias' : '30 Dias'}
              </button>
            ))}
          </div>

          <button 
            onClick={handleRefresh}
            className="w-8 h-8 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-pink-400' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Faturamento GMV Total */}
        <motion.div variants={item} className="glass-panel rounded-[2rem] p-6 relative overflow-hidden group hover:border-pink-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-inner">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              +24.2%
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Faturamento GMV Total</p>
          <p className="text-2xl sm:text-3xl font-display font-black text-white mt-1 group-hover:text-pink-300 transition-colors">
            R$ {currentTotalGmv.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Lives: <strong className="text-white">R$ {currentLiveGmv.toLocaleString('pt-BR')}</strong></span>
            <span>Vitrine: <strong className="text-white">R$ {currentVitrineGmv.toLocaleString('pt-BR')}</strong></span>
          </div>
        </motion.div>

        {/* KPI 2: Horas Transmitidas */}
        <motion.div variants={item} className="glass-panel rounded-[2rem] p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Tv className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Ao Vivo
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Horas Transmitidas</p>
          <p className="text-2xl sm:text-3xl font-display font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">
            {currentHoras}
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Período: <strong className="text-white uppercase">{timeRange}</strong></span>
            <span>Retenção: <strong className="text-emerald-400">82.4%</strong></span>
          </div>
        </motion.div>

        {/* KPI 3: Espectadores */}
        <motion.div variants={item} className="glass-panel rounded-[2rem] p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Pico {(currentViewers * 2.4).toFixed(0)}
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Espectadores Ativos</p>
          <p className="text-2xl sm:text-3xl font-display font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
            {currentViewers.toLocaleString('pt-BR')}
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Cliques na Sacola: <strong className="text-white">{(currentViewers * 1.8).toFixed(0)}</strong></span>
            <span>Compartilhar: <strong className="text-white">{(currentViewers * 0.4).toFixed(0)}</strong></span>
          </div>
        </motion.div>

        {/* KPI 4: Pedidos */}
        <motion.div variants={item} className="glass-panel rounded-[2rem] p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5" />
              Conv. 4.6%
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total de Pedidos</p>
          <p className="text-2xl sm:text-3xl font-display font-black text-white mt-1 group-hover:text-emerald-300 transition-colors">
            {currentPedidos.toLocaleString('pt-BR')}
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Ticket Médio: <strong className="text-white">R$ {ticketMedio}</strong></span>
            <span>Aprovações: <strong className="text-emerald-400">97.8%</strong></span>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Chart: Desempenho de GMV */}
        <motion.div variants={item} className="col-span-12 lg:col-span-8 glass-panel rounded-[2.5rem] p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-white">Evolução do Faturamento & Carga Horária</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  {timeRange === 'hoje' ? 'Horário' : timeRange === '7d' ? 'Diário' : 'Semanal'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Valores acumulados em R$ correlacionados com as horas de transmissão.</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                <span className="text-slate-300">GMV (R$)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <span className="text-slate-300">Horas</span>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gmvGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="horasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `R$${val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                    borderRadius: '1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: any) => [
                    name === 'gmv' ? `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `${value} hrs`,
                    name === 'gmv' ? 'GMV Faturado' : 'Horas Transmitidas'
                  ]}
                />
                <Area type="monotone" dataKey="gmv" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#gmvGradient)" />
                <Area type="monotone" dataKey="horas" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#horasGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Chart: Origem do Faturamento */}
        <motion.div variants={item} className="col-span-12 lg:col-span-4 glass-panel rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <h3 className="font-display font-bold text-xl text-white">Fontes de Receita</h3>
            <p className="text-xs text-slate-400 mt-1">Origem do faturamento dentro do ecossistema TikTok.</p>
          </div>

          <div className="h-[200px] w-full my-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Faturamento']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
              <span className="text-sm font-black text-white">R$ {currentTotalGmv.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-white">R$ {item.value.toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Live Channels Stream Status Table */}
      <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display font-bold text-xl text-white">Transmissões Conectadas</h3>
              <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                3 Canais
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Status e faturamento por canal de transmissão em tempo real.</p>
          </div>

          <button 
            onClick={() => onNavigate('radar')}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-white/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Vincular Canal</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="pb-3 px-2">Canal / Apresentador</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Horas</th>
                <th className="pb-3 px-2">Espectadores</th>
                <th className="pb-3 px-2">Produto Destaque</th>
                <th className="pb-3 px-2 text-right">GMV Gerado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {liveChannels.map((st) => (
                <tr key={st.id} className="hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={st.avatar} alt={st.host} className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md" />
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors">{st.channel}</p>
                        <p className="text-xs text-slate-400">{st.host}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-2">
                    {st.status === 'ONLINE' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        AO VIVO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30">
                        <Clock className="w-3 h-3" />
                        AGENDADA
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-2 font-mono text-xs font-bold text-slate-200">
                    {st.hoursStreamed}
                  </td>

                  <td className="py-4 px-2">
                    <span className="font-bold text-xs text-cyan-300 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {st.viewers}
                    </span>
                  </td>

                  <td className="py-4 px-2 text-xs font-medium text-slate-300 max-w-[180px] truncate">
                    {st.topProduct}
                  </td>

                  <td className="py-4 px-2 text-right">
                    <span className="font-display font-black text-sm text-pink-400">
                      {st.gmvGenerated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            id: 'radar', 
            title: 'Radar de Produtos', 
            desc: 'Analise produtos virais de alto GMV para vender em suas Lives.',
            icon: ShoppingBag,
            color: 'text-pink-400',
            glow: 'hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]'
          },
          { 
            id: 'gallery', 
            title: 'Galeria de Vídeos', 
            desc: 'Acesse gravações e criativos que geraram mais vendas nas transmissões.',
            icon: Play,
            color: 'text-cyan-400',
            glow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]'
          },
          { 
            id: 'lessons', 
            title: 'Academy (Aulas)', 
            desc: 'Aprenda techniques de roteiro para dobrar suas vendas em Lives.',
            icon: GraduationCap,
            color: 'text-amber-400',
            glow: 'hover:shadow-[0_0_35px_rgba(251,191,36,0.25)]'
          },
          { 
            id: 'challenge', 
            title: 'Desafio 8 Dias', 
            desc: 'Crie seu primeiro ecossistema de Lives com faturamento automatizado.',
            icon: CheckCircle2,
            color: 'text-emerald-400',
            glow: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.25)]'
          }
        ].map((card) => (
          <button 
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className={`glass-panel glass-panel-hover rounded-[2.2rem] p-6 text-left transition-all group flex flex-col gap-3 h-full active:scale-[0.98] ${card.glow}`}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/[0.06] border border-white/10 group-hover:border-white/25 group-hover:bg-white/[0.12] transition-colors shadow-inner">
              <card.icon className={`w-5 h-5 ${card.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="space-y-1 mt-1">
              <h4 className="text-white font-display font-bold text-base group-hover:text-pink-300 transition-colors">{card.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">{card.desc}</p>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Secret Configuration Modal (Opened automatically by typing 'yviral' or '1234') */}
      <AnimatePresence>
        {isSecretOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-950 border border-pink-500/40 rounded-[2.5rem] p-6 sm:p-8 max-w-xl w-full text-white shadow-[0_0_60px_rgba(244,63,94,0.3)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      Painel Secreto de Métricas
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-slate-400">Ajuste os valores exibidos no Dashboard em tempo real.</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSecretOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5 py-6 max-h-[70vh] overflow-y-auto pr-1">
                {/* GMV Inputs */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Valores de Faturamento GMV (R$)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Hoje (R$)</label>
                      <input 
                        type="number"
                        value={metrics.hojeGmv}
                        onChange={(e) => setMetrics({ ...metrics, hojeGmv: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">7 Dias (R$)</label>
                      <input 
                        type="number"
                        value={metrics.d7Gmv}
                        onChange={(e) => setMetrics({ ...metrics, d7Gmv: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">30 Dias (R$)</label>
                      <input 
                        type="number"
                        value={metrics.d30Gmv}
                        onChange={(e) => setMetrics({ ...metrics, d30Gmv: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Pedidos & Espectadores */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Volume de Pedidos & Espectadores</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Pedidos (Hoje)</label>
                      <input 
                        type="number"
                        value={metrics.hojePedidos}
                        onChange={(e) => setMetrics({ ...metrics, hojePedidos: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Pedidos (7 Dias)</label>
                      <input 
                        type="number"
                        value={metrics.d7Pedidos}
                        onChange={(e) => setMetrics({ ...metrics, d7Pedidos: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Espectadores (Hoje)</label>
                      <input 
                        type="number"
                        value={metrics.hojeViewers}
                        onChange={(e) => setMetrics({ ...metrics, hojeViewers: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Horas Transmitidas */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Horas Transmitidas (Texto)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Hoje</label>
                      <input 
                        type="text"
                        value={metrics.hojeHoras}
                        onChange={(e) => setMetrics({ ...metrics, hojeHoras: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">7 Dias</label>
                      <input 
                        type="text"
                        value={metrics.d7Horas}
                        onChange={(e) => setMetrics({ ...metrics, d7Horas: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">30 Dias</label>
                      <input 
                        type="text"
                        value={metrics.d30Horas}
                        onChange={(e) => setMetrics({ ...metrics, d30Horas: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Canais Principais */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Faturamento de Canais (Hoje)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">@yviral.official (R$)</label>
                      <input 
                        type="number"
                        value={metrics.canalOfficialGmv}
                        onChange={(e) => setMetrics({ ...metrics, canalOfficialGmv: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">@yviral.beauty (R$)</label>
                      <input 
                        type="number"
                        value={metrics.canalBeautyGmv}
                        onChange={(e) => setMetrics({ ...metrics, canalBeautyGmv: Number(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={resetMetrics}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurar Padrões
                </button>

                <button
                  onClick={() => {
                    saveMetrics(metrics);
                    setIsSecretOpen(false);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-500/25 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Salvar e Aplicar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

