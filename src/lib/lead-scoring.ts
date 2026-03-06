// Lead scoring system for discovered prospects

interface ScoreInput {
  postContent: string;
  subreddit: string;
  followerCount?: number;
  accountAge?: string;
  hasOnlyFansLink?: boolean;
  mentionsEarnings?: boolean;
  mentionsManagement?: boolean;
}

export function scoreProspect(input: ScoreInput): number {
  let score = 0;

  const content = input.postContent.toLowerCase();

  // Intent signals (high value)
  if (input.mentionsManagement || /\b(management|manager|agency)\b/.test(content)) {
    score += 25;
  }
  if (/\b(need help|looking for|anyone know|recommend)\b/.test(content)) {
    score += 15;
  }
  if (/\b(struggling|stuck|plateau|not growing)\b/.test(content)) {
    score += 15;
  }
  if (/\b(how to grow|grow my|increase|boost|scale)\b/.test(content)) {
    score += 10;
  }

  // Platform signals
  if (input.hasOnlyFansLink) {
    score += 10;
  }
  if (input.mentionsEarnings || /\$\d+|\d+k|\bearning|\brevenue|\bincome\b/.test(content)) {
    score += 10;
  }

  // Subreddit relevance
  const highIntentSubs = [
    "onlyfansadvice",
    "creatorsadvice",
    "onlyfanspromotion",
  ];
  const medIntentSubs = [
    "onlyfans101",
    "fansly",
    "contentcreators",
  ];

  if (highIntentSubs.includes(input.subreddit.toLowerCase())) {
    score += 10;
  } else if (medIntentSubs.includes(input.subreddit.toLowerCase())) {
    score += 5;
  }

  // Engagement potential
  if (input.followerCount && input.followerCount > 100) {
    score += 5;
  }

  return Math.min(score, 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}
