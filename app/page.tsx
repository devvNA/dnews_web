import { Footer } from "@/components/dnews/footer";
import { Header } from "@/components/dnews/header";
import { Hero } from "@/components/dnews/hero";
import { NewsGrid } from "@/components/dnews/news-grid";
import { OpinionSection } from "@/components/dnews/opinion-section";
import {
  CATEGORIES,
  fetchTopHeadlines,
  isValidCategory,
  searchNews,
} from "@/lib/gnews";

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const activeCategory =
    category && isValidCategory(category) ? category : undefined;

  const articles = activeCategory
    ? await searchNews(CATEGORIES[activeCategory].query, 10)
    : await fetchTopHeadlines(10);

  return (
    <main className="min-h-screen bg-paper-white">
      <Header articles={articles} activeCategory={activeCategory} />
      <Hero featured={articles[0] ?? null} />
      <NewsGrid
        articles={articles.slice(0, 7)}
        activeCategory={activeCategory}
      />
      <OpinionSection articles={articles.slice(3, 6)} />
      <Footer />
    </main>
  );
}
