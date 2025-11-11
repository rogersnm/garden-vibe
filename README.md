# Gardening Competition Scoring Webapp

A Next.js application for tracking and calculating scores for gardening competition participants across multiple categories.

## Features

- **7 Competition Categories**:
  - Cut flowers
  - Roses
  - Vege
  - fruit
  - Pots&Containers
  - Floral
  - Home baking

- **Scoring System**:
  - 1st Place: 3 points
  - 2nd Place: 2 points
  - 3rd Place: 1 point

- **Dynamic Entry Management**: Add or remove entries for each category
- **Real-time Leaderboard**: Automatically calculates and updates participant scores
- **Local Storage Persistence**: All data is automatically saved to browser storage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Detailed Breakdown**: View score breakdowns by category for each participant

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Enter Participant Names**: Type participant names in the 1st, 2nd, or 3rd place columns
2. **Multiple Winners**: Enter multiple names separated by spaces or commas
3. **Add Entries**: Click the "Add Entry" button to add more entries to a category
4. **Remove Entries**: Click the trash icon to remove an entry
5. **View Leaderboard**: The leaderboard updates automatically as you type
6. **Detailed Scores**: Click "View Detailed Breakdown" to see category-by-category scores

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage

## Project Structure

```
garden/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main page with all categories
│   └── globals.css          # Global styles
├── components/
│   ├── CategoryTable.tsx    # Individual category table
│   ├── Leaderboard.tsx      # Real-time leaderboard
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── scoring.ts           # Score calculation logic
│   └── utils.ts             # Utility functions
└── hooks/
    └── useLocalStorage.ts   # localStorage persistence hook
```

## Data Persistence

All competition data is automatically saved to browser localStorage with the key `garden-competition-data`. The data persists across page refreshes but is specific to the browser being used.

## License

MIT
