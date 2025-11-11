import { Category, ParticipantScore, POINTS } from './types';

/**
 * Calculate the leaderboard from all categories
 * Returns an array of participant scores sorted by total score (descending)
 */
export function calculateLeaderboard(categories: Category[]): ParticipantScore[] {
  const participantScores = new Map<string, ParticipantScore>();

  // Iterate through all categories and entries
  categories.forEach((category) => {
    category.entries.forEach((entry) => {
      // Process first place (3 points)
      if (entry.firstPlace.trim()) {
        const names = parseParticipantNames(entry.firstPlace);
        names.forEach((name) => {
          addScore(participantScores, name, category.name, POINTS.FIRST);
        });
      }

      // Process second place (2 points)
      if (entry.secondPlace.trim()) {
        const names = parseParticipantNames(entry.secondPlace);
        names.forEach((name) => {
          addScore(participantScores, name, category.name, POINTS.SECOND);
        });
      }

      // Process third place (1 point)
      if (entry.thirdPlace.trim()) {
        const names = parseParticipantNames(entry.thirdPlace);
        names.forEach((name) => {
          addScore(participantScores, name, category.name, POINTS.THIRD);
        });
      }
    });
  });

  // Convert map to array and sort by total score (descending)
  return Array.from(participantScores.values()).sort(
    (a, b) => b.totalScore - a.totalScore
  );
}

/**
 * Parse participant names from a string
 * Handles multiple names separated by commas
 */
function parseParticipantNames(input: string): string[] {
  return input
    .split(',') // Split by comma only
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

/**
 * Calculate the winner(s) for a specific category
 * Returns an object with winner names and their score
 */
export function calculateCategoryWinner(category: Category): {
  winners: string[];
  score: number;
} | null {
  const participantScores = new Map<string, number>();

  // Calculate scores for this category
  category.entries.forEach((entry) => {
    // Process first place (3 points)
    if (entry.firstPlace.trim()) {
      const names = parseParticipantNames(entry.firstPlace);
      names.forEach((name) => {
        participantScores.set(name, (participantScores.get(name) || 0) + POINTS.FIRST);
      });
    }

    // Process second place (2 points)
    if (entry.secondPlace.trim()) {
      const names = parseParticipantNames(entry.secondPlace);
      names.forEach((name) => {
        participantScores.set(name, (participantScores.get(name) || 0) + POINTS.SECOND);
      });
    }

    // Process third place (1 point)
    if (entry.thirdPlace.trim()) {
      const names = parseParticipantNames(entry.thirdPlace);
      names.forEach((name) => {
        participantScores.set(name, (participantScores.get(name) || 0) + POINTS.THIRD);
      });
    }
  });

  // No participants scored
  if (participantScores.size === 0) {
    return null;
  }

  // Find the highest score
  const maxScore = Math.max(...participantScores.values());

  // Get all participants with the highest score (handles ties)
  const winners = Array.from(participantScores.entries())
    .filter(([_, score]) => score === maxScore)
    .map(([name, _]) => name);

  return {
    winners,
    score: maxScore,
  };
}

/**
 * Add score to a participant
 */
function addScore(
  participantScores: Map<string, ParticipantScore>,
  participant: string,
  categoryName: string,
  points: number
): void {
  if (!participantScores.has(participant)) {
    participantScores.set(participant, {
      participant,
      totalScore: 0,
      breakdown: {},
    });
  }

  const score = participantScores.get(participant)!;
  score.totalScore += points;
  score.breakdown[categoryName] = (score.breakdown[categoryName] || 0) + points;
}

