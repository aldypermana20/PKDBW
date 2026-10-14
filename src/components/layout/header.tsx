import React, { useState } from 'react';
import { Menu, Plus, User, DollarSign, Wallet, Check, LogOut } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar, onOpenAddModal }) => {
  const { summary, formatCurrency } = useFinancial();
  const { signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#FFF9E9] border-b-4 border-[#171717] px-4 sm:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-[#171717] bg-white border-2 border-[#171717] hover:bg-[#FFD83D] hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_#171717] lg:hidden transition-all"
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717]">
          <Wallet className="w-5 h-5 text-[#3478F6]" strokeWidth={2.5} />
          <span className="text-xs text-[#777777] font-bold uppercase tracking-wider">Total Saldo:</span>
          <span className="text-sm font-numbers font-bold text-[#171717]">
            {formatCurrency(summary.totalBalance)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">


        {/* Quick Add Transaction Button */}
        <button
          onClick={onOpenAddModal}
          className="comic-button comic-button-primary flex items-center gap-2 px-5 py-2.5 shadow-[4px_4px_0px_0px_#171717]"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          <span className="hidden xs:inline tracking-wider">Catat</span>
        </button>

        {/* User Profile Badge & Logout */}
        <div className="flex items-center pl-4 border-l-4 border-[#171717] relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-[#FFD83D] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center justify-center transform hover:rotate-6 hover:-translate-y-0.5 transition-all"
          >
            <User className="w-5 h-5 text-[#171717]" strokeWidth={2.5} />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  // handle navigation to profile if we build a profile page later
                  window.location.href = '/pengaturan';
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bangers tracking-wider text-[#171717] hover:bg-[#FFD83D] transition-colors border-b-2 border-[#171717]/10"
              >
                <User className="w-5 h-5" strokeWidth={2.5} />
                <span>PROFIL SAYA</span>
              </button>
              <button
                onClick={async () => {
                  setShowUserMenu(false);
                  await signOut();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bangers tracking-wider text-[#FF4545] hover:bg-[#FFD83D] hover:text-[#171717] transition-colors"
              >
                <LogOut className="w-5 h-5" strokeWidth={2.5} />
                <span>KELUAR (LOGOUT)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
