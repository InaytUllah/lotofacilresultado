import { EditorialPost } from './types';
import { POSTS_1_5 } from './posts-1-5';
import { POSTS_6_10 } from './posts-6-10';

export type { EditorialPost } from './types';

export const EDITORIAL_POSTS: EditorialPost[] = [
  ...POSTS_1_5,
  ...POSTS_6_10,
];

export const EDITORIAL_POSTS_BY_SLUG: Record<string, EditorialPost> =
  EDITORIAL_POSTS.reduce<Record<string, EditorialPost>>((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {});

export function getEditorialPost(slug: string): EditorialPost | null {
  return EDITORIAL_POSTS_BY_SLUG[slug] ?? null;
}

export function isEditorialSlug(slug: string): boolean {
  return slug in EDITORIAL_POSTS_BY_SLUG;
}

export function getEditorialPostsSorted(): EditorialPost[] {
  return [...EDITORIAL_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getRelatedEditorialPosts(
  slug: string,
  limit = 3,
): EditorialPost[] {
  const post = getEditorialPost(slug);
  if (!post || !post.relatedSlugs) return [];
  return post.relatedSlugs
    .map((s) => getEditorialPost(s))
    .filter((p): p is EditorialPost => p !== null)
    .slice(0, limit);
}
