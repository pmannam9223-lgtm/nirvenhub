import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Leaf, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary pt-32 pb-16 text-white relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-20" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 mb-24">
          {/* Brand & Social (lg:span-4) */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-3 group/logo">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full overflow-hidden flex items-center justify-center backdrop-blur-md border border-white/20 group-hover/logo:bg-white group-hover/logo:scale-105 transition-all duration-700">
                <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl md:text-3xl font-black tracking-tighter shadow-sm text-white">NIRVEN HUB</span>
            </Link>

            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm italic">
              "Honoring the earth, one harvest at a time. We bring the purest organic produce
              from nature's lap to your door."
            </p>

            {/* <div className="flex items-center gap-6 pt-4">
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, label: "Facebook" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, label: "LinkedIn" }
              ].map((social, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:bg-white hover:text-primary hover:translate-y-[-4px] transition-all duration-500 shadow-xl shadow-black/5">
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links (lg:span-2) */}
          {/* <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Exploration</h4>
            <ul className="space-y-6">
              {['Home', 'Fresh Produce', 'Rare Spices', 'Offers', 'About Us'].map(link => (
                <li key={link}>
                  <Link to="/" className="text-white/60 hover:text-white transition-all duration-500 font-bold text-sm tracking-wide flex items-center gap-2 group/link">
                    <span className="w-0 group-hover/link:w-2 h-[2px] bg-secondary transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Assistance (lg:span-3) */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Contact</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group/contact">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5 group-hover/contact:bg-secondary group-hover/contact:text-primary transition-all duration-700">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Global Reach</p>
                  <p className="text-base font-black text-white">+44 77777 88355</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group/contact">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5 group-hover/contact:bg-secondary group-hover/contact:text-primary transition-all duration-700">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Electronic Mail</p>
                  <p className="text-base font-black text-white">info@nirvenhub.co.uk</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group/contact">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5 group-hover/contact:bg-secondary group-hover/contact:text-primary transition-all duration-700">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Base Operations</p>
                  <p className="text-sm font-bold text-white/80 leading-relaxed max-w-[200px]">
                    71 SmoothField Court, Hibernia Road, London
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours (lg:span-3) */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Availability</h4>
            <div className="glass-card bg-white/5 border-white/10 p-8 space-y-6">
              {[
                { day: 'Mon - Fri', time: '9 AM – 8 PM' },
                { day: 'Saturday', time: '9 AM – 7 PM' },
                { day: 'Sunday', time: '9 AM – 6 PM' }
              ].map((slot, i) => (
                <div key={i} className="flex justify-between items-center group/slot">
                  <span className="text-xs font-black uppercase tracking-widest text-white/30 group-hover/slot:text-white transition-colors">{slot.day}</span>
                  <span className="text-sm font-black text-secondary">{slot.time}</span>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5">
                <button className="w-full btn-primary !bg-white !text-primary !py-3 !rounded-[16px] !text-[10px] tracking-widest uppercase hover:scale-105 transition-all">
                  Schedule Collection
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            <p>© 2026 NIRVEN HUB GLOBAL</p>
            <div className="hidden md:block w-1.5 h-1.5 bg-secondary rounded-full" />
            <Link to="/" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Quality</Link>
          </div>

          <div className="flex items-center gap-4 text-white/20">
            <span className="text-[8px] font-black uppercase tracking-[0.8em]">Powered by Nature</span>
            <Leaf size={16} strokeWidth={3} className="text-secondary opacity-40" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
