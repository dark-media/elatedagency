import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Blog - OnlyFans Growth Tips & Creator Strategies",
  description:
    "Expert tips on growing your OnlyFans, content strategy, revenue optimization, and creator management insights from Elated Agency.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      publishedAt: true,
      author: true,
    },
  });

  return (
    <main className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Blog
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Creator Growth <span className="gradient-text">Insights</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-dark-400">
            Tips, strategies, and insights to help you maximize your OnlyFans
            revenue and grow your brand.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="mx-auto mt-16 max-w-lg text-center">
            <p className="text-dark-400">
              New articles coming soon. Check back shortly!
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-gold-500/20 hover:bg-white/[0.04]"
              >
                {post.category && (
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-gold-400">
                    {post.category}
                  </span>
                )}
                <h2 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-gold-400">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-dark-400">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-xs text-dark-500">
                  <span>{post.author}</span>
                  {post.publishedAt && (
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to grow your revenue?
          </h2>
          <p className="mt-3 text-dark-400">
            Join 500+ creators who trust Elated Agency to manage and grow their
            OnlyFans.
          </p>
          <Link
            href="/apply"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3 font-semibold text-dark-950 transition-all hover:shadow-[0_0_30px_rgba(197,165,90,0.4)]"
          >
            Apply Now
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
      </div>
    </main>
  );
}
