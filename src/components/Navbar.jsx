import React, { useState } from 'react';

export default function Navbar({ onOpenModal }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform duration-300">
          <a href="#" className="flex items-center gap-3 h-full">
            <div className="h-12 w-12 overflow-hidden rounded-full flex items-center justify-center border-none">
              <img alt="Lemon Academia Logo" className="h-[120%] w-[120%] max-w-none object-cover" src="/images/logo.png" />
            </div>
            <span className="font-display-lg text-headline-md text-primary">Lemon Academia</span>
          </a>
        </div>
        <div className="hidden md:flex gap-gutter items-center">
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#course">Course</a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#reviews">Reviews</a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#faq">FAQ</a>
          <button onClick={() => onOpenModal('discovery')} className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-md text-label-md hover:scale-105 transition-all active:scale-95 btn-primary-shadow">
            Join Now
          </button>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="md:hidden text-primary" 
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">{isMobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-surface border-b border-outline-variant/30 px-margin-mobile py-4 space-y-4">
          <a onClick={() => setIsMobileOpen(false)} className="block font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#course">Course</a>
          <a onClick={() => setIsMobileOpen(false)} className="block font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#reviews">Reviews</a>
          <a onClick={() => setIsMobileOpen(false)} className="block font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#faq">FAQ</a>
          <button onClick={() => { setIsMobileOpen(false); onOpenModal('discovery'); }} className="w-full bg-primary-container text-on-primary-container py-3 rounded-full font-label-md text-label-md btn-primary-shadow">
            Join Now
          </button>
        </div>
      )}
    </nav>
  );
}
