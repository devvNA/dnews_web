export interface GNewsArticle {
  title: string;
  description: string | null;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

export const CATEGORIES = {
  hot: { label: "HOT", query: "breaking OR viral OR trending" },
  politik: {
    label: "POLITIK",
    query: "politik OR pemerintah OR DPR OR presiden",
  },
  ekonomi: {
    label: "EKONOMI",
    query: "ekonomi OR bisnis OR inflasi OR rupiah",
  },
  opini: { label: "OPINI", query: "opini OR editorial OR kolom OR analisis" },
  kultur: {
    label: "KULTUR",
    query: "budaya OR musik OR film OR seni OR hiburan",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export function isValidCategory(value: string): value is CategoryKey {
  return value in CATEGORIES;
}

export function slugifyArticleTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getArticleSlug(article: GNewsArticle): string {
  return slugifyArticleTitle(article.title);
}

export function findArticleBySlug(
  articles: GNewsArticle[],
  slug: string,
): GNewsArticle | undefined {
  return articles.find((article) => getArticleSlug(article) === slug);
}

export async function fetchTopHeadlines(max = 10): Promise<GNewsArticle[]> {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    country: "id",
    lang: "id",
    max: String(Math.min(max, 10)),
    apikey: apiKey,
  });

  try {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?${params.toString()}`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return [];
    const data: GNewsResponse = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function searchNews(
  query: string,
  max = 10,
): Promise<GNewsArticle[]> {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    q: query,
    country: "id",
    lang: "id",
    max: String(Math.min(max, 10)),
    apikey: apiKey,
  });

  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?${params.toString()}`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return [];
    const data: GNewsResponse = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function fetchFullArticleContent(
  url: string,
  fallback: string,
): Promise<string> {
  try {
    const controller = new AbortController();
    // Abort fetch after 4 seconds to prevent stalling the server if the source is slow
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return fallback;

    const html = await res.text();

    // Remove script, style, header, footer, nav to avoid extracting junk
    let cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, " ")
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, " ")
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ");

    const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    const paragraphs: string[] = [];
    let match;

    while ((match = paragraphRegex.exec(cleanHtml)) !== null) {
      let text = match[1]
        .replace(/<[^>]*>?/gm, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\s+/g, " ")
        .trim();

      // Match reasonable sized paragraphs instead of short UI elements
      if (text.length > 60 && text.split(" ").length > 8) {
        paragraphs.push(text);
      }
    }

    if (paragraphs.length >= 2) {
      return paragraphs.join("\n\n");
    }

    return fallback;
  } catch {
    return fallback;
  }
}
