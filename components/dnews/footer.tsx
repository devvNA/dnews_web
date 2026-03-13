"use client"

import { Send } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer id="kirim-berita" className="bg-harsh-black text-paper-white">
      {/* CTA Section */}
      <div className="border-b-[3px] border-paper-white/20 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Giant Text */}
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter mb-8">
            STAY AWAKE.
            <br />
            <span className="text-neon-yellow">SUBSCRIBE TO</span>
            <br />
            D{"'"}NEWS.
          </h2>
          
          {/* Mascot Hint */}
          <div className="relative inline-block mb-8">
            <div className="bg-neon-yellow text-harsh-black px-6 py-3 font-bold uppercase text-sm border-[3px] border-paper-white rotate-[-2deg] font-sans">
              <span className="text-xl mr-2">🦉</span>
              JANGAN TIDUR, TETAP KRITIS!
            </div>
          </div>
          
          {/* Email Subscribe */}
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="w-full bg-paper-white text-harsh-black px-6 py-4 font-bold uppercase text-sm border-[3px] border-paper-white focus:outline-none focus:border-neon-yellow placeholder:text-harsh-black/50 font-sans transition-border duration-[100ms]"
                />
              </div>
              <button className="bg-hot-pink text-white px-8 py-4 font-bold uppercase text-sm border-[3px] border-hot-pink brutal-shadow brutal-shadow-hover brutal-shadow-active flex items-center justify-center gap-2 hover:bg-neon-yellow hover:text-harsh-black hover:border-neon-yellow transition-all duration-[100ms] font-sans">
                <Send className="w-5 h-5" />
                KIRIMKAN
              </button>
            </div>
            <p className="text-xs text-paper-white/60 mt-4 uppercase font-sans">
              Kami tidak spam. Cuma berita penting dan opini tajam.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-bold tracking-tighter uppercase">
              D{"'"}NEWS
            </span>
            <span className="text-paper-white/40">|</span>
            <span className="text-sm text-paper-white/60 font-sans">PORTAL BERITA ANTI-MAINSTREAM</span>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm uppercase font-bold font-sans">
            <a href="#" className="hover:text-neon-yellow transition-colors duration-[100ms]">Tentang</a>
            <a href="#" className="hover:text-neon-yellow transition-colors duration-[100ms]">Kontak</a>
            <a href="#" className="hover:text-neon-yellow transition-colors duration-[100ms]">Redaksi</a>
            <a href="#" className="hover:text-neon-yellow transition-colors duration-[100ms]">Karir</a>
          </nav>
          
          {/* Copyright */}
          <p className="text-xs text-paper-white/40 uppercase font-sans">
            COPYRIGHT, 2026 BY D{"'"}NEWS MEDIA. DON{"'"}T SUE US.
          </p>
        </div>
      </div>
    </footer>
  )
}
