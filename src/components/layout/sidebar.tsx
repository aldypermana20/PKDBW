import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  PieChart,
  FolderKanban,
  FileSpreadsheet,
  Settings,
  CalendarDays,
  ChevronRight,
  ShieldCheck,
  X,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Transaksi', path: '/transaksi', icon: ReceiptText },
    { label: 'Wallet & Dompet', path: '/wallet', icon: Wallet },
    { label: 'Anggaran', path: '/anggaran', icon: PieChart },
    { label: 'Kategori', path: '/kategori', icon: FolderKanban },
    { label: 'Planner', path: '/planner', icon: CalendarDays },
    { label: 'Laporan & Ekspor', path: '/laporan', icon: FileSpreadsheet },
    { label: 'Buku Panduan', path: '/panduan', icon: HelpCircle },
    { label: 'Pengaturan', path: '/pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#171717]/80 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#FFF9E9] border-r-4 border-[#171717] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b-4 border-[#171717] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD83D] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center transform -rotate-3">
              <Sparkles className="w-6 h-6 text-[#171717] fill-current" />
            </div>
            <div>
              <h1 className="font-comic text-2xl tracking-wide text-[#171717] flex items-center gap-2 uppercase leading-none mt-1">
                FinTrack <span className="text-xs px-2 py-0.5 bg-[#EF4444] text-white border-2 border-[#171717] font-sans font-bold shadow-[2px_2px_0px_0px_#171717] transform rotate-3">PRO</span>
              </h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-[#171717] border-2 border-transparent hover:border-[#171717] hover:bg-[#FFD83D] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <div className="px-3 mb-4 text-sm font-bold uppercase tracking-widest text-[#171717] border-b-2 border-[#171717] inline-block pb-1">
            Menu Utama
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }: { isActive: boolean }) =>
                `group relative flex items-center justify-between px-4 py-3 font-bold text-sm transition-all duration-150 border-2 ${
                  isActive
                    ? 'bg-[#FFD83D] text-[#171717] border-[#171717] shadow-[4px_4px_0px_0px_#171717] -translate-y-1'
                    : 'bg-transparent text-[#171717] border-transparent hover:border-[#171717] hover:bg-white hover:shadow-[2px_2px_0px_0px_#171717]'
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="uppercase tracking-wide">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-5 h-5" strokeWidth={3} />}
                </>
              )}
            </NavLink>
          ))}
        </div>

      </aside>
    </>
  );
};
