'use client';

import { Category, ParticipantScore } from '@/lib/types';
import { Trophy } from 'lucide-react';

interface PrintableResultsProps {
  categories: Category[];
  leaderboard: ParticipantScore[];
}

export function PrintableResults({ categories, leaderboard }: PrintableResultsProps) {
  return (
    <div className="print-only">
      {/* Title Page */}
      <div className="print-title-page">
        <h1 className="print-main-title">🌻 Gardening Competition Results</h1>
        <p className="print-subtitle">Final Standings and Category Winners</p>
      </div>

      {/* Overall Leaderboard */}
      <div className="print-section">
        <h2 className="print-section-title">
          <Trophy className="print-trophy-icon" />
          Overall Winners
        </h2>
        {leaderboard.length === 0 ? (
          <p className="print-empty">No results to display</p>
        ) : (
          <table className="print-leaderboard-table">
            <thead>
              <tr>
                <th className="print-th">Rank</th>
                <th className="print-th">Participant</th>
                <th className="print-th print-text-right">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((score, index) => (
                <tr key={score.participant} className={index < 3 ? 'print-podium-row' : ''}>
                  <td className="print-td print-rank">
                    {index === 0 && '🥇 '}
                    {index === 1 && '🥈 '}
                    {index === 2 && '🥉 '}
                    #{index + 1}
                  </td>
                  <td className="print-td print-participant">{score.participant}</td>
                  <td className="print-td print-score print-text-right">{score.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detailed Breakdown by Participant */}
      {leaderboard.length > 0 && (
        <div className="print-section print-page-break">
          <h2 className="print-section-title">Score Breakdown by Participant</h2>
          {leaderboard.map((score, index) => (
            <div key={score.participant} className="print-participant-breakdown">
              <h3 className="print-participant-name">
                {index === 0 && '🥇 '}
                {index === 1 && '🥈 '}
                {index === 2 && '🥉 '}
                {score.participant} - {score.totalScore} points
              </h3>
              <table className="print-breakdown-table">
                <tbody>
                  {Object.entries(score.breakdown)
                    .filter(([_, points]) => points > 0)
                    .map(([category, points]) => (
                      <tr key={category}>
                        <td className="print-category-name">{category}</td>
                        <td className="print-category-points">{points} pts</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Category Details */}
      <div className="print-section print-page-break">
        <h2 className="print-section-title">Results by Category</h2>
        {categories.map((category) => (
          <div key={category.name} className="print-category">
            <h3 className="print-category-title">{category.name}</h3>
            {category.entries.map((entry) => (
              <div key={entry.id} className="print-entry">
                <h4 className="print-entry-id">Entry {entry.id}</h4>
                <table className="print-placements-table">
                  <tbody>
                    {entry.firstPlace && (
                      <tr>
                        <td className="print-placement-label">🥇 1st Place (3 points)</td>
                        <td className="print-placement-value">{entry.firstPlace}</td>
                      </tr>
                    )}
                    {entry.secondPlace && (
                      <tr>
                        <td className="print-placement-label">🥈 2nd Place (2 points)</td>
                        <td className="print-placement-value">{entry.secondPlace}</td>
                      </tr>
                    )}
                    {entry.thirdPlace && (
                      <tr>
                        <td className="print-placement-label">🥉 3rd Place (1 point)</td>
                        <td className="print-placement-value">{entry.thirdPlace}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

