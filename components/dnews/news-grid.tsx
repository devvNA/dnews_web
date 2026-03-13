"use client";

import {
  CATEGORIES,
  getArticleSlug,
  type CategoryKey,
  type GNewsArticle,
} from "@/lib/gnews";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  category: string;
  categoryEmoji: string;
  categoryColor: "yellow" | "blue" | "pink";
  title: string;
  excerpt: string;
  author: string;
  date: string;
  size: "large" | "medium" | "small";
  image?: string | null;
  url?: string | null;
  slug?: string;
}

const CATEGORY_PRESETS: Pick<
  NewsItem,
  "category" | "categoryEmoji" | "categoryColor"
>[] = [
  { category: "HOT ISSUE", categoryEmoji: "💣", categoryColor: "pink" },
  { category: "EKONOMI", categoryEmoji: "💸", categoryColor: "yellow" },
  { category: "TEKNOLOGI", categoryEmoji: "🧠", categoryColor: "blue" },
  { category: "POLITIK", categoryEmoji: "⚡", categoryColor: "pink" },
  { category: "KULTUR", categoryEmoji: "🎭", categoryColor: "blue" },
  { category: "SOSIAL", categoryEmoji: "💬", categoryColor: "yellow" },
];

const CATEGORY_META: Record<
  CategoryKey,
  Pick<NewsItem, "category" | "categoryEmoji" | "categoryColor">
> = {
  hot: {
    category: CATEGORIES.hot.label,
    categoryEmoji: "💣",
    categoryColor: "pink",
  },
  politik: {
    category: CATEGORIES.politik.label,
    categoryEmoji: "⚡",
    categoryColor: "pink",
  },
  ekonomi: {
    category: CATEGORIES.ekonomi.label,
    categoryEmoji: "💸",
    categoryColor: "yellow",
  },
  opini: {
    category: CATEGORIES.opini.label,
    categoryEmoji: "💭",
    categoryColor: "yellow",
  },
  kultur: {
    category: CATEGORIES.kultur.label,
    categoryEmoji: "🎭",
    categoryColor: "blue",
  },
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function mapArticles(
  articles: GNewsArticle[],
  activeCategory?: CategoryKey,
): NewsItem[] {
  return articles.map((a, i) => ({
    id: i + 1,
    ...(activeCategory
      ? CATEGORY_META[activeCategory]
      : CATEGORY_PRESETS[i % CATEGORY_PRESETS.length]),
    title: a.title.toUpperCase(),
    excerpt: a.description ?? "",
    author: a.source.name,
    date: formatDate(a.publishedAt),
    size: i === 0 ? "large" : i < 3 ? "medium" : "small",
    image: a.image,
    url: a.url,
    slug: getArticleSlug(a),
  }));
}

const FALLBACK_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: "HOT ISSUE",
    categoryEmoji: "💣",
    categoryColor: "pink",
    title: "PEJABAT X KEMBALI BERULAH: INI BUKTI BARUNYA!",
    excerpt:
      "Dokumen rahasia bocor ke publik. Kami ungkap semua fakta yang selama ini disembunyikan dari rakyat.",
    author: "Tim Investigasi",
    date: "26 Feb 2026",
    size: "large",
  },
  {
    id: 2,
    category: "MIND BLOWN",
    categoryEmoji: "🧠",
    categoryColor: "blue",
    title: "GENERASI Z MAKIN SUSAH BELI RUMAH, SALAH SIAPA?",
    excerpt:
      "Analisis mendalam tentang krisis properti yang menghantam anak muda Indonesia.",
    author: "Sarah Wijaya",
    date: "26 Feb 2026",
    size: "medium",
  },
  {
    id: 3,
    category: "EKONOMI",
    categoryEmoji: "💸",
    categoryColor: "yellow",
    title: "INFLASI MEROKET: TIPS BERTAHAN HIDUP DARI KAMI",
    excerpt: "Panduan praktis menghadapi kenaikan harga yang gila-gilaan.",
    author: "Budi Santoso",
    date: "25 Feb 2026",
    size: "medium",
  },
  {
    id: 4,
    category: "POLITIK",
    categoryEmoji: "⚡",
    categoryColor: "pink",
    title: "DRAMA KOALISI: SIAPA TIKAM SIAPA?",
    excerpt: "Intrik politik di balik layar yang bikin geleng-geleng kepala.",
    author: "Andi Pratama",
    date: "25 Feb 2026",
    size: "small",
  },
  {
    id: 5,
    category: "KULTUR",
    categoryEmoji: "🎭",
    categoryColor: "blue",
    title: "KONSER MUSIK DIBATALKAN: INI ALASAN SEBENARNYA",
    excerpt: "Bukan soal izin, tapi ada agenda tersembunyi.",
    author: "Maya Putri",
    date: "24 Feb 2026",
    size: "small",
  },
  {
    id: 6,
    category: "OPINI",
    categoryEmoji: "💭",
    categoryColor: "yellow",
    title: "KENAPA MEDIA MAINSTREAM TAKUT BICARA?",
    excerpt: "Editorial tajam tentang kebebasan pers di Indonesia.",
    author: "Redaksi D'News",
    date: "24 Feb 2026",
    size: "small",
  },
  {
    id: 7,
    category: "SOSIAL",
    categoryEmoji: "💬",
    categoryColor: "pink",
    title: "VIRAL KAMPUNG PINTAR: WARGA UBAH GANG SEMPIT JADI RUANG BELAJAR",
    excerpt: "Inisiatif kecil dari warga lokal justru memicu gerakan besar yang menarik perhatian publik.",
    author: "Nadia Rahma",
    date: "23 Feb 2026",
    size: "small",
  },
];

const categoryColors = {
  yellow: "bg-neon-yellow text-harsh-black",
  blue: "bg-electric-blue text-white",
  pink: "bg-hot-pink text-white",
};

function NewsCard({ item }: { item: NewsItem }) {
  const isLarge = item.size === "large";
  const isMedium = item.size === "medium";

  const cardContent = (
    <article
      className={`
        group relative bg-paper-white border-[3px] border-harsh-black brutal-shadow brutal-shadow-hover cursor-pointer
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
        ${isMedium ? "md:row-span-2" : ""}
      `}
    >
      {/* Content */}
      <div className={`p-4 ${isLarge ? "md:p-8" : "md:p-5"}`}>
        {/* Category Sticker */}
        <div className="mb-3">
          <div
            className={`
              inline-flex items-center px-3 py-1 border-[3px] border-harsh-black brutal-shadow font-sans
              ${categoryColors[item.categoryColor]}
              ${isLarge ? "rotate-[-2deg]" : "rotate-[-3deg]"}
            `}
          >
            <span className="text-sm mr-1">{item.categoryEmoji}</span>
            <span className="text-xs font-bold uppercase">{item.category}</span>
          </div>
        </div>

        {/* Image */}
        {(isLarge || isMedium) && (
          <div
            className={`
              relative mb-4 border-[3px] border-harsh-black overflow-hidden
              ${isLarge ? "h-48 md:h-64" : "h-32 md:h-40"}
              ${item.categoryColor === "yellow" ? "bg-neon-yellow/30" : ""}
              ${item.categoryColor === "blue" ? "bg-electric-blue/20" : ""}
              ${item.categoryColor === "pink" ? "bg-hot-pink/20" : ""}
            `}
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`font-display text-4xl md:text-6xl uppercase opacity-20 rotate-[-5deg] ${isLarge ? "md:text-8xl" : ""}`}
                  >
                    {item.categoryEmoji}
                  </span>
                </div>
              </>
            )}
            <div className="absolute bottom-2 right-2 bg-harsh-black text-paper-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[100ms]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Title */}
        <h3
          className={`
            font-display uppercase leading-[0.95] tracking-tight word-break-brutal text-harsh-black group-hover:text-hot-pink transition-colors duration-[100ms]
            ${isLarge ? "text-2xl md:text-4xl" : isMedium ? "text-xl md:text-2xl" : "text-lg md:text-xl"}
          `}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        {(isLarge || isMedium) && (
          <p
            className={`mt-3 text-harsh-black/80 leading-relaxed font-sans ${isLarge ? "text-base" : "text-sm"}`}
          >
            {item.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase text-harsh-black/60 font-sans">
          <span>{item.author}</span>
          <span>{item.date}</span>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-harsh-black" />
    </article>
  );

  if (item.slug) {
    return (
      <Link href={`/news/${item.slug}`} className="contents">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

interface NewsGridProps {
  articles?: GNewsArticle[];
  activeCategory?: CategoryKey;
}

export function NewsGrid({ articles, activeCategory }: NewsGridProps) {
  const newsItems =
    articles && articles.length > 0
      ? mapArticles(articles, activeCategory)
      : FALLBACK_ITEMS;

  return (
    <section id="berita-terkini" className="bg-paper-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <div className="inline-block bg-harsh-black text-paper-white px-4 py-1 text-sm font-bold uppercase mb-4 rotate-[-1deg] border-[3px] border-harsh-black font-sans">
              THE DAILY FEED
            </div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-harsh-black">
              BERITA TERKINI
            </h2>
          </div>
          <button className="bg-neon-yellow text-harsh-black px-6 py-3 font-bold uppercase text-sm border-[3px] border-harsh-black brutal-shadow brutal-shadow-hover brutal-shadow-active self-start md:self-auto transition-all duration-[100ms] font-sans">
            LIHAT SEMUA
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
