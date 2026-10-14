import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinancialProvider } from './context/FinancialContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TransaksiPage } from './pages/TransaksiPage';
import { WalletPage } from './pages/WalletPage';
import { AnggaranPage } from './pages/AnggaranPage';
import { KategoriPage } from './pages/KategoriPage';
import { LaporanPage } from './pages/LaporanPage';
import { PanduanPage } from './pages/PanduanPage';
import { PlannerPage } from './pages/PlannerPage';

import { PengaturanPage } from './pages/PengaturanPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen bg-[#FFF9E9] flex items-center justify-center font-bangers text-3xl">MEMUAT...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <FinancialProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="transaksi" element={<TransaksiPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="anggaran" element={<AnggaranPage />} />
            <Route path="kategori" element={<KategoriPage />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="laporan" element={<LaporanPage />} />
            <Route path="panduan" element={<PanduanPage />} />
            <Route path="pengaturan" element={<PengaturanPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FinancialProvider>
  </AuthProvider>
  );
};

export default App;
