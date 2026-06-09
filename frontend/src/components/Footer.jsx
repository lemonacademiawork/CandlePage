import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/20 py-16 mt-20">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 overflow-hidden rounded-full flex items-center justify-center border-none">
                <img alt="Lemon Academia Logo" className="h-[120%] w-[120%] max-w-none object-cover" src="/images/logo.png" />
              </div>
              <span className="font-display-lg text-headline-md text-primary">Lemon Academia</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">Handcrafted with passion for the modern artist. Master the art of luxury candle making.</p>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-6">Course</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#course">Curriculum</a></li>
              <li><a className="hover:text-primary transition-colors" href="#course">Pricing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#reviews">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-6">Connect With Us</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="https://www.instagram.com/lemon_academia___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">Instagram</a></li>
              <li><a className="hover:text-primary transition-colors" href="https://www.youtube.com/@Lemonacademia_in">Youtube</a></li>
              <li><a className="hover:text-primary transition-colors" href="https://www.facebook.com/share/18uE5qyVBg/">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">© 2024 Lemon Academia. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-on-surface-variant">
            <a className="hover:text-primary" href="#">Privacy Policy</a>
            <a className="hover:text-primary" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
