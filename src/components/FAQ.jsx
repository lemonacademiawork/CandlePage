import React, { useState } from 'react';

const faqs = [
  {
    q: 'Do I need prior experience?',
    a: 'Absolutely not. Our masterclass is designed to take you from the very basics (Phase 1) all the way to advanced techniques (Phase 2 & 3).'
  },
  {
    q: 'What materials are required?',
    a: "You'll need wax, wicks, fragrance oils, and some basic kitchen tools. We provide a comprehensive list of recommended kits and suppliers within the first module."
  },
  {
    q: 'How long do I have access?',
    a: 'Once you enroll, you have lifetime access to the curriculum, including any future updates and community discussions.'
  },
  {
    q: 'Is there a certification?',
    a: 'Yes! Upon completing the 12-day curriculum and submitting your final project, you will receive a digital Lemon Academia Certificate.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto bg-surface-container-low/30 rounded-3xl reveal" id="faq">
      <h2 className="font-display-lg text-display-lg-mobile md:text-headline-lg text-on-surface text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4 px-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
              <button 
                onClick={() => toggle(idx)} 
                className="w-full p-6 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="font-label-md text-body-lg text-on-surface group-hover:text-primary transition-colors">{faq.q}</span>
                <span 
                  className="material-symbols-outlined text-primary transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              <div 
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{ 
                  maxHeight: isOpen ? '200px' : '0px', 
                  opacity: isOpen ? 1 : 0 
                }}
              >
                <p className="px-6 pb-6 text-on-surface-variant font-body-md leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
