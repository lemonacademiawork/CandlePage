import React from 'react';

const benefits = [
  {
    icon: 'video_chat',
    title: 'Live Practical Session',
  },
  {
    icon: 'verified',
    title: 'Verified Certificate',
  },
  {
    icon: 'history',
    title: 'Lifetime Recording Access',
  },
  {
    icon: 'groups',
    title: 'Community Support',
  },
  {
    icon: 'business_center',
    title: 'Business Guidance',
  }
];

export default function WhyJoin() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal">
      <div className="text-center mb-8">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">Why Join This Course?</h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {benefits.map((b, i) => (
          <div
            key={i}
            className={`flex items-start gap-6 pb-6 ${i < benefits.length - 1 ? 'border-b border-outline-variant/20' : ''}`}
          >
            <span className="material-symbols-outlined text-primary text-headline-md mt-1">{b.icon}</span>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">{b.title}</h3>
              <p className="text-body-md text-on-surface-variant">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
