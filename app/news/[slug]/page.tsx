import { Footer } from "@/components/dnews/footer";
import { Header } from "@/components/dnews/header";
import { NewsGrid } from "@/components/dnews/news-grid";
import {
  CATEGORIES,
  fetchTopHeadlines,
  findArticleBySlug,
  getArticleSlug,
  searchNews,
} from "@/lib/gnews";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Newspaper,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatArticleBody(content: string, description: string | null): string[] {
  const raw = (content || description || "").replace(/\s*\[\+\d+ chars\]\s*$/, "");

  const paragraphs = raw
    .split(/\n{2,}|(?<=[.!?])\s+(?=[A-ZÀ-ÿ])/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0
    ? paragraphs
    : ["Liputan lengkap masih berkembang. Pantau terus D'NEWS untuk update berikutnya."];
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const articleGroups = await Promise.all([
    fetchTopHeadlines(10),
    ...Object.values(CATEGORIES).map((category) => searchNews(category.query, 10)),
  ]);

  const articles = articleGroups.flat();
  const article = findArticleBySlug(articles, slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((candidate) => getArticleSlug(candidate) !== slug)
    .filter(
      (candidate, index, array) =>
        array.findIndex((item) => item.url === candidate.url) === index,
    )
    .slice(0, 3);

  const contentParagraphs = formatArticleBody(article.content, article.description);

  return (
    <main className="min-h-screen bg-paper-white">
      <Header articles={articles.slice(0, 5)} />

      <section className="border-b-[3px] border-harsh-black bg-paper-white px-4 py-8 md:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-[3px] border-harsh-black bg-neon-yellow px-4 py-2 text-sm font-bold uppercase brutal-shadow brutal-shadow-hover brutal-shadow-active transition-all duration-[100ms] font-sans"
            >
              <ArrowLeft className="size-4" />
              Kembali ke Beranda
            </Link>
            <div className="inline-flex items-center gap-2 border-[3px] border-harsh-black bg-harsh-black px-4 py-2 text-sm font-bold uppercase text-paper-white rotate-[-1deg] font-sans">
              <Sparkles className="size-4" />
              Detail News
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-[3px] border-harsh-black bg-hot-pink px-4 py-2 text-sm font-bold uppercase text-white brutal-shadow rotate-[-2deg] font-sans">
                <Newspaper className="size-4" />
                Breaking File
              </div>

              <h1 className="font-display text-4xl uppercase leading-[0.9] tracking-tight text-harsh-black md:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              <p className="mt-5 max-w-3xl border-l-[6px] border-hot-pink pl-4 text-lg leading-relaxed text-harsh-black/80 font-sans md:text-xl">
                {article.description ??
                  "Liputan pilihan D'NEWS yang dirangkai ulang ke dalam format editorial neo-brutalist."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold uppercase font-sans">
                <div className="border-[3px] border-harsh-black bg-electric-blue px-4 py-2 text-white brutal-shadow">
                  {article.source.name}
                </div>
                <div className="inline-flex items-center gap-2 border-[3px] border-harsh-black bg-paper-white px-4 py-2 text-harsh-black brutal-shadow">
                  <Clock3 className="size-4" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rotate-[2deg] border-[3px] border-harsh-black bg-neon-yellow p-5 brutal-shadow">
                <p className="text-xs font-bold uppercase text-harsh-black/70 font-sans">
                  Source Intel
                </p>
                <p className="mt-2 font-display text-2xl uppercase leading-none text-harsh-black">
                  {article.source.name}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 border-[3px] border-harsh-black bg-harsh-black px-4 py-3 text-sm font-bold uppercase text-paper-white brutal-shadow brutal-shadow-hover brutal-shadow-active transition-all duration-[100ms] font-sans"
                >
                  Baca Sumber Asli
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <div className="rotate-[-1deg] border-[3px] border-harsh-black bg-paper-white p-5 brutal-shadow">
                <p className="text-xs font-bold uppercase text-hot-pink font-sans">
                  Redaksi Note
                </p>
                <p className="mt-3 text-sm leading-relaxed text-harsh-black/80 font-sans">
                  Halaman ini menjaga user tetap berada di ekosistem D'NEWS, lalu
                  menyediakan jalur keluar yang jelas ke sumber asli bila ingin
                  verifikasi lanjutan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-harsh-black bg-electric-blue/10 px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden border-[3px] border-harsh-black brutal-shadow bg-paper-white">
            {article.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="h-[280px] w-full object-cover md:h-[420px]"
              />
            ) : (
              <div className="flex h-[280px] items-center justify-center bg-hot-pink text-white md:h-[420px]">
                <span className="font-display text-6xl uppercase md:text-8xl">NEWS</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper-white px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.4fr)_320px]">
          <article className="space-y-6">
            {contentParagraphs.map((paragraph, index) => (
              <p
                key={`${article.url}-${index}`}
                className={`font-sans leading-relaxed text-harsh-black ${
                  index === 0 ? "text-xl md:text-2xl" : "text-base md:text-lg"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="space-y-4">
            <div className="rotate-[1deg] border-[3px] border-harsh-black bg-hot-pink p-5 text-white brutal-shadow">
              <p className="text-xs font-bold uppercase font-sans">Fast Facts</p>
              <ul className="mt-4 space-y-3 text-sm uppercase font-bold font-sans">
                <li>Headline diambil dari feed GNews</li>
                <li>Slug dibentuk dari judul artikel</li>
                <li>Detail dirender ulang di route internal</li>
              </ul>
            </div>

            <div className="rotate-[-1deg] border-[3px] border-harsh-black bg-neon-yellow p-5 brutal-shadow">
              <p className="text-xs font-bold uppercase text-harsh-black/70 font-sans">
                Read Next
              </p>
              <p className="mt-2 font-display text-2xl uppercase leading-none text-harsh-black">
                Jangan berhenti di satu headline.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <NewsGrid articles={relatedArticles} />
      )}

      <Footer />
    </main>
  );
}
