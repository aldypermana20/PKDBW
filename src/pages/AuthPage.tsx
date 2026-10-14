import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Jika sudah login, langsung lempar ke dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'Minimal 8 karakter' },
    { regex: /[A-Z]/, text: 'Mengandung huruf besar' },
    { regex: /[0-9]/, text: 'Mengandung angka' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'Mengandung simbol (!@#...)' }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.regex.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Redirect akan otomatis ditangani oleh if (user) di atas karena state user berubah
      } else {
        if (!isPasswordValid) {
          throw new Error('Password belum memenuhi semua syarat keamanan!');
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi (jika diaktifkan), atau langsung login.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E9] flex items-center justify-center p-4 comic-pattern">
      <div className="w-full max-w-md bg-white border-4 border-[#171717] shadow-[12px_12px_0px_0px_#171717] p-8 relative overflow-hidden animate-in fade-in duration-500 zoom-in-95">
        
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD83D] border-4 border-[#171717] rounded-full flex items-center justify-center rotate-12 z-0">
          <span className="font-bangers text-2xl text-[#171717] -rotate-12">POW!</span>
        </div>

        <div className="relative z-10">
          <h1 className="font-bangers text-4xl mb-2 text-[#171717] tracking-wider uppercase">
            {isLogin ? 'Masuk Dulu, Bos!' : 'Daftar Member Baru!'}
          </h1>
          <p className="font-space-grotesk font-bold text-[#171717]/70 mb-8 border-b-2 border-dashed border-[#171717]/20 pb-4">
            {isLogin ? 'Siap mencatat keuangan hari ini?' : 'Mulai perjalanan finansialmu dari sini.'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-[#FF4545] border-4 border-[#171717] flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-white shrink-0 mt-0.5" />
              <p className="font-space-grotesk font-bold text-white text-sm">{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-[#4ADE80] border-4 border-[#171717] flex items-start gap-3">
              <p className="font-space-grotesk font-bold text-[#171717] text-sm">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bangers text-xl mb-2 tracking-wide">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-4 border-[#171717] bg-white font-space-grotesk font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD83D]/50 focus:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_#171717]"
                placeholder="email@contoh.com"
              />
            </div>
            
            <div>
              <label className="block font-bangers text-xl mb-2 tracking-wide">Kata Sandi (Password)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-14 border-4 border-[#171717] bg-white font-space-grotesk font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD83D]/50 focus:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_#171717]"
                  placeholder={isLogin ? "Masukkan sandi" : "Minimal 8 karakter"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#171717] hover:text-[#6366f1] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" strokeWidth={2.5} /> : <Eye className="w-6 h-6" strokeWidth={2.5} />}
                </button>
              </div>

              {!isLogin && (
                <div className="mt-4 space-y-2 p-4 bg-white border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717]">
                  <p className="font-bangers text-lg mb-2">Syarat Keamanan Password:</p>
                  {passwordRequirements.map((req, idx) => {
                    const isValid = req.regex.test(password);
                    return (
                      <div key={idx} className={`flex items-center gap-2 font-space-grotesk font-bold text-sm ${isValid ? 'text-[#35A66F]' : 'text-[#777777]'}`}>
                        {isValid ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <Circle className="w-4 h-4" strokeWidth={3} />}
                        <span className={isValid ? 'line-through decoration-2' : ''}>{req.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 border-4 border-[#171717] ${
                isLogin ? 'bg-[#FFD83D]' : 'bg-[#4ADE80]'
              } font-bangers text-2xl tracking-widest uppercase hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#171717] active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              {loading ? 'Tunggu Sebentar...' : (isLogin ? 'LOGIN SEKARANG' : 'DAFTAR SEKARANG')}
            </button>
          </form>

          <div className="mt-8 text-center border-t-4 border-[#171717] pt-6 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 font-bangers text-xl">ATAU</div>
            <p className="font-space-grotesk font-bold">
              {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-[#6366f1] underline decoration-4 underline-offset-4 hover:text-[#4f46e5] transition-colors"
              >
                {isLogin ? 'Daftar di sini!' : 'Login dong!'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
