import { useState } from 'react';
import {
  Clock,
  ChevronRight,
  Play,
  ChevronLeft,
  CheckCircle,
  FileText,
  MessageSquare,
  Info,
  Youtube,
  Lock,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { lessons } from '../data';

export function LessonsView() {
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];
  const activeIndex = lessons.findIndex(l => l.id === activeLessonId);

  const nextLesson = () => {
    if (activeIndex < lessons.length - 1) {
      setActiveLessonId(lessons[activeIndex + 1].id);
    }
  };

  const prevLesson = () => {
    if (activeIndex > 0) {
      setActiveLessonId(lessons[activeIndex - 1].id);
    }
  };

  return (
    <div className="lessons-view relative flex h-[calc(100vh-64px)] overflow-hidden bg-[#080503] text-slate-100">
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/55 px-6 text-center backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl"
        >
          <div className="mx-auto mb-6 h-2.5 w-2.5 animate-pulse rounded-full bg-orange-400 shadow-[0_0_24px_rgba(251,146,60,1)]" />
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-orange-400">Conteúdo em atualização</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            As aulas estão sendo atualizadas
          </h1>
          <p className="mt-6 text-base text-slate-300 sm:text-lg">
            Previsão de liberação em <strong className="font-bold text-orange-400">20/08</strong>
          </p>
        </motion.div>
      </div>

      {/* Curriculum Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '380px' : '0px' }}
        className="lessons-sidebar border-r border-white/10 bg-slate-950/50 backdrop-blur-2xl flex flex-col relative"
      >
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-white drop-shadow-sm">Cronograma de Estudo</h2>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span>0% concluído</span>
              <span>Progresso</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-0 transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
            </div>
          </div>

          <div className="space-y-8 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Essencial
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                </h3>
              </div>

              <div className="space-y-1.5">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                      activeLessonId === lesson.id
                        ? 'bg-white/[0.08] backdrop-blur-xl border border-orange-400/40 shadow-[0_0_25px_rgba(249,115,22,0.2)]'
                        : 'hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      activeLessonId === lesson.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-white/20'
                        : 'bg-white/10 text-slate-400 group-hover:bg-white/15'
                    }`}>
                      <Play className={`w-3.5 h-3.5 ${activeLessonId === lesson.id ? 'fill-current' : ''}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${
                        activeLessonId === lesson.id ? 'text-orange-300' : 'text-slate-200'
                      }`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                    </div>
                    {lesson.level === 'Avançado' && (
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="lessons-content flex-1 overflow-y-auto flex flex-col">
        {/* Breadcrumbs & Header */}
        <header className="lessons-toolbar p-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="hover:text-orange-400 cursor-pointer transition-colors">Início</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-orange-400 cursor-pointer transition-colors">Essencial</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Aula {activeLesson.order}</span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-slate-300 hover:text-white transition-all"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </header>

        <div className="lessons-body px-8 pb-16 max-w-6xl w-full mx-auto space-y-8">
          {/* Video Player Area */}
          <div className="lesson-player relative aspect-video w-full glass-panel rounded-[3rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] group border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=675&fit=crop"
              alt="Video Thumbnail"
              className="w-full h-full object-cover opacity-20 blur-[2px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-12">
              <div className="text-center space-y-4 max-w-2xl">
                <p className="text-orange-400 font-bold text-sm uppercase tracking-[0.3em]">Módulo 0{activeLesson.order}</p>
                <h2 className="text-5xl font-display font-bold text-white leading-tight drop-shadow-md">{activeLesson.title}</h2>
                <p className="text-slate-300 text-lg font-medium">Clique no botão abaixo para iniciar a aula e acelerar seus resultados.</p>
              </div>

              <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white rounded-full font-bold text-lg shadow-[0_0_25px_rgba(249,115,22,0.4)] border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                <Play className="w-6 h-6 fill-current" />
                Iniciar Aula
              </button>

              <div className="absolute bottom-8 right-12 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Assista no</span>
                <Youtube className="text-red-500 w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Lesson Footer Actions */}
          <div className="lesson-footer flex items-center justify-between py-6 border-b border-white/10">
            <h1 className="text-3xl font-display font-bold text-white drop-shadow-sm">{activeLesson.title}</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={prevLesson}
                disabled={activeIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-button text-sm font-bold text-slate-200 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                Aula Anterior
              </button>
              <button
                onClick={nextLesson}
                disabled={activeIndex === lessons.length - 1}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-white/20 hover:opacity-90 transition-all disabled:opacity-30"
              >
                Marcar como Concluída
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-10 border-b border-white/10">
              {[
                { id: 'overview', label: 'Visão Geral', icon: Info },
                { id: 'materials', label: 'Materiais de Apoio', icon: FileText },
                { id: 'comments', label: 'Comentários', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.id ? 'text-orange-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-full shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="max-w-3xl space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Nesta aula inaugural, faremos um tour completo pela interface da plataforma. Você aprenderá a navegar pelas seções principais, entenderá a lógica por trás do radar de produtos e descobrirá como a plataforma traduz suas ideias de negócio em resultados reais.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 glass-panel rounded-[2rem] space-y-2">
                          <CheckCircle className="text-emerald-400 w-5 h-5" />
                          <h4 className="font-bold text-white">O que você vai aprender</h4>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Configuração inicial do perfil</li>
                            <li>• Navegação no Radar de Produtos</li>
                            <li>• Como solicitar suporte VIP</li>
                          </ul>
                        </div>
                        <div className="p-6 glass-panel rounded-[2rem] space-y-2">
                          <Clock className="text-orange-400 w-5 h-5" />
                          <h4 className="font-bold text-white">Duração da Aula</h4>
                          <p className="text-sm text-slate-300">{activeLesson.duration} de conteúdo prático e direto ao ponto.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'materials' && (
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: 'Manual do Aluno (PDF)', size: '2.4 MB' },
                        { title: 'Checklist de Configuração', size: '1.1 MB' },
                        { title: 'Slides da Apresentação', size: '5.8 MB' },
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 glass-panel rounded-2xl group hover:border-orange-500/40 transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{doc.title}</p>
                              <p className="text-[10px] font-bold text-slate-400">{doc.size}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'comments' && (
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 shrink-0 border border-white/10" />
                        <div className="flex-1 space-y-4">
                          <textarea
                            placeholder="Deixe sua dúvida ou comentário..."
                            className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-white/25 min-h-[120px] shadow-inner"
                          />
                          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-full hover:opacity-90 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-white/20">
                            Enviar Comentário
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
