"use client";

import { Quote } from "lucide-react";
import type { GNewsArticle } from "@/lib/gnews";

interface Opinion {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const FALLBACK_OPINIONS: Opinion[] = [
  {
    id: 1,
    quote:
      "Demokrasi kita sedang diuji. Yang dipertanyakan bukan lagi siapa yang menang pemilu, tapi siapa yang sebenarnya memegang kendali.",
    author: "Dr. Ahmad Fauzi",
    role: "Pengamat Politik",
  },
  {
    id: 2,
    quote:
      "Anak muda tidak apatis. Mereka hanya muak dengan sistem yang terus-menerus mengkhianati mereka.",
    author: "Lisa Andriani",
    role: "Aktivis Mahasiswa",
  },
  {
    id: 3,
    quote:
      "Data tidak berbohong. Tapi mereka yang menyajikan data bisa memilih mana yang ditunjukkan dan mana yang disembunyikan.",
    author: "Reza Kurniawan",
    role: "Data Journalist",
  },
];

function mapToOpinions(articles: GNewsArticle[]): Opinion[] {
  return articles.slice(0, 3).map((a, i) => ({
    id: i + 1,
    quote: a.description ?? a.title,
    author: a.source.name,
    role: "Sumber Berita",
  }));
}

interface OpinionSectionProps {
  articles?: GNewsArticle[];
}

export function OpinionSection({ articles }: OpinionSectionProps) {
  const opinions =
    articles && articles.length > 0
      ? mapToOpinions(articles)
      : FALLBACK_OPINIONS;
  return (
    <section className="bg-electric-blue py-12 md:py-20 px-4 md:px-6 border-y-[3px] border-harsh-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🧠</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white">
              OPINI TAJAM
            </h2>
          </div>
          <div className="bg-neon-yellow text-harsh-black px-4 py-2 font-bold uppercase text-sm border-[3px] border-harsh-black rotate-[2deg] font-sans">
            SUARA YANG BERANI
          </div>
        </div>

        {/* Opinion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opinions.map((opinion, index) => (
            <article
              key={opinion.id}
              className={`
                bg-paper-white border-[3px] border-harsh-black brutal-shadow p-6 md:p-8 transition-all duration-[100ms]
                ${index === 1 ? "md:-rotate-1" : index === 2 ? "md:rotate-1" : ""}
              `}
            >
              <Quote className="w-10 h-10 text-hot-pink mb-4" />

              <blockquote className="text-lg md:text-xl font-bold text-harsh-black leading-relaxed mb-6 font-sans">
                {'"'}
                {opinion.quote}
                {'"'}
              </blockquote>

              <div className="border-t-[3px] border-harsh-black pt-4">
                <p className="font-bold text-harsh-black uppercase font-sans">
                  {opinion.author}
                </p>
                <p className="text-sm text-harsh-black/60 uppercase font-sans">
                  {opinion.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
