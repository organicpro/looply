/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { RadarView } from './components/RadarView';
import { GalleryView } from './components/GalleryView';
import { LessonsView } from './components/LessonsView';
import { ProductDetailView } from './components/ProductDetailView';
import { Product } from './types';
import { LoginView } from './components/LoginView';
import { ProfileView } from './components/ProfileView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('looply_user_name'));
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('yviral_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('yviral_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderView = () => {
    if (selectedProduct) {
      return (
        <ProductDetailView 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }} />;
      case 'radar':
        return <RadarView onSelectProduct={(p) => setSelectedProduct(p)} />;
      case 'gallery':
        return <GalleryView />;
      case 'lessons':
        return <LessonsView />;
      case 'profile':
        return <ProfileView />;
      case 'invite':
        return <ProfileView initialSection="invite" />;
      default:
        return <HomeView onNavigate={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }} />;
    }
  };

  if (!user) return <LoginView onLogin={(name, photo) => { localStorage.setItem('looply_user_name', name); if (photo) localStorage.setItem('looply_profile_avatar', photo); setUser(name); }} />;

  return (
    <div className="looply-shell flex flex-col min-h-screen bg-background selection:bg-purple-primary/30 selection:text-white transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main className="looply-main flex-1 relative overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct ? `product-${selectedProduct.id}` : activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="looply-view w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
