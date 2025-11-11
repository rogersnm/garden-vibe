'use client';

import { Category, Entry } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2, Trophy } from 'lucide-react';
import { calculateCategoryWinner } from '@/lib/scoring';

interface CategoryTableProps {
  category: Category;
  onUpdateCategory: (category: Category) => void;
}

export function CategoryTable({ category, onUpdateCategory }: CategoryTableProps) {
  const categoryWinner = calculateCategoryWinner(category);

  const handleInputChange = (
    entryId: string,
    field: 'firstPlace' | 'secondPlace' | 'thirdPlace',
    value: string
  ) => {
    const updatedEntries = category.entries.map((entry) =>
      entry.id === entryId ? { ...entry, [field]: value } : entry
    );
    onUpdateCategory({ ...category, entries: updatedEntries });
  };

  const handleAddEntry = () => {
    const entryNumber = category.entries.length + 1;
    const newEntry: Entry = {
      id: `${category.prefix}${entryNumber}`,
      firstPlace: '',
      secondPlace: '',
      thirdPlace: '',
    };
    onUpdateCategory({ ...category, entries: [...category.entries, newEntry] });
  };

  const handleRemoveEntry = (entryId: string) => {
    const updatedEntries = category.entries.filter((entry) => entry.id !== entryId);
    onUpdateCategory({ ...category, entries: updatedEntries });
  };

  return (
    <Card className={`${category.color} border-2`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Entry ID</TableHead>
              <TableHead>1st Place (3pts)</TableHead>
              <TableHead>2nd Place (2pts)</TableHead>
              <TableHead>3rd Place (1pt)</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.id}</TableCell>
                <TableCell>
                  <Input
                    value={entry.firstPlace}
                    onChange={(e) =>
                      handleInputChange(entry.id, 'firstPlace', e.target.value)
                    }
                    placeholder="Enter name(s)"
                    className="bg-white"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={entry.secondPlace}
                    onChange={(e) =>
                      handleInputChange(entry.id, 'secondPlace', e.target.value)
                    }
                    placeholder="Enter name(s)"
                    className="bg-white"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={entry.thirdPlace}
                    onChange={(e) =>
                      handleInputChange(entry.id, 'thirdPlace', e.target.value)
                    }
                    placeholder="Enter name(s)"
                    className="bg-white"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEntry(entry.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={handleAddEntry}
          variant="outline"
          className="mt-4 w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>

        {/* Category Winner Section */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          {categoryWinner ? (
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">
                    Category Winner{categoryWinner.winners.length > 1 ? 's' : ''}
                  </h4>
                  <p className="text-lg font-bold text-gray-900 capitalize">
                    {categoryWinner.winners.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {categoryWinner.score} point{categoryWinner.score !== 1 ? 's' : ''}
                    {categoryWinner.winners.length > 1 && ' (Tie)'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-3 text-gray-500 text-sm">
              <Trophy className="h-5 w-5 mx-auto mb-1 text-gray-400" />
              No winner yet - enter participant names to compete
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

