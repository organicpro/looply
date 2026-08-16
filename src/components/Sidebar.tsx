import { useState } from 'react';
import {
  Home,
  Radar,
  MonitorPlay,
  GraduationCap,
  Search,
  Users,
  Download,
  ChevronDown
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileName = localStorage.getItem('looply_user_name') || localStorage.getItem('looply_profile_name') || 'Meu perfil';
  const profileAvatar = localStorage.getItem('looply_profile_avatar');
  const menuItems = [
    { id: 'home', label: 'Explorar', icon: Home },
    { id: 'radar', label: 'Produtos', icon: Radar },
    { id: 'gallery', label: 'Vídeos', icon: MonitorPlay },
    { id: 'lessons', label: 'Academy', icon: GraduationCap },
  ];

  return (
    <header className="looply-header w-full h-16 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-2xl px-6 z-50 shadow-lg relative">
      {/* LEFT: Logo & Brand Mark */}
      <div className="looply-brand flex items-center gap-4 z-10">
        <div onClick={() => setActiveTab('home')} className="cursor-pointer group flex items-center gap-2">
          <Logo size={48} showText={false} />
        </div>
      </div>

      {/* CENTER: Main Floating Navigation Menu */}
      <div className="looply-nav-wrap absolute left-1/2 -translate-x-1/2 flex items-center">
        <nav className="looply-primary-nav flex items-center bg-white/[0.05] dark:bg-white/[0.04] backdrop-blur-2xl p-1 rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-1.5 flex items-center gap-2 rounded-full text-xs font-bold transition-all duration-300 relative select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] border border-white/30 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'scale-110' : 'opacity-70'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
                {item.id === 'lessons' && <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Actions, Search, Theme Toggle & Profile */}
      <div className="looply-header-actions flex items-center gap-3 z-10">
        {/* Search input box */}
        <div className="looply-search relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-full pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] w-36 lg:w-44 transition-all shadow-inner"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 pointer-events-none">
            /
          </kbd>
        </div>

        {/* Download App button */}
        <button className="hidden sm:flex px-4 py-1.5 bg-gradient-to-r from-orange-500/80 to-amber-500/80 hover:from-orange-500 hover:to-amber-500 text-white rounded-full text-xs font-bold items-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20 active:scale-95">
          <Download className="w-3.5 h-3.5" />
          <span>Baixar Extensão</span>
        </button>

        {/* User Avatar */}
        <div className="relative group">
          <button onClick={() => setProfileOpen(v => !v)} title="Meu perfil" className="cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs border border-white/30 shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform">{profileAvatar ? <img src={profileAvatar} alt={profileName} className="w-full h-full object-cover" /> : profileName.charAt(0).toUpperCase()}</div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 z-[1000] w-52 bg-slate-950/98 rounded-2xl p-2 shadow-[0_18px_45px_rgba(0,0,0,.65)] border border-white/20">
              <div className="px-3 py-2 text-xs text-slate-400 border-b border-white/10 mb-1">{profileName}</div><button onClick={() => { setProfileOpen(false); setActiveTab('profile'); }} className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-white hover:bg-white/10">Meu perfil</button>
              <button onClick={() => { setProfileOpen(false); setActiveTab('invite'); }} className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-orange-300 hover:bg-white/10">Convite especial</button>
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
        </div>
      </div>
    </header>
  );
}
