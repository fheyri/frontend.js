import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-[#0A192F] text-white' : 'bg-[#E6F7FF] text-[#0A192F]'} min-h-screen flex flex-col transition-colors duration-500 font-sans`}>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`flex items-center justify-between rounded-full ${darkMode ? 'bg-[#0F172A]/90 border border-[#1E3A8A]/30' : 'bg-white/90 border border-[#BFDBFE]'} backdrop-blur-lg shadow-lg ${scrolled ? 'px-6 py-2' : 'px-8 py-3'} transition-all duration-300`}>
            <Link href="/" className="group relative">
              <span className={`text-xl font-bold ${darkMode ? 'text-[#93C5FD]' : 'text-[#1E3A8A]'} font-serif tracking-tighter`}>
                BlueLibrary
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/books" darkMode={darkMode} active={activeTab === 'books'}>
                <span className="mr-2">📚</span> Koleksi
              </NavLink>
              <NavLink href="/books/add" darkMode={darkMode} active={activeTab === 'add'}>
                <span className="mr-2">✍️</span> Tambah Buku
              </NavLink>
              <NavLink href="/about" darkMode={darkMode} active={activeTab === 'about'}>
                <span className="mr-2">ℹ️</span> Tentang
              </NavLink>
              <button
                onClick={toggleDarkMode}
                className={`ml-4 p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-[#1E3A8A] text-yellow-300 hover:bg-[#1E40AF]' : 'bg-[#BFDBFE] text-[#1E3A8A] hover:bg-[#93C5FD]'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Industrial Style Center Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <div className={`max-w-4xl w-full rounded-2xl ${darkMode ? 'bg-[#0F172A] border border-[#1E3A8A]/30' : 'bg-white border border-[#BFDBFE]'} shadow-2xl overflow-hidden transition-all duration-500`}>
          {/* Header Strip */}
          <div className={`p-4 ${darkMode ? 'bg-[#1E293B]' : 'bg-[#E0F2FE]'} border-b ${darkMode ? 'border-[#1E3A8A]/30' : 'border-[#BFDBFE]'}`}>
            <h1 className="text-2xl font-bold text-center tracking-wider">
              <span className={`${darkMode ? 'text-[#60A5FA]' : 'text-[#1E40AF]'}`}>BLUELIBRARY</span> SERVICES
            </h1>
            <p className="text-xs text-center mt-1 opacity-70">
              INDUSTRIAL KNOWLEDGE MANAGEMENT SYSTEM
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#BFDBFE]/30">
            {/* Left Panel */}
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className={`w-32 h-32 rounded-full ${darkMode ? 'bg-[#1E293B]' : 'bg-[#E0F2FE]'} flex items-center justify-center mb-4 shadow-inner`}>
                  <span className="text-5xl">📚</span>
                </div>
                <h2 className="text-xl font-bold mb-2">KNOWLEDGE REPOSITORY</h2>
                <p className="text-sm opacity-80 text-center">
                  Comprehensive collection of industrial literature
                </p>
              </div>

              <div className="space-y-4">
                <FeatureItem 
                  darkMode={darkMode} 
                  icon="🔍" 
                  title="Advanced Search" 
                  description="Find exactly what you need with precision filters"
                />
                <FeatureItem 
                  darkMode={darkMode} 
                  icon="🌐" 
                  title="Global Access" 
                  description="Connect to our worldwide network of resources"
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-center">SYSTEM STATUS</h2>
                <div className="space-y-3">
                  <StatusIndicator 
                    darkMode={darkMode} 
                    label="Database" 
                    value="Operational" 
                    isActive={true} 
                  />
                  <StatusIndicator 
                    darkMode={darkMode} 
                    label="API Services" 
                    value="Operational" 
                    isActive={true} 
                  />
                  <StatusIndicator 
                    darkMode={darkMode} 
                    label="Maintenance" 
                    value="Scheduled" 
                    isActive={false} 
                  />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-center">QUICK ACCESS</h2>
                <div className="grid grid-cols-2 gap-3">
                  <QuickLink 
                    darkMode={darkMode} 
                    href="/books" 
                    icon="📖" 
                    label="Browse" 
                  />
                  <QuickLink 
                    darkMode={darkMode} 
                    href="/books/add" 
                    icon="✍️" 
                    label="Contribute" 
                  />
                  <QuickLink 
                    darkMode={darkMode} 
                    href="/about" 
                    icon="ℹ️" 
                    label="About" 
                  />
                  <QuickLink 
                    darkMode={darkMode} 
                    href="/contact" 
                    icon="📧" 
                    label="Contact" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Strip */}
          <div className={`p-3 ${darkMode ? 'bg-[#1E293B]' : 'bg-[#E0F2FE]'} border-t ${darkMode ? 'border-[#1E3A8A]/30' : 'border-[#BFDBFE]'} text-xs text-center`}>
            <p>© {new Date().getFullYear()} BLUELIBRARY INDUSTRIAL SERVICES</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-[#172A45] text-white' : 'bg-[#BFDBFE]/80'} py-5 text-center text-xs`}>
        <p>© {new Date().getFullYear()} BlueLibrary. All rights reserved by fachry XI Sija 2.</p>
      </footer>
    </div>
  );
}

// Component for feature items
function FeatureItem({ darkMode, icon, title, description }) {
  return (
    <div className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-[#1E293B] hover:bg-[#1E3A8A]/30' : 'bg-[#E0F2FE] hover:bg-[#BFDBFE]'} transition-colors duration-300`}>
      <div className={`text-2xl mr-3 ${darkMode ? 'text-[#60A5FA]' : 'text-[#1E40AF]'}`}>{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
}

// Component for status indicators
function StatusIndicator({ darkMode, label, value, isActive }) {
  return (
    <div className="flex justify-between items-center">
      <span className="opacity-80">{label}</span>
      <div className="flex items-center">
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
        <span className={`text-xs font-mono ${isActive ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-yellow-400' : 'text-yellow-600')}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

// Component for quick links
function QuickLink({ darkMode, href, icon, label }) {
  return (
    <Link href={href}>
      <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-[#1E293B] hover:bg-[#1E3A8A]/30' : 'bg-[#E0F2FE] hover:bg-[#BFDBFE]'} transition-colors duration-300 cursor-pointer`}>
        <div className="text-2xl mb-1">{icon}</div>
        <div className="text-xs font-medium">{label}</div>
      </div>
    </Link>
  );
}

// NavLink component
function NavLink({ href, darkMode, active, children }) {
  return (
    <Link href={href}>
      <div className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
        darkMode
          ? active
            ? 'bg-[#1E3A8A] text-white'
            : 'text-[#BFDBFE] hover:bg-[#1E3A8A]/50'
          : active
          ? 'bg-[#1E40AF] text-white'
          : 'text-[#1E40AF] hover:bg-[#BFDBFE]'
      }`}>
        {children}
      </div>
    </Link>
  );
}