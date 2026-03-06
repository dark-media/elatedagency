import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, metaTitle: true, metaDescription: true, excerpt: true },
  });
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  // Get related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: { published: true, id: { not: post.id } },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: { title: true, slug: true, excerpt: true },
  });

  return (
    <main className="min-h-screen bg-dark-950 pt-24 pb-16">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-dark-500">
          <Link href="/blog" className="transition-colors hover:text-gold-400">
            Blog
          </Link>
          <span>/</span>
          <span className="text-dark-400">{post.category || "Article"}</span>
        </div>

        {/* Header */}
        <header>
          {post.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {post.category}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-dark-500">
            <span>{post.author}</span>
            {post.publishedAt && (
              <time>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose-blog mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-gold-500/20 bg-gold-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to grow your OnlyFans revenue?
          </h2>
          <p className="mt-3 text-dark-400">
            Join 500+ creators earning 3-10x more with Elated Agency. Only 20%
            commission, no contracts.
          </p>
          <Link
            href="/apply"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3 font-semibold text-dark-950"
          >
            Apply in 2 Minutes
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto mt-16 max-w-3xl px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-white">More Articles</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-gold-500/20"
              >
                <h4 className="text-sm font-medium text-white transition-colors group-hover:text-gold-400">
                  {rp.title}
                </h4>
                {rp.excerpt && (
                  <p className="mt-2 line-clamp-2 text-xs text-dark-500">
                    {rp.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
