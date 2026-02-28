'use client';

import { Category, ParticipantScore } from '@/lib/types';

interface PrintableResultsProps {
  categories: Category[];
  leaderboard: ParticipantScore[];
  under16Leaderboard: ParticipantScore[];
}

export function PrintableResults({ categories, leaderboard }: PrintableResultsProps) {
  const adultCategories = categories.filter((c) => !c.excludeFromOverall);
  const under16Categories = categories.filter((c) => c.excludeFromOverall);

  return (
    <div className="print-only">
      {/* Title Page */}
      <div className="print-title-page">
        <h1 className="print-main-title">🌻 Felixstowe Garden Club 🌻</h1>
        <p className="print-subtitle">Annual Flower &amp; Produce Show 2026</p>
        <p className="print-subtitle" style={{ marginTop: '8px' }}>Results</p>
      </div>

      {/* Class-by-Class Winners */}
      <div className="print-section">
        <h2 className="print-section-title">🏆 Class Winners</h2>

        {adultCategories.map((category) => {
          const topThree = getTopThree(category);
          return (
            <div key={category.name} className="print-class-winner">
              <h3 className="print-class-name">{category.name}</h3>
              {topThree.length > 0 ? (
                <div className="print-winner-list">
                  {topThree.map(({ name, score, rank }) => (
                    <div key={name} className="print-winner-row">
                      <span className="print-winner-rank">
                        {rank === 1 && '1st: '}
                        {rank === 2 && '2nd: '}
                        {rank === 3 && '3rd: '}
                      </span>
                      <span className="print-winner-name">{name}</span>
                      <span className="print-winner-pts"> ({score} pts)</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="print-no-entries">No entries</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Winners */}
      <div className="print-section print-page-break">
        <h2 className="print-section-title">🥇 Overall Winners</h2>
        {leaderboard.length === 0 ? (
          <p className="print-no-entries">No results to display</p>
        ) : (
          <div className="print-overall-winners">
            {leaderboard.slice(0, 3).map((score, index) => (
              <div key={score.participant} className="print-overall-row">
                <span className="print-overall-rank">
                  {index === 0 && '🥇 1st Place: '}
                  {index === 1 && '🥈 2nd Place: '}
                  {index === 2 && '🥉 3rd Place: '}
                </span>
                <span className="print-overall-name">{score.participant}</span>
                <span className="print-overall-pts"> ({score.totalScore} points)</span>
              </div>
            ))}
          </div>
        )}

        {/* Score breakdown for overall top 3 */}
        {leaderboard.slice(0, 3).map((score, index) => (
          <div key={score.participant} className="print-breakdown-box">
            <h3 className="print-breakdown-title">
              {index === 0 && '1st'}
              {index === 1 && '2nd'}
              {index === 2 && '3rd'}
              {' - '}{score.participant} ({score.totalScore} points)
            </h3>
            <table className="print-breakdown-table">
              <tbody>
                {Object.entries(score.breakdown)
                  .filter(([, points]) => points > 0)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, points]) => (
                    <tr key={cat}>
                      <td className="print-breakdown-cat">{cat}</td>
                      <td className="print-breakdown-pts">{points} pts</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Under 16's */}
      {under16Categories.length > 0 && (
        <div className="print-section print-page-break">
          <h2 className="print-section-title">Under 16&apos;s Results</h2>
          {under16Categories.map((category) => (
            <div key={category.name} className="print-class-winner">
              {getTopThree(category).length > 0 ? (
                <div className="print-winner-list">
                  {getTopThree(category).map(({ name, score, rank }) => (
                    <div key={name} className="print-winner-row">
                      <span className="print-winner-rank">
                        {rank === 1 && '1st: '}
                        {rank === 2 && '2nd: '}
                        {rank === 3 && '3rd: '}
                      </span>
                      <span className="print-winner-name">{name}</span>
                      <span className="print-winner-pts"> ({score} pts)</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="print-no-entries">No entries</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Detailed Results by Category */}
      <div className="print-section print-page-break">
        <h2 className="print-section-title">Detailed Results by Category</h2>
        {categories.map((category) => (
          <div key={category.name} className="print-category">
            <h3 className="print-category-title">{category.name}</h3>
            <table className="print-detail-table">
              <thead>
                <tr>
                  <th className="print-th">Entry</th>
                  <th className="print-th">1st (3 pts)</th>
                  <th className="print-th">2nd (2 pts)</th>
                  <th className="print-th">3rd (1 pt)</th>
                </tr>
              </thead>
              <tbody>
                {category.entries.map((entry) => {
                  const hasResults = entry.firstPlace || entry.secondPlace || entry.thirdPlace;
                  if (!hasResults) return null;
                  return (
                    <tr key={entry.id}>
                      <td className="print-td">
                        <strong>{entry.id}</strong>
                        {entry.description && (
                          <div className="print-entry-desc">{entry.description}</div>
                        )}
                      </td>
                      <td className="print-td print-name">{entry.firstPlace || '-'}</td>
                      <td className="print-td print-name">{entry.secondPlace || '-'}</td>
                      <td className="print-td print-name">{entry.thirdPlace || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Get top 3 scorers for a category, with rank assignment.
 */
function getTopThree(category: Category): { name: string; score: number; rank: number }[] {
  const scores = new Map<string, number>();

  category.entries.forEach((entry) => {
    parseNames(entry.firstPlace).forEach((n) => scores.set(n, (scores.get(n) || 0) + 3));
    parseNames(entry.secondPlace).forEach((n) => scores.set(n, (scores.get(n) || 0) + 2));
    parseNames(entry.thirdPlace).forEach((n) => scores.set(n, (scores.get(n) || 0) + 1));
  });

  const sorted = Array.from(scores.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  let rank = 1;
  return sorted.map(([name, score], i) => {
    if (i > 0 && score < sorted[i - 1][1]) rank = i + 1;
    return { name, score, rank };
  });
}

function parseNames(input: string): string[] {
  return input
    .split(',')
    .map((n) => n.trim().toLowerCase())
    .filter((n) => n.length > 0);
}
