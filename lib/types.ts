export interface Entry {
  id: string;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
}

export interface Category {
  name: string;
  prefix: string;
  color: string;
  entries: Entry[];
}

export interface ParticipantScore {
  participant: string;
  totalScore: number;
  breakdown: {
    [categoryName: string]: number;
  };
}

export interface CompetitionData {
  categories: Category[];
}

export const CATEGORIES: Omit<Category, 'entries'>[] = [
  { name: 'Cut flowers', prefix: 'CF', color: 'bg-blue-100 border-blue-300' },
  { name: 'Roses', prefix: 'R', color: 'bg-pink-100 border-pink-300' },
  { name: 'Vege', prefix: 'v', color: 'bg-green-100 border-green-300' },
  { name: 'fruit', prefix: 'f', color: 'bg-lime-100 border-lime-300' },
  { name: 'Pots&Containers', prefix: 'PC', color: 'bg-cyan-100 border-cyan-300' },
  { name: 'Floral', prefix: 'FD', color: 'bg-purple-100 border-purple-300' },
  { name: 'Home baking', prefix: 'H', color: 'bg-gray-100 border-gray-300' },
];

export const POINTS = {
  FIRST: 3,
  SECOND: 2,
  THIRD: 1,
};

