export interface GNewsArticle {
    title: string
    description: string | null
    content: string
    url: string
    image: string | null
    publishedAt: string
    source: {
        name: string
        url: string
    }
}

interface GNewsResponse {
    totalArticles: number
    articles: GNewsArticle[]
}

export const CATEGORIES = {
    hot: { label: "HOT", query: "breaking OR viral OR trending" },
    politik: { label: "POLITIK", query: "politik OR pemerintah OR DPR OR presiden" },
    ekonomi: { label: "EKONOMI", query: "ekonomi OR bisnis OR inflasi OR rupiah" },
    opini: { label: "OPINI", query: "opini OR editorial OR kolom OR analisis" },
    kultur: { label: "KULTUR", query: "budaya OR musik OR film OR seni OR hiburan" },
} as const

export type CategoryKey = keyof typeof CATEGORIES

export function isValidCategory(value: string): value is CategoryKey {
    return value in CATEGORIES
}

export function slugifyArticleTitle(title: string): string {
    return title
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

export function getArticleSlug(article: GNewsArticle): string {
    return slugifyArticleTitle(article.title)
}

export function findArticleBySlug(
    articles: GNewsArticle[],
    slug: string,
): GNewsArticle | undefined {
    return articles.find((article) => getArticleSlug(article) === slug)
}

export async function fetchTopHeadlines(max = 10): Promise<GNewsArticle[]> {
    const apiKey = process.env.GNEWS_API_KEY
    if (!apiKey) return []

    const params = new URLSearchParams({
        country: "id",
        lang: "id",
        max: String(Math.min(max, 10)),
        apikey: apiKey,
    })

    try {
        const res = await fetch(
            `https://gnews.io/api/v4/top-headlines?${params.toString()}`,
            { next: { revalidate: 1800 } }
        )
        if (!res.ok) return []
        const data: GNewsResponse = await res.json()
        return data.articles ?? []
    } catch {
        return []
    }
}

export async function searchNews(query: string, max = 10): Promise<GNewsArticle[]> {
    const apiKey = process.env.GNEWS_API_KEY
    if (!apiKey) return []

    const params = new URLSearchParams({
        q: query,
        country: "id",
        lang: "id",
        max: String(Math.min(max, 10)),
        apikey: apiKey,
    })

    try {
        const res = await fetch(
            `https://gnews.io/api/v4/search?${params.toString()}`,
            { next: { revalidate: 1800 } }
        )
        if (!res.ok) return []
        const data: GNewsResponse = await res.json()
        return data.articles ?? []
    } catch {
        return []
    }
}
