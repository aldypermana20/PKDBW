import React, { useState, useEffect } from 'react';
import { Settings, Database, User, LogOut, CheckCircle2, Edit3, Save, X, Quote, Lock, Trash2, RefreshCw, Bell, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const COMIC_AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=FinTrack1&backgroundColor=FFD83D',
  'https://api.dicebear.com/7.x/bottts/svg?seed=FinTrack2&backgroundColor=4ADE80',
  'https://api.dicebear.com/7.x/bottts/svg?seed=FinTrack3&backgroundColor=3478F6',
  'https://api.dicebear.com/7.x/bottts/svg?seed=FinTrack4&backgroundColor=FF4545',
  'https://api.dicebear.com/7.x/bottts/svg?seed=FinTrack5&backgroundColor=A855F7',
];

export const PengaturanPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Profile
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(COMIC_AVATARS[0]);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setBio(user.user_metadata.bio || '');
      setAvatarUrl(user.user_metadata.avatar_url || COMIC_AVATARS[0]);
      setDailyReminder(user.user_metadata.daily_reminder || false);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          bio: bio,
          avatar_url: avatarUrl
        }
      });
      if (error) throw error;
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan profil!');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDailyReminder = async () => {
    const newValue = !dailyReminder;
    setDailyReminder(newValue);
    try {
      await supabase.auth.updateUser({
        data: { daily_reminder: newValue }
      });
    } catch (err) {
      console.error(err);
      setDailyReminder(!newValue);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }
    setLoadingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert('Password berhasil diubah!');
      setNewPassword('');
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah password');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleResetData = async () => {
    if (window.confirm('PERINGATAN! Semua data transaksi akan dihapus. Saldo dompet dan anggaran akan di-reset ke 0. Lanjutkan?')) {
      try {
        if (!user) return;
        await supabase.from('transactions').delete().eq('user_id', user.id);
        
        const { data: wallets } = await supabase.from('wallets').select('id').eq('user_id', user.id);
        if (wallets && wallets.length > 0) {
          for (const wallet of wallets) {
            await supabase.from('wallets').update({ balance: 0 }).eq('id', wallet.id);
          }
        }

        const { data: budgets } = await supabase.from('budgets').select('id').eq('user_id', user.id);
        if (budgets && budgets.length > 0) {
          for (const budget of budgets) {
            await supabase.from('budgets').update({ current_spent: 0 }).eq('id', budget.id);
          }
        }

        alert('Data transaksi berhasil di-reset!');
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert('Gagal mereset data!');
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('PERINGATAN SANGAT FATAL! Apakah kamu yakin ingin MENGHAPUS AKUN ini secara permanen? Semua data tidak bisa dikembalikan.')) {
      try {
        if (user) {
          await supabase.from('transactions').delete().eq('user_id', user.id);
          await supabase.from('wallets').delete().eq('user_id', user.id);
          await supabase.from('budgets').delete().eq('user_id', user.id);
          await supabase.from('categories').delete().eq('user_id', user.id);
          // Optional cleanup rpc if exist
          await supabase.rpc('delete_user');
        }
        await signOut();
        alert('Akun telah dihapus.');
      } catch (err) {
        console.error(err);
        alert('Hubungi Admin untuk menghapus akun secara utuh dari sistem.');
        await signOut();
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300 relative pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">PROFIL SAYA</h1>
          <p className="text-sm font-bold text-[#777777]">Informasi akun dan status koneksi server.</p>
        </div>
      </div>

      {/* Profil Pengguna */}
      <div className="comic-panel p-0 bg-white overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-[#FFD83D] border-b-4 border-[#171717] relative comic-pattern"></div>

        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-start">
            <div className="-mt-16 relative">
              <div className="w-32 h-32 bg-white border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center justify-center rounded-xl overflow-hidden">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="mt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="comic-button px-4 py-2 bg-white flex items-center gap-2 text-sm"
                >
                  <Edit3 className="w-4 h-4" /> EDIT PROFIL
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="comic-button px-4 py-2 bg-[#FFF9E9] flex items-center gap-2 text-sm"
                  >
                    <X className="w-4 h-4" /> BATAL
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="comic-button px-4 py-2 bg-[#4ADE80] flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> {loading ? 'MENYIMPAN...' : 'SIMPAN'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-4xl font-bangers text-[#171717] tracking-wider uppercase mb-1">
                    {fullName || 'Pahlawan Finansial'}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80] border-2 border-[#171717] text-xs font-black uppercase shadow-[2px_2px_0px_0px_#171717]">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> {user?.email}
                  </div>
                </div>

                <div className="relative p-4 bg-[#FFF9E9] border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717] inline-block mt-4 max-w-lg">
                  <Quote className="w-6 h-6 text-[#171717]/20 absolute -top-3 -left-3 bg-[#FFF9E9]" />
                  <p className="font-space-grotesk font-bold text-[#171717] italic text-lg">
                    "{bio || 'Setiap sen yang dicatat adalah langkah menuju kebebasan finansial!'}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 mt-4 p-6 bg-[#FFF9E9] border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717]">

                <div>
                  <label className="block font-bangers text-xl mb-2">Pilih Avatar Robotmu!</label>
                  <div className="flex flex-wrap gap-4">
                    {COMIC_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAvatarUrl(url)}
                        className={`w-16 h-16 border-4 rounded-xl overflow-hidden transition-all ${avatarUrl === url
                          ? 'border-[#3478F6] shadow-[4px_4px_0px_0px_#3478F6] -translate-y-2'
                          : 'border-[#171717] hover:-translate-y-1'
                          }`}
                      >
                        <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover bg-white" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bangers text-xl mb-2">Nama Alias / Panggilan</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 border-4 border-[#171717] bg-white font-space-grotesk font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD83D]/50"
                    placeholder="Contoh: Sang Penguasa Dompet"
                  />
                </div>

                <div>
                  <label className="block font-bangers text-xl mb-2">Kata-kata Mutiara (Bio)</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full p-3 border-4 border-[#171717] bg-white font-space-grotesk font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD83D]/50 resize-none"
                    placeholder="Tuliskan motto finansialmu di sini..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pengaturan Notifikasi */}
      <div className="comic-panel p-6 bg-white space-y-4">
        <div className="flex items-center gap-4 border-b-4 border-[#171717] pb-4">
          <div className="w-12 h-12 bg-[#FFD83D] border-3 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-[#171717] transform -rotate-3">
            <Bell className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bangers text-2xl tracking-wide">Notifikasi Harian</h3>
            <p className="text-sm font-bold text-[#777777]">Ingatkan jika hari ini belum mencatat transaksi.</p>
          </div>
        </div>
        <div className="pt-2 flex items-center justify-between">
          <span className="font-space-grotesk font-bold">Aktifkan Pengingat</span>
          <button 
            onClick={handleToggleDailyReminder}
            className={`w-14 h-8 rounded-full border-4 border-[#171717] relative transition-colors ${dailyReminder ? 'bg-[#4ADE80]' : 'bg-[#D4D4D8]'}`}
          >
            <div className={`w-5 h-5 bg-white border-2 border-[#171717] rounded-full absolute top-0.5 transition-transform ${dailyReminder ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Keamanan Akun */}
      <div className="comic-panel p-6 bg-white space-y-4">
        <div className="flex items-center gap-4 border-b-4 border-[#171717] pb-4">
          <div className="w-12 h-12 bg-[#A855F7] border-3 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-white transform rotate-3">
            <Lock className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bangers text-2xl tracking-wide">Keamanan Akun</h3>
            <p className="text-sm font-bold text-[#777777]">Ganti kata sandi atau atur keamanan.</p>
          </div>
        </div>
        <div className="space-y-4 pt-2">
          <div>
            <label className="block font-bold mb-2">Ubah Kata Sandi</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Kata Sandi Baru" 
                className="flex-1 p-3 border-4 border-[#171717] bg-white font-space-grotesk font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD83D]/50"
              />
              <button 
                onClick={handleChangePassword}
                disabled={loadingPassword}
                className="comic-button px-4 py-2 bg-[#4ADE80] flex items-center justify-center gap-2 text-sm disabled:opacity-50 min-w-[120px]"
              >
                {loadingPassword ? 'PROSES...' : 'SIMPAN'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manajemen Data (Zona Bahaya) */}
      <div className="comic-panel p-6 bg-[#FFF9E9] border-4 border-[#FF4545] shadow-[6px_6px_0px_0px_#FF4545] space-y-4">
        <div className="flex items-center gap-4 border-b-4 border-[#171717] pb-4">
          <div className="w-12 h-12 bg-[#FF4545] border-3 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-white transform -rotate-3">
            <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bangers text-2xl tracking-wide text-[#FF4545]">Zona Bahaya (Danger Zone)</h3>
            <p className="text-sm font-bold text-[#777777]">Tindakan di sini tidak dapat dibatalkan!</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button 
            onClick={handleResetData}
            className="comic-button flex-1 py-3 bg-white text-[#171717] border-[#171717] hover:bg-[#FFD83D] flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            RESET TRANSAKSI
          </button>
          <button 
            onClick={handleDeleteAccount}
            className="comic-button flex-1 py-3 bg-[#FF4545] text-white border-[#171717] hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            HAPUS AKUN
          </button>
        </div>
      </div>

      {/* Logout Action */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => signOut()}
          className="comic-button px-6 py-3 bg-[#FF4545] text-white font-bangers text-xl flex items-center gap-3 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_#171717] transition-all"
        >
          <LogOut className="w-5 h-5" strokeWidth={2.5} />
          KELUAR (LOGOUT)
        </button>
      </div>

    </div>
  );
};
