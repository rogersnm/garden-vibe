'use client';

import { useMemo } from 'react';
import { CategoryTable } from '@/components/CategoryTable';
import { Leaderboard } from '@/components/Leaderboard';
import { PrintableResults } from '@/components/PrintableResults';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateLeaderboard } from '@/lib/scoring';
import { Category, CompetitionData, ENTRY_DESCRIPTIONS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Printer, RotateCcw, Upload } from 'lucide-react';
import { useRef } from 'react';

function makeEntry(id: string) {
  return { id, description: ENTRY_DESCRIPTIONS[id] || '', firstPlace: '', secondPlace: '', thirdPlace: '' };
}

const INITIAL_DATA: CompetitionData = {
  categories: [
    {
      name: 'Vegetables', prefix: 'V', color: 'bg-green-100 border-green-300',
      entries: Array.from({ length: 14 }, (_, i) => makeEntry(`V${i + 1}`)),
    },
    {
      name: 'Fruit', prefix: 'F', color: 'bg-lime-100 border-lime-300',
      entries: Array.from({ length: 5 }, (_, i) => makeEntry(`F${i + 1}`)),
    },
    {
      name: 'Cut Flowers', prefix: 'CF', color: 'bg-blue-100 border-blue-300',
      entries: Array.from({ length: 7 }, (_, i) => makeEntry(`CF${i + 1}`)),
    },
    {
      name: 'ShowStopper', prefix: 'SSV', color: 'bg-amber-100 border-amber-300',
      entries: [makeEntry('SSV')],
    },
    {
      name: 'Roses', prefix: 'R', color: 'bg-pink-100 border-pink-300',
      entries: Array.from({ length: 5 }, (_, i) => makeEntry(`R${i + 1}`)),
    },
    {
      name: 'Pots/Containers', prefix: 'PC', color: 'bg-cyan-100 border-cyan-300',
      entries: Array.from({ length: 6 }, (_, i) => makeEntry(`PC${i + 1}`)),
    },
    {
      name: 'Floral Decoration', prefix: 'FD', color: 'bg-purple-100 border-purple-300',
      entries: Array.from({ length: 5 }, (_, i) => makeEntry(`FD${i + 1}`)),
    },
    {
      name: 'Photography', prefix: 'P', color: 'bg-indigo-100 border-indigo-300',
      entries: Array.from({ length: 3 }, (_, i) => makeEntry(`P${i + 1}`)),
    },
    {
      name: 'Home Baking', prefix: 'H', color: 'bg-orange-100 border-orange-300',
      entries: Array.from({ length: 8 }, (_, i) => makeEntry(`H${i + 1}`)),
    },
    {
      name: "Under 16's", prefix: 'C', color: 'bg-rose-100 border-rose-300',
      excludeFromOverall: true,
      entries: Array.from({ length: 3 }, (_, i) => makeEntry(`C${i + 1}`)),
    },
  ],
};

export default function Home() {
  const [data, setData] = useLocalStorage<CompetitionData>(
    'fgc-2026-data',
    INITIAL_DATA
  );

  const leaderboard = useMemo(() => {
    return calculateLeaderboard(data.categories);
  }, [data.categories]);

  const under16Leaderboard = useMemo(() => {
    const under16 = data.categories.filter((c) => c.excludeFromOverall);
    return calculateLeaderboard(under16, true);
  }, [data.categories]);

  const handleUpdateCategory = (updatedCategory: Category) => {
    const updatedCategories = data.categories.map((cat) =>
      cat.name === updatedCategory.name ? updatedCategory : cat
    );
    setData({ ...data, categories: updatedCategories });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fgc-2026-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string) as CompetitionData;
        if (!imported.categories || !Array.isArray(imported.categories)) {
          alert('Invalid file: missing categories array.');
          return;
        }
        setData(imported);
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Reset all data? This cannot be undone.')) {
      setData(INITIAL_DATA);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 no-print">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🌻 Felixstowe Garden Club 🌻
            </h1>
            <p className="text-xl text-gray-600">
              Annual Flower &amp; Produce Show 2026
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={handlePrint}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl font-bold shadow-lg"
              >
                <Printer className="mr-3 h-6 w-6" />
                Print Results to PDF
              </Button>
              <Button
                onClick={handleExport}
                size="lg"
                variant="outline"
                className="px-6 py-6 text-lg font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Export
              </Button>
              <Button
                onClick={handleImport}
                size="lg"
                variant="outline"
                className="px-6 py-6 text-lg font-semibold"
              >
                <Upload className="mr-2 h-5 w-5" />
                Import
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="px-6 py-6 text-lg font-semibold text-red-600 border-red-300 hover:bg-red-50"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
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
      <PrintableResults
        categories={data.categories}
        leaderboard={leaderboard}
        under16Leaderboard={under16Leaderboard}
      />
    </>
  );
}
