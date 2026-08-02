import { Search, Heart, MessageSquare, ExternalLink, Copy, Bookmark, Play, Check, Sparkles, Volume2, Share2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { videos } from '../data';
import { Video } from '../types';
import { useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export function GalleryView() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const filters = ['Todos', 'Mais vistos', 'UGC', 'POV', 'Review', 'Antes e Depois', 'Unboxing'];
  const previewById: Record<string,string> = {v11:'/videos/v11-chaleira.mp4',v2:'/videos/v2-facas.mp4',v5:'/videos/v5-panelas.mp4',v6:'/videos/v6-parafusadeira.mp4',v10:'/videos/v10-copo-termico.mp4',v4:'/videos/v4-filtro-linha.mp4',v13:'/videos/v13-kit-ferramentas.mp4',v7:'/videos/v7-tiras-clareadoras.mp4',v12:'/videos/v12-massageador.mp4',v9:'/videos/v9-magnesio.mp4',v1:'/videos/v1-oculos.mp4',v8:'/videos/v8-capa-celular.mp4',v3:'/videos/v5-panelas.mp4'};

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'Todos' || activeFilter === 'Mais vistos') {
      return matchesSearch;
    }
    return matchesSearch && video.type.includes(activeFilter);
  });

  const handleCopyHook = () => {
    if (selectedVideo) {
      navigator.clipboard.writeText(`Roteiro & Gancho Viral:\n"${selectedVideo.description}"\n\nHashtags: ${selectedVideo.hashtags.map(h => '#' + h).join(' ')}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto py-10 px-6 md:px-10 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Criativos de Alta Conversão</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white drop-shadow-sm">
            Biblioteca de Vídeos Virais
          </h1>
          <p className="text-slate-400 text-sm">
            Exemplos reais e virais dos produtos mais lucrativos no TikTok Shop & Shopee.
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-pink-400 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por produto, gancho ou hashtag..." 
            className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white placeholder-slate-400 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-pink-500/50 focus:bg-white/[0.08] shadow-inner transition-all"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeFilter === filter 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)] border-white/30 scale-105' 
                : 'bg-white/[0.04] backdrop-blur-xl border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <motion.div 
            key={video.id}
            variants={item}
            className="glass-panel glass-panel-hover rounded-[2rem] overflow-hidden group cursor-pointer hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] hover:border-pink-500/50 transition-all duration-300"
            onClick={() => {
              setSelectedVideo(video);
              setIsPlaying(true);
            }}
          >
            <div className="aspect-[9/16] relative overflow-hidden m-3 rounded-[1.6rem] bg-slate-900/80 border border-white/10">
              {/* Autoplay video preview feed with active motion */}
              <video src={previewById[video.id]} poster={video.thumbnail} className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label={`Preview de ${video.productName}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white z-10"><p className="font-bold text-xs leading-snug line-clamp-2">{video.productName}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="py-20 text-center space-y-3 bg-white/[0.02] border border-white/5 rounded-3xl">
          <p className="text-slate-400 text-sm font-medium">Nenhum vídeo encontrado para "{searchQuery}".</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveFilter('Todos'); }}
            className="text-xs text-pink-400 hover:underline font-bold"
          >
            Limpar busca e filtros
          </button>
        </div>
      )}

      {/* Video Detail Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/85 backdrop-blur-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/20"
            >
              {/* Left Column: Simulated Vertical Video Player */}
              <div className="md:w-[400px] h-[450px] md:h-auto bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center group shrink-0 border-r border-white/10">
                <video src={previewById[selectedVideo.id]} poster={selectedVideo.thumbnail} className="w-full h-full object-cover" autoPlay muted loop playsInline controls aria-label={`Vídeo de ${selectedVideo.productName}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

                {/* Back Button */}
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-lg"
                >
                  ← Voltar
                </button>

                {/* Simulated Player Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    AO VIVO VIRAL
                  </div>
                </div>

                {/* Center Play/Pause button */}
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-2xl shadow-pink-500/50 transform group-hover/btn:scale-110 transition-transform">
                    {isPlaying ? (
                      <span className="text-xs font-bold uppercase tracking-wider">PAUSAR</span>
                    ) : (
                      <Play className="w-8 h-8 fill-white ml-1" />
                    )}
                  </div>
                </button>

                {/* Bottom TikTok Style Overlay */}
                <div className="absolute bottom-6 left-5 right-5 space-y-3 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                      YV
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">@afiliado.top</p>
                      <p className="text-[10px] text-slate-300">Achadinho do Dia</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-100 line-clamp-2 leading-snug">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-pink-300 pt-1">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedVideo.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> {selectedVideo.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {selectedVideo.comments}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Creative Analysis & Hook Details */}
              <div className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto bg-slate-900/80 backdrop-blur-2xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-pink-500/20 text-pink-300 border border-pink-400/30 text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
                      Criativo de Alta Conversão
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{selectedVideo.publishedAt}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white leading-tight">
                    {selectedVideo.productName}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      Roteiro e Gancho Utilizado
                    </h4>
                    {copied && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copiado!
                      </span>
                    )}
                  </div>
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10 space-y-2 relative">
                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{selectedVideo.description}"
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Hashtags Recomendadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.hashtags.map(tag => (
                      <span key={tag} className="bg-white/[0.05] text-slate-200 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-pink-500/40 hover:text-pink-300 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <button 
                    onClick={handleCopyHook}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] border border-white/20 text-xs"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Roteiro Copiado!' : 'Copiar Roteiro e Ganchos do Vídeo'}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={selectedVideo.url !== '#' ? selectedVideo.url : 'https://www.tiktok.com/?_r=1'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button py-3 rounded-xl text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Abrir no TikTok
                    </a>
                    <button 
                      onClick={() => setSaved(!saved)}
                      className={`glass-button py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${saved ? 'text-pink-400 border-pink-500/40' : 'text-slate-200'}`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-pink-400' : ''}`} />
                      {saved ? 'Salvo nos Favoritos' : 'Salvar Vídeo'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

