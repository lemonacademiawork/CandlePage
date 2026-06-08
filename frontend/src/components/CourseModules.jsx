import React from 'react';

export default function CourseModules({ onOpenModal }) {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal" id="course">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

        {/* Basic Course Card */}
        <div className="glass-card p-8 rounded-3xl border-2 border-transparent hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm">
              <img src="/images/basic.jpg" alt="Basic Course Showcase" className="w-full h-auto" />
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[20px] mt-1">arrow_forward</span>
                <span className="text-body-md text-on-surface-variant">Day 1: Essentials &amp; Safety (Wax, wicks, molds, and fundamental tools)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[20px] mt-1">arrow_forward</span>
                <span className="text-body-md text-on-surface-variant">Day 2: Romantic Rose Designs (Heart Rose candle, color layering, and fragrance)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[20px] mt-1">arrow_forward</span>
                <span className="text-body-md text-on-surface-variant">Day 3: Marble Swirl Art (Sculpted jar candles, marble effects, and advanced pouring)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[20px] mt-1">arrow_forward</span>
                <span className="text-body-md text-on-surface-variant">Day 4: Celestial Sculptures (Sun Moon designs and advanced decorative techniques)</span>
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-headline-md text-primary font-bold text-3xl">₹299</span>
              <span className="text-body-md text-on-surface-variant line-through opacity-60">₹499</span>
            </div>
            <button onClick={() => onOpenModal('basic')} className="w-full bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-105 transition-all active:scale-95 btn-primary-shadow">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Advanced Course Card */}
        <div className="glass-card p-8 rounded-3xl border-2 border-primary-container relative flex flex-col justify-between">
          <div className="absolute -top-4 left-8 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold shadow-sm">
            FULL JOURNEY
          </div>
          <div>
            <div className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm">
              <img src="/images/complete.jpg" alt="Advanced Course Showcase" className="w-full h-auto" />
            </div>
            <h3 className="font-display-lg text-headline-md mb-2">Complete Candle Making Course (12 Days)</h3>
            <p className="text-secondary font-label-md uppercase tracking-wider text-xs">(BASIC INCLUDED)</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">rocket_launch</span>
                <h4 className="font-headline-md text-body-lg font-bold">Advanced Level (4 Days)</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 1: Water Candle — unique transparent look, gel wax, and embedding objects.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 2: Lavender Latte Candle — coffee-inspired colors, scent blending, and latte art on candles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 3: Intricate Miniature Candle — small size candles, complex molds, and packaging tips.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 4: Bouquet Candle Making — floral arrangements in candles, multi-candle bouquets, and presentation ideas.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">palette</span>
                <h4 className="font-headline-md text-body-lg font-bold">Whipping &amp; Terrazzo Level (4 Days)</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 1: Botanical Candle — dried flowers, natural elements, and eco-friendly wax.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 2: Whipping Candle — fluffy, whipped cream look, frosting techniques, and fun textures.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 3: Concrete and Terrazzo Candle — concrete base with candle, terrazzo effect, and industrial chic style.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">star</span>
                  <span className="text-body-md text-on-surface-variant">Day 4: Business Guidance — costing, pricing strategies, marketing tips, online sales platforms, and branding.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-headline-md text-primary font-bold text-3xl">₹1298</span>
              <span className="text-body-md text-on-surface-variant line-through opacity-60">₹1998</span>
            </div>
            <button onClick={() => onOpenModal('advanced')} className="w-full bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-105 transition-all active:scale-95 btn-primary-shadow">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
