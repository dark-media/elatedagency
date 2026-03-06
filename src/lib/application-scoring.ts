// Application auto-scoring system

interface ApplicationData {
  currentEarnings: string | null;
  subscriberCount: string | null;
  instagram: string | null;
  tiktok: string | null;
  twitter: string | null;
  onlyfansUrl: string | null;
  goals: string | null;
  experience: string | null;
  contentType: string | null;
}

export function scoreApplication(app: ApplicationData): number {
  let score = 0;

  // Earnings potential (0-30 points)
  if (app.currentEarnings) {
    const earnings = app.currentEarnings.toLowerCase();
    if (earnings.includes("10k") || earnings.includes("10,000") || /\$\d{5}/.test(earnings)) {
      score += 30;
    } else if (earnings.includes("5k") || earnings.includes("5,000")) {
      score += 25;
    } else if (earnings.includes("2k") || earnings.includes("2,000") || earnings.includes("1k") || earnings.includes("1,000")) {
      score += 20;
    } else if (earnings.includes("500") || earnings.includes("few hundred")) {
      score += 15;
    } else if (earnings.includes("just started") || earnings.includes("0") || earnings.includes("new")) {
      score += 10;
    } else {
      score += 12; // Unknown — give benefit of doubt
    }
  }

  // Social presence (0-20 points)
  let socialCount = 0;
  if (app.instagram) socialCount++;
  if (app.tiktok) socialCount++;
  if (app.twitter) socialCount++;
  score += socialCount * 5;
  if (socialCount >= 2) score += 5;

  // OnlyFans URL (10 points)
  if (app.onlyfansUrl) score += 10;

  // Goals clarity (0-15 points)
  if (app.goals) {
    const goalsLen = app.goals.length;
    if (goalsLen > 100) score += 15;
    else if (goalsLen > 50) score += 10;
    else score += 5;
  }

  // Experience (0-15 points)
  if (app.experience) {
    const exp = app.experience.toLowerCase();
    if (exp.includes("year") || exp.includes("experienced") || exp.includes("months")) {
      score += 15;
    } else if (exp.includes("started") || exp.includes("beginner") || exp.includes("new")) {
      score += 8;
    } else {
      score += 10;
    }
  }

  // Content type filled in (5 points)
  if (app.contentType) score += 5;

  // Subscriber count (0-5 points)
  if (app.subscriberCount) {
    const subs = app.subscriberCount.toLowerCase();
    if (/\d{3,}/.test(subs) || subs.includes("100") || subs.includes("k")) {
      score += 5;
    } else {
      score += 2;
    }
  }

  return Math.min(score, 100);
}

export function getDecision(score: number): "approve" | "review" | "decline" {
  if (score >= 70) return "approve";
  if (score >= 40) return "review";
  return "decline";
}
