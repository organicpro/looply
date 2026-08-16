import { useState, type FormEvent } from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface LoginViewProps {
  onLogin: (name: string, photo: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [needsAccessCode] = useState(
    () => !localStorage.getItem('looply_access_code')
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanCode = accessCode.trim();

    if (!cleanName || (needsAccessCode && !cleanCode)) return;

    if (needsAccessCode) {
      localStorage.setItem('looply_access_code', cleanCode);
      localStorage.setItem('looply_access_code_validated', 'true');
    }

    onLogin(cleanName, photo);
  };

  return (
    <div className="login-view min-h-screen flex items-center justify-center p-5 sm:p-8 bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="login-card w-full max-w-lg glass-panel rounded-[2rem] p-7 sm:p-9 space-y-6"
      >
        <div className="flex justify-center">
          <Logo size={120} />
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Acesso seguro
          </div>
          <h1 className="text-3xl font-display font-black text-white">
            Bem-vindo ao Looply
          </h1>
          <p className="text-sm text-slate-400">
            Crie seu perfil para acessar a plataforma.
          </p>
        </div>

        {needsAccessCode && (
          <label className="access-code-field block rounded-2xl border border-orange-400/20 bg-orange-400/[0.06] p-4 text-xs font-bold text-slate-200">
            <span className="flex items-center gap-2 text-orange-300">
              <KeyRound className="h-4 w-4" />
              Código de primeiro acesso
            </span>
            <input
              required
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              placeholder="Digite qualquer código"
              autoComplete="one-time-code"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
            />
            <span className="mt-2 block text-[11px] font-medium text-slate-500">
              Qualquer código é aceito. Ele será salvo neste navegador e solicitado somente uma vez.
            </span>
          </label>
        )}

        <label className="block text-xs font-bold text-slate-300">
          Seu nome
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como devemos chamar você?"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </label>

        <label className="block text-xs font-bold text-slate-300">
          Foto de perfil
          <span className="mt-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-500 to-amber-700 text-xl font-black text-white shadow-[0_0_24px_rgba(249,115,22,.24)]">
              {photo ? (
                <img src={photo} alt="Prévia da foto de perfil" className="h-full w-full object-cover" />
              ) : (
                name.charAt(0).toUpperCase() || '?'
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-white">Escolher uma foto</span>
              <span className="mt-1 block text-[11px] font-medium text-slate-500">PNG ou JPG do seu dispositivo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setPhoto(String(reader.result));
                  reader.readAsDataURL(file);
                }}
                className="mt-2 block w-full text-[11px] text-slate-400"
              />
            </span>
          </span>
        </label>

        <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-700 py-4 font-black text-white">
          Entrar na plataforma
        </button>
      </form>
    </div>
  );
}
