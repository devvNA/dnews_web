"use client";

import type { GNewsArticle } from "@/lib/gnews";
import { CATEGORIES, type CategoryKey } from "@/lib/gnews";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = Object.entries(CATEGORIES).map(([key, val]) => ({
  href: `/?category=${key}`,
  label: val.label,
  key: key as CategoryKey,
}));

const FALLBACK_HEADLINES = [
  "PEJABAT X KEMBALI BERULAH: INI BUKTI BARUNYA!",
  "INFLASI MEROKET: TIPS BERTAHAN HIDUP DARI KAMI",
  "GENERASI Z MAKIN SUSAH BELI RUMAH, SALAH SIAPA?",
];

interface HeaderProps {
  articles?: GNewsArticle[];
  activeCategory?: CategoryKey;
}

export function Header({ articles, activeCategory }: HeaderProps) {
  const tickerHeadlines =
    articles && articles.length > 0
      ? articles.slice(0, 5).map((a) => a.title)
      : FALLBACK_HEADLINES;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper-white border-b-[3px] border-harsh-black">
      {/* Main Nav */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[var(--font-display)] text-3xl md:text-4xl font-bold tracking-tighter text-harsh-black uppercase">
            D{"'"}NEWS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wider transition-colors duration-[100ms] ${
                activeCategory === link.key
                  ? "text-hot-pink"
                  : "text-harsh-black hover:text-hot-pink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Subscribe Button */}
        <div className="hidden md:block">
          <button className="bg-harsh-black text-paper-white px-6 py-2 font-bold uppercase text-sm rounded-full brutal-shadow brutal-shadow-hover brutal-shadow-active border-[3px] border-harsh-black hover:bg-hot-pink hover:text-white transition-all duration-[100ms]">
            SUBSCRIBE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper-white border-t-2 border-harsh-black">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg font-bold uppercase tracking-wider ${
                  activeCategory === link.key
                    ? "text-hot-pink"
                    : "text-harsh-black hover:text-hot-pink"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-harsh-black text-paper-white px-6 py-3 font-bold uppercase text-sm rounded-full border-[3px] border-harsh-black mt-2 brutal-shadow brutal-shadow-hover transition-all duration-[100ms]">
              SUBSCRIBE
            </button>
          </nav>
        </div>
      )}

      {/* Breaking News Ticker */}
      <div className="bg-neon-yellow border-t-2 border-harsh-black overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="text-sm font-bold uppercase text-harsh-black flex items-center gap-2 font-sans">
                <span className="inline-block w-2 h-2 bg-hot-pink rounded-full animate-pulse" />
                BREAKING NEWS
              </span>
              {tickerHeadlines.map((headline, j) => (
                <span key={j} className="contents">
                  <span className="text-sm text-harsh-black">{headline}</span>
                  <span className="text-harsh-black">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
