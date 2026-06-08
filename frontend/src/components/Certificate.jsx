import React from 'react';

export default function Certificate() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">Get Certified</h2>
      </div>
      <div className="flex justify-center">
        <div className="glass-card p-4 md:p-8 rounded-3xl max-w-4xl w-full">
          <img alt="Lemon Academia Certificate of Completion" className="w-full h-auto rounded-xl shadow-lg object-contain" src="images/certificate.jpg" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
