'use client';

import { ParticipantScore } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  scores: ParticipantScore[];
}

export function Leaderboard({ scores }: LeaderboardProps) {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankClass = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-50 font-bold';
      case 1:
        return 'bg-gray-50 font-semibold';
      case 2:
        return 'bg-amber-50 font-semibold';
      default:
        return '';
    }
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Enter participant names to see the leaderboard
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead className="text-right">Total Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow key={score.participant} className={getRankClass(index)}>
                  <TableCell className="flex items-center gap-2">
                    {getRankIcon(index)}
                    <span>#{index + 1}</span>
                  </TableCell>
                  <TableCell className="font-medium capitalize">
                    {score.participant}
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    {score.totalScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        {scores.length > 0 && (
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold text-sm text-gray-700 hover:text-gray-900">
              View Detailed Breakdown
            </summary>
            <div className="mt-4 space-y-4">
              {scores.map((score) => (
                <div key={score.participant} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold capitalize mb-2">{score.participant}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(score.breakdown).map(([category, points]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-gray-600">{category}:</span>
                        <span className="font-medium">{points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

