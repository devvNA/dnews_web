"use client";

import { getArticleSlug, type GNewsArticle } from "@/lib/gnews";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  featured?: GNewsArticle | null;
}

export function Hero({ featured }: HeroProps) {
  const readNowHref = featured ? `/news/${getArticleSlug(featured)}` : "#berita-terkini";

  return (
    <section className="relative bg-paper-white border-b-[3px] border-harsh-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Giant Typography */}
          <div className="space-y-6">
            <div className="inline-block bg-hot-pink text-white px-4 py-1 text-sm font-bold uppercase rotate-[-2deg] brutal-shadow border-[3px] border-hot-pink font-sans">
              EKSKLUSIF
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tighter word-break-brutal text-balance">
              NO FILTER, JUST FACTS.
            </h1>

            <p className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight bg-neon-yellow inline-block px-2 rotate-[1deg] text-harsh-black border-[3px] border-harsh-black">
              BONGKAR HABIS KASUS HARI INI!
            </p>

            <p className="text-lg md:text-xl text-harsh-black max-w-lg leading-relaxed font-sans">
              D{"'"}News membawa kebenaran tanpa basa-basi. Baca liputan
              eksklusif kami tentang isu-isu yang media mainstream tidak berani
              sentuh.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={readNowHref}
                className="bg-harsh-black text-paper-white px-8 py-4 font-bold uppercase text-base rounded-full brutal-shadow brutal-shadow-hover brutal-shadow-active border-[3px] border-harsh-black flex items-center gap-2 group hover:bg-hot-pink hover:text-white transition-all duration-[100ms] font-sans"
              >
                BACA SEKARANG
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-[100ms]" />
              </Link>
              <a
                href="#kirim-berita"
                className="bg-transparent text-harsh-black px-8 py-4 font-bold uppercase text-base rounded-full border-[3px] border-harsh-black hover:bg-neon-yellow transition-colors duration-[100ms] font-sans"
              >
                KIRIM BERITA
              </a>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-[80%] h-[70%] bg-electric-blue border-[3px] border-harsh-black brutal-shadow overflow-hidden">
              {featured?.image ? (
                <>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-harsh-black/15" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl md:text-8xl text-white uppercase rotate-[-5deg]">
                      2026
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Overlay Sticker 1 */}
            <div className="absolute bottom-20 left-0 bg-neon-yellow border-[3px] border-harsh-black brutal-shadow px-4 py-2 rotate-[6deg] z-10 font-sans">
              <span className="text-2xl">👁️</span>
              <span className="font-bold uppercase text-sm ml-2">AWAS!</span>
            </div>

            {/* Overlay Sticker 2 */}
            <div className="absolute top-10 left-10 bg-hot-pink text-white border-[3px] border-harsh-black brutal-shadow px-4 py-2 rotate-[-8deg] z-10 font-sans">
              <span className="text-xl">🔥</span>
              <span className="font-bold uppercase text-sm ml-2">HOT!</span>
            </div>

            {/* Bottom Card */}
            <div className="absolute bottom-0 right-10 w-[60%] bg-paper-white border-[3px] border-harsh-black brutal-shadow p-4 rotate-[3deg] z-10">
              <p className="text-xs uppercase font-bold text-hot-pink mb-1 font-sans">
                TRENDING
              </p>
              <p className="font-bold text-harsh-black text-sm leading-tight font-sans">
                {featured?.title ??
                  "KORUPSI TRILIUNAN: SIAPA DALANG DI BALIK LAYAR?"}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2">
              <div className="w-16 h-16 bg-neon-yellow border-[3px] border-harsh-black rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
