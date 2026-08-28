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
import { LiveBuilderView } from './components/LiveBuilderView';
import { AnimatePresence, motion } from 'motion/react';

const LOOPLY_ACCESS_CODE = '739284';

export default function App() {
  const [user, setUser] = useState(() => {
    const hasValidCode = localStorage.getItem('looply_access_code') === LOOPLY_ACCESS_CODE
      && localStorage.getItem('looply_access_code_validated') === 'true';

    return hasValidCode ? localStorage.getItem('looply_user_name') : null;
  });
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  useEffect(() => {
    localStorage.setItem('yviral_theme', 'dark');
    document.documentElement.classList.remove('light');
    document.body.classList.remove('light');
  }, []);

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
      case 'live-builder':
        return <LiveBuilderView />;
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
    <div className="looply-shell flex flex-col min-h-screen bg-background selection:bg-orange-primary/30 selection:text-white transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null);
        }}
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
