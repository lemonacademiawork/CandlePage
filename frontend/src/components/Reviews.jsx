import React from 'react';

const reviews = [
  {
    avatar: 'images/student2.jpg',
    name: 'Radhika',
    comment: 'The botanical embedding module changed everything for my business. My sales on Etsy have tripled since applying the finishing techniques learned here.'
  },
  {
    avatar: 'images/student1.jpg',
    name: 'Shivam',
    comment: 'I never thought I could make candles this professional. The 12-day structure is perfect—easy to follow but deeply detailed where it matters.'
  },
  {
    avatar: 'images/student3.jpg',
    name: 'Shivani',
    comment: "The scent blending section is a masterclass in itself. I've finally found my signature studio fragrance. Highly recommended!"
  },
];

export default function Reviews() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal" id="reviews">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">Student Reviews</h2>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
          <span className="ml-2 font-headline-md text-on-surface">4.9/5 Student Rating</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl relative">
            <span className="absolute top-4 right-8 font-display-lg text-[64px] opacity-10 text-secondary" aria-hidden="true">"</span>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={`/${r.avatar}`}
                alt={`${r.name}'s Avatar`}
                className="w-12 h-12 rounded-full object-cover border border-outline-variant/30"
              />
              <div>
                <h6 className="font-headline-md text-body-lg leading-none">{r.name}</h6>
                <span className="text-xs text-on-surface-variant">{r.role || 'Verified Student'}</span>
              </div>
            </div>
            <p className="italic text-on-surface-variant font-body-md">"{r.comment}"</p>
          </div>
        ))}
        {/* Summary Rating Card */}
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="text-display-lg text-primary font-bold mb-2">4.9/5</div>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
          </div>
          <div className="font-label-md text-on-surface-variant">Based on 1,200+ Reviews</div>
        </div>
      </div>
    </section>
  );
}
