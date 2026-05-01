export interface EditorialPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  category: string;
  readingTime: number; // minutes
  author: {
    name: string;
    role: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
  };
  excerpt: string;
  content: string; // HTML
  faq?: Array<{ q: string; a: string }>;
  relatedSlugs?: string[];
  tags: string[];
}
