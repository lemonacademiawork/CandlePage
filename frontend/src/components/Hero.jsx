import React from 'react';

export default function Hero({ onOpenModal }) {
  return (
    <section className="relative min-h-[80vh] pt-32 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="Premium candle making workspace" className="w-full h-full object-cover opacity-90" src="/images/hero-bg.jpg" fetchpriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
      </div>
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mb-6">
            Master the Art of <span className="text-primary italic">Premium</span> Candle Making
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
            From creative hobbyist to professional candle artist. Join our 12-day expert-led masterclass and unlock the secrets of luxury wax crafting.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button onClick={() => onOpenModal('discovery')} className="w-full sm:w-auto bg-surface border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md text-[18px] hover:bg-primary-container/10 transition-all active:scale-95 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">calendar_today</span>
              Book a Call
            </button>
            <a href="https://chat.whatsapp.com/ES0QItGUOS1CmuhyLkIFZ7" target="_blank" className="w-full sm:w-auto bg-secondary-container/20 border-2 border-secondary text-secondary px-10 py-4 rounded-full font-label-md text-label-md text-[18px] hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 group">
              <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
