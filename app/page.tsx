'use client';

import { useMemo } from 'react';
import { CategoryTable } from '@/components/CategoryTable';
import { Leaderboard } from '@/components/Leaderboard';
import { PrintableResults } from '@/components/PrintableResults';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateLeaderboard } from '@/lib/scoring';
import { Category, CompetitionData, CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const INITIAL_DATA: CompetitionData = {
  categories: [
    {
      name: 'Cut flowers',
      prefix: 'CF',
      color: 'bg-blue-100 border-blue-300',
      entries: [
        { id: 'CF1', firstPlace: 'dan', secondPlace: '', thirdPlace: '' },
        { id: 'CF2', firstPlace: 'chris s', secondPlace: 'caroll', thirdPlace: 'dave c' },
        { id: 'CF3', firstPlace: 'ken m', secondPlace: 'caroll', thirdPlace: '' },
        { id: 'CF4', firstPlace: 'caroll', secondPlace: 'dave c', thirdPlace: 'chris s' },
        { id: 'CF5', firstPlace: 'dan', secondPlace: '', thirdPlace: '' },
        { id: 'CF6', firstPlace: 'sall g', secondPlace: 'jo g', thirdPlace: '' },
        { id: 'CF7', firstPlace: 'jan f', secondPlace: 'ken m', thirdPlace: 'chris s' },
      ],
    },
    {
      name: 'Roses',
      prefix: 'R',
      color: 'bg-pink-100 border-pink-300',
      entries: [
        { id: 'R1', firstPlace: 'dan', secondPlace: 'sall g', thirdPlace: '' },
        { id: 'R2', firstPlace: 'sall g', secondPlace: 'caroll', thirdPlace: '' },
        { id: 'R3', firstPlace: 'hilary e', secondPlace: 'caroll', thirdPlace: 'Val w' },
        { id: 'R4', firstPlace: 'dave c', secondPlace: 'sall g', thirdPlace: 'Caroll' },
      ],
    },
    {
      name: 'Vege',
      prefix: 'v',
      color: 'bg-green-100 border-green-300',
      entries: [
        { id: 'v1', firstPlace: 'sall g', secondPlace: 'ken e', thirdPlace: '' },
        { id: 'v2', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'v3', firstPlace: 'chris s', secondPlace: 'angela p', thirdPlace: 'caroll' },
        { id: 'v4', firstPlace: 'dave c', secondPlace: 'angela p', thirdPlace: '' },
        { id: 'v5', firstPlace: 'chris s', secondPlace: 'dave c', thirdPlace: 'ken e' },
        { id: 'v6', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'v7', firstPlace: 'hilary e', secondPlace: 'ken e', thirdPlace: 'Dan' },
        { id: 'v8', firstPlace: 'dave c', secondPlace: 'ken e', thirdPlace: '' },
        { id: 'v9', firstPlace: 'dave c', secondPlace: 'ken e', thirdPlace: '' },
        { id: 'v10', firstPlace: 'ken e', secondPlace: '', thirdPlace: '' },
        { id: 'v11', firstPlace: 'dan', secondPlace: '', thirdPlace: '' },
        { id: 'V12', firstPlace: 'ash scott', secondPlace: 'caroll', thirdPlace: 'chris s' },
      ],
    },
    {
      name: 'fruit',
      prefix: 'f',
      color: 'bg-lime-100 border-lime-300',
      entries: [
        { id: 'f1', firstPlace: 'dave c', secondPlace: 'ken e', thirdPlace: 'chris s' },
        { id: 'f2', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'f3', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'f4', firstPlace: 'jan f', secondPlace: '', thirdPlace: '' },
        { id: 'f5', firstPlace: 'dave c', secondPlace: '', thirdPlace: '' },
        { id: 'f6', firstPlace: 'caroll', secondPlace: 'caroll', thirdPlace: 'angela p' },
      ],
    },
    {
      name: 'Pots&Containers',
      prefix: 'PC',
      color: 'bg-cyan-100 border-cyan-300',
      entries: [
        { id: 'PC1', firstPlace: 'ken e', secondPlace: 'ken e', thirdPlace: 'ken m' },
        { id: 'PC2', firstPlace: '', secondPlace: '', thirdPlace: 'ken m' },
        { id: 'PC3', firstPlace: 'chris s', secondPlace: 'ken m', thirdPlace: 'caroll' },
        { id: 'PC4', firstPlace: 'jan f', secondPlace: 'chris s', thirdPlace: 'lyn p' },
        { id: 'PC5', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'PC6', firstPlace: 'dan', secondPlace: 'heather c', thirdPlace: 'linda s' },
      ],
    },
    {
      name: 'Floral',
      prefix: 'FD',
      color: 'bg-purple-100 border-purple-300',
      entries: [
        { id: 'FD1', firstPlace: 'jayne S', secondPlace: 'caroll', thirdPlace: 'jo g' },
        { id: 'FD2', firstPlace: 'jayne S', secondPlace: 'caroll', thirdPlace: 'hilary e' },
        { id: 'FD3', firstPlace: 'caroll', secondPlace: 'jayne S', thirdPlace: '' },
        { id: 'FD4', firstPlace: 'jayne S', secondPlace: 'caroll', thirdPlace: '' },
        { id: 'FD5', firstPlace: 'caroll', secondPlace: 'jo g', thirdPlace: 'Val w' },
      ],
    },
    {
      name: 'Home baking',
      prefix: 'H',
      color: 'bg-gray-100 border-gray-300',
      entries: [
        { id: 'H1', firstPlace: 'sall g', secondPlace: '', thirdPlace: 'hilary e' },
        { id: 'H2', firstPlace: '', secondPlace: 'hilary e', thirdPlace: '' },
        { id: 'H3', firstPlace: 'dave c', secondPlace: 'dan', thirdPlace: '' },
        { id: 'H4', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'H5', firstPlace: 'sall g', secondPlace: 'chris s', thirdPlace: 'angela p' },
        { id: 'H6', firstPlace: '', secondPlace: 'dave c', thirdPlace: '' },
        { id: 'H7', firstPlace: '', secondPlace: '', thirdPlace: '' },
        { id: 'H8', firstPlace: 'dan', secondPlace: 'hilary e', thirdPlace: '' },
      ],
    },
  ],
};

export default function Home() {
  const [data, setData] = useLocalStorage<CompetitionData>(
    'garden-competition-data',
    INITIAL_DATA
  );

  const leaderboard = useMemo(() => {
    return calculateLeaderboard(data.categories);
  }, [data.categories]);

  const handleUpdateCategory = (updatedCategory: Category) => {
    const updatedCategories = data.categories.map((cat) =>
      cat.name === updatedCategory.name ? updatedCategory : cat
    );
    setData({ ...data, categories: updatedCategories });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 no-print">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🌻 Gardening Competition Scoring
            </h1>
            <p className="text-gray-600">
              Track participant scores across all categories
            </p>
            <div className="mt-6">
              <Button
                onClick={handlePrint}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl font-bold shadow-lg"
              >
                <Printer className="mr-3 h-6 w-6" />
                Print Results to PDF
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories Section */}
            <div className="lg:col-span-2 space-y-6">
              {data.categories.map((category) => (
                <CategoryTable
                  key={category.name}
                  category={category}
                  onUpdateCategory={handleUpdateCategory}
                />
              ))}
            </div>

            {/* Leaderboard Section */}
            <div className="lg:col-span-1">
              <Leaderboard scores={leaderboard} />
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>Data is automatically saved to your browser&apos;s local storage</p>
          </footer>
        </div>
      </div>

      {/* Hidden printable version */}
      <PrintableResults categories={data.categories} leaderboard={leaderboard} />
    </>
  );
}
