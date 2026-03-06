import Link from "next/link";

export const metadata = {
  title: "Unsubscribed - Elated Agency",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; done?: string }>;
}) {
  const { email, done } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-950 px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-5xl">
          {done ? "✓" : "📧"}
        </div>
        <h1 className="text-2xl font-bold text-white">
          {done ? "You've been unsubscribed" : "Unsubscribe"}
        </h1>
        <p className="mt-4 text-dark-400">
          {done
            ? `${email || "Your email"} has been removed from our mailing list. You won't receive any more emails from us.`
            : "Processing your unsubscribe request..."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-gold-500/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-gold-500"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
