import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseModules from './components/CourseModules';
import WhyJoin from './components/WhyJoin';
import Reviews from './components/Reviews';
import Certificate from './components/Certificate';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import VideoSection from './components/VideoSection';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('discovery');

  // Trigger scroll reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => {
        revealObserver.observe(el);
      });

      return () => revealObserver.disconnect();
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }
  }, []);

  const handleOpenModal = (tier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
      {/* WhatsApp Floating Action Button */}
      <a
        className="whatsapp-float bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center btn-primary-shadow"
        href="https://chat.whatsapp.com/ES0QItGUOS1CmuhyLkIFZ7"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        rel="noopener noreferrer"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path>
          <path d="M12.094 2c-5.468 0-9.911 4.443-9.911 9.911 0 1.758.462 3.413 1.271 4.852l-1.35 4.931 5.048-1.325c1.408.766 3.012 1.204 4.718 1.204 5.468 0 9.911-4.443 9.911-9.911S17.562 2 12.094 2zm0 18.111c-1.554 0-3.01-.414-4.264-1.136l-.305-.175-3.168.831.846-3.091-.192-.306c-.775-1.232-1.186-2.664-1.186-4.147 0-4.385 3.567-7.951 7.951-7.951s7.951 3.566 7.951 7.951-3.566 7.951-7.951 7.951z"></path>
        </svg>
      </a>

      <Navbar onOpenModal={handleOpenModal} />

      <main>
        <Hero onOpenModal={handleOpenModal} />
        <CourseModules onOpenModal={handleOpenModal} />
        <WhyJoin />
        <VideoSection />
        <Reviews />
        <Certificate />
        <FAQ />
      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedTier={selectedTier}
      />
    </div>
  );
}
