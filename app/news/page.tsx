import { Footer } from "@/components/dnews/footer";
import { Header } from "@/components/dnews/header";
import { NewsGrid } from "@/components/dnews/news-grid";
import { CATEGORIES, fetchTopHeadlines, searchNews } from "@/lib/gnews";
import { Sparkles, Newspaper } from "lucide-react";

export const metadata = {
  title: "Indeks Berita - D'NEWS",
  description: "Daftar lengkap berita terbaru lintas kategori dari D'NEWS.",
};

export default async function NewsListingPage() {
  const articleGroups = await Promise.all([
    fetchTopHeadlines(10),
    ...Object.values(CATEGORIES).map((category) =>
      searchNews(category.query, 10),
    ),
  ]);

  const rawArticles = articleGroups.flat();
  // Deduplicate by URL
  const articles = rawArticles.filter(
    (candidate, index, array) =>
      array.findIndex((item) => item.url === candidate.url) === index,
  );

  return (
    <main className="min-h-screen bg-paper-white">
      <Header articles={articles.slice(0, 5)} />

      <div className="border-b-[3px] border-harsh-black bg-electric-blue/10 px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 border-[3px] border-harsh-black bg-harsh-black px-6 py-4 text-xl font-bold uppercase text-paper-white rotate-[-1deg] font-sans brutal-shadow brutal-shadow-hover">
            <Newspaper className="size-6" />
            Indeks Berita Terkini
          </div>
          <div className="mt-8">
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-harsh-black md:text-7xl">
              SEMUA HEADLINE <br />
              <span className="text-hot-pink">TANPA FILTER</span>
            </h1>
            <p className="border-l-[6px] border-hot-pink pl-4 mt-6 max-w-2xl text-lg leading-relaxed text-harsh-black/80 font-sans md:text-xl font-bold">
              Kumpulan seluruh liputan dari semua kanal D'NEWS. Akses langsung
              informasi penting yang sedang bergerak dalam format bento grid.
            </p>
          </div>
        </div>
      </div>

      <NewsGrid articles={articles} hideViewAll />

      <Footer />
    </main>
  );
}
