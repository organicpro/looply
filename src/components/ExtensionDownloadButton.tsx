import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, FolderOpen, Puzzle, Settings2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EXTENSION_DOWNLOAD_URL = '/looply-shopee-rtmp-extension-v1.6.2.zip';

interface ExtensionDownloadButtonProps {
  variant?: 'hero' | 'header';
}

export function ExtensionDownloadButton({ variant = 'hero' }: ExtensionDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonClass = variant === 'header'
    ? 'hidden sm:flex px-4 py-1.5 bg-gradient-to-r from-orange-500/80 to-amber-500/80 hover:from-orange-500 hover:to-amber-500 text-white rounded-full text-xs font-bold items-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] border border-white/20 active:scale-95'
    : 'inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-400/25 bg-orange-500/10 px-6 py-3.5 text-sm font-bold text-orange-200 transition hover:bg-orange-500 hover:text-white';

  const modal = typeof document === 'undefined' ? null : createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-orange-400/25 bg-[#0a0807] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">Extensão Looply Shopee</p>
                <h2 className="mt-2 text-2xl font-display font-black text-white">Instalar no Chrome</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Baixe o arquivo da extensão e carregue a pasta extraída no modo desenvolvedor do Chrome.</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <InstallStep icon={Download} title="1. Baixe" text="Clique no botão abaixo para baixar o ZIP da extensão." />
                <InstallStep icon={FolderOpen} title="2. Extraia" text="Extraia o ZIP em uma pasta fácil de encontrar." />
                <InstallStep icon={Puzzle} title="3. Carregue" text="No Chrome, use Carregar sem compactação." />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Settings2 className="h-4 w-4 text-orange-300" />
                  Passo a passo no Chrome
                </div>
                <ol className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
                  <li>1. Abra <span className="font-mono text-orange-200">chrome://extensions</span>.</li>
                  <li>2. Ative o <strong className="text-white">Modo do desenvolvedor</strong> no canto superior direito.</li>
                  <li>3. Clique em <strong className="text-white">Carregar sem compactação</strong>.</li>
                  <li>4. Selecione a pasta que você extraiu do arquivo baixado.</li>
                  <li>5. Fixe a extensão na barra do Chrome para usar durante as lives.</li>
                </ol>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-slate-500">Arquivo: looply-shopee-rtmp-extension-v1.6.2.zip</p>
                <a
                  href={EXTENSION_DOWNLOAD_URL}
                  download="looply-shopee-rtmp-extension-v1.6.2.zip"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Baixar extensão
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(true);
        }}
        className={buttonClass}
      >
        <Download className={variant === 'header' ? 'w-3.5 h-3.5' : 'h-4 w-4'} />
        <span>Baixar extensão</span>
      </button>
      {modal}
    </>
  );
}

function InstallStep({ icon: Icon, title, text }: { icon: typeof Download; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-sm font-black text-white">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{text}</p>
    </div>
  );
}
