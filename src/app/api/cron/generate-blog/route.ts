import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import prisma from "@/lib/prisma";

export const maxDuration = 60;

function verifyAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find a planned topic that hasn't been written yet
  const topic = await prisma.contentPlan.findFirst({
    where: { status: "planned", blogPostId: null },
    orderBy: { createdAt: "asc" },
  });

  if (!topic) {
    return NextResponse.json({ message: "No topics to write" });
  }

  // Mark as in-progress
  await prisma.contentPlan.update({
    where: { id: topic.id },
    data: { status: "writing" },
  });

  try {
    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: `You are an expert SEO content writer for Elated Agency, an AI-powered OnlyFans management agency. Write high-quality, engaging blog posts that rank well on Google.

Key facts about Elated Agency:
- Only 20% commission (industry lowest)
- No contracts, month-to-month
- AI-powered chat management, revenue optimization, content strategy
- 500+ creators managed, average 3-10x revenue growth
- Apply at /apply

Writing guidelines:
- Write 1500-2500 words
- Use H2 and H3 headings (HTML tags: <h2>, <h3>)
- Include actionable tips and real strategies
- Naturally mention Elated Agency 2-3 times with links to /apply
- Use <p> tags for paragraphs
- Use <ul>/<ol> with <li> for lists
- Use <strong> for emphasis
- Use <blockquote> for key takeaways
- Include a compelling introduction and conclusion
- Write in a professional but approachable tone
- Target the provided keywords naturally (don't stuff)
- Output ONLY the HTML body content, no wrapper tags`,
      prompt: `Write a comprehensive SEO blog post about: "${topic.topic}"

Target keywords: ${topic.targetKeywords || topic.topic}

Include:
1. An engaging introduction that hooks the reader
2. 4-6 main sections with H2 headings
3. Practical, actionable advice
4. 2-3 natural mentions of Elated Agency with links to /apply
5. A strong conclusion with a call to action

Output the article content as clean HTML (no <html>, <head>, or <body> wrapper tags).`,
    });

    // Generate meta fields
    const { text: metaText } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      prompt: `For a blog post titled "${topic.topic}", generate:
1. A catchy SEO title (under 60 characters)
2. A meta description (under 155 characters)
3. A short excerpt (1-2 sentences)
4. A category (one of: Growth, Strategy, Marketing, Revenue, Tips)

Format your response EXACTLY like this:
TITLE: [title here]
META: [meta description here]
EXCERPT: [excerpt here]
CATEGORY: [category here]`,
    });

    // Parse meta fields
    const titleMatch = metaText.match(/TITLE:\s*(.+)/);
    const metaMatch = metaText.match(/META:\s*(.+)/);
    const excerptMatch = metaText.match(/EXCERPT:\s*(.+)/);
    const categoryMatch = metaText.match(/CATEGORY:\s*(.+)/);

    const title = titleMatch?.[1]?.trim() || topic.topic;
    const slug = slugify(title);

    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content: text,
        excerpt: excerptMatch?.[1]?.trim() || "",
        metaTitle: titleMatch?.[1]?.trim() || title,
        metaDescription: metaMatch?.[1]?.trim() || "",
        category: categoryMatch?.[1]?.trim() || "Tips",
        author: "Elated Agency",
        published: true,
        publishedAt: new Date(),
      },
    });

    // Link content plan to blog post
    await prisma.contentPlan.update({
      where: { id: topic.id },
      data: { status: "published", blogPostId: post.id },
    });

    return NextResponse.json({
      success: true,
      post: { id: post.id, title: post.title, slug: post.slug },
    });
  } catch (error) {
    // Reset topic status on failure
    await prisma.contentPlan.update({
      where: { id: topic.id },
      data: { status: "planned" },
    });

    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post" },
      { status: 500 }
    );
  }
}
