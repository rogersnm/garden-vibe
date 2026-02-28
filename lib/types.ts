export interface Entry {
  id: string;
  description?: string;
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
}

export interface Category {
  name: string;
  prefix: string;
  color: string;
  excludeFromOverall?: boolean;
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
  { name: 'Vegetables', prefix: 'V', color: 'bg-green-100 border-green-300' },
  { name: 'Fruit', prefix: 'F', color: 'bg-lime-100 border-lime-300' },
  { name: 'Cut Flowers', prefix: 'CF', color: 'bg-blue-100 border-blue-300' },
  { name: 'ShowStopper', prefix: 'SSV', color: 'bg-amber-100 border-amber-300' },
  { name: 'Roses', prefix: 'R', color: 'bg-pink-100 border-pink-300' },
  { name: 'Pots/Containers', prefix: 'PC', color: 'bg-cyan-100 border-cyan-300' },
  { name: 'Floral Decoration', prefix: 'FD', color: 'bg-purple-100 border-purple-300' },
  { name: 'Photography', prefix: 'P', color: 'bg-indigo-100 border-indigo-300' },
  { name: 'Home Baking', prefix: 'H', color: 'bg-orange-100 border-orange-300' },
  { name: "Under 16's", prefix: 'C', color: 'bg-rose-100 border-rose-300', excludeFromOverall: true },
];

export const POINTS = {
  FIRST: 3,
  SECOND: 2,
  THIRD: 1,
};

export const ENTRY_DESCRIPTIONS: Record<string, string> = {
  // Vegetables
  V1: 'Selection of home-grown vegetables in own seed tray',
  V2: 'Selection of home-grown salad crops in own seed tray',
  V3: 'Three tomatoes, any variety',
  V4: 'Five broad beans in pods',
  V5: 'Five potatoes, any variety',
  V6: 'Five peas in pods',
  V7: '3/5 stems of chard, any variety',
  V8: 'Five carrots',
  V9: 'Three beetroots',
  V10: '5/7 spring onions displayed in own tray',
  V11: 'Two lettuces, any variety',
  V12: 'An arrangement of herbs in a jam jar, may have flowers showing',
  V13: 'Three sticks rhubarb',
  V14: 'Any other vegetable (display only)',
  // Fruit
  F1: '5/7 Strawberries',
  F2: 'Six gooseberries (may be unripe)',
  F3: 'Three strigs of currants (any colour)',
  F4: '5/7 Cherries',
  F5: 'Any other fruit',
  // Cut Flowers
  CF1: 'One vase sweet peas, up to seven stems',
  CF2: 'One vase foliage (quality and quantity judged)',
  CF3: 'One vase of one variety of perennials, up to five stems',
  CF4: 'One vase of mixed annuals (grown from seed, up to five stems)',
  CF5: 'One vase of Peonies 3/5 stems',
  CF6: 'One vase of Alstroemeria 3/5 stems',
  CF7: 'One vase of any annuals or perennials, or a mixture of both, up to seven stems',
  // ShowStopper
  SSV: 'A vase of mixed flowering competitive stems (5-10 stems from min. two kinds of plants, frontal effect)',
  // Roses
  R1: 'One specimen hybrid tea rose (single bloom on stem)',
  R2: 'Up to three stems any variety e.g. climber, rambler or shrub',
  R3: 'One stem floribunda (multi headed variety)',
  R4: 'One rose bloom, floating in a container (provided)',
  R5: 'One stem scented bloom(s), any variety',
  // Pots/Containers
  PC1: 'One flowering fuchsia',
  PC2: 'Ornamental foliage fuchsia',
  PC3: 'An arrangement of one or more cactus/succulent',
  PC4: 'Flowering pot plant (e.g. orchid, begonias)',
  PC5: 'Pot/container of mixed planting',
  PC6: 'Flower with its own foliage in a frame (provided, one entry per person)',
  // Floral Decoration
  FD1: 'A country garden design in a basket (home-grown flowers and foliage)',
  FD2: 'An all-round hand tied home-grown foliage arrangement (mixed textures, sizes, colours)',
  FD3: '"Anyone for tennis" - accessories allowed (shop bought or home-grown)',
  FD4: 'A soft and romantic arrangement for a wedding table (shop bought or home-grown)',
  FD5: 'A miniature arrangement in a mini jam jar (max 6 inches/15cm)',
  // Photography
  P1: 'June Rose',
  P2: 'Lights, Camera, Action!',
  P3: 'A splash of colour',
  // Home Baking
  H1: 'Mixed fruit loaf cake',
  H2: 'Five strawberry tarts',
  H3: 'Six savoury scones',
  H4: 'Decorated carrot cake',
  H5: 'A jar of strawberry jam',
  H6: 'A jar of marmalade',
  H7: 'A jar of fruit jelly',
  H8: 'Five vegan chocolate cookies',
  // Under 16's
  C1: 'A mini beast using recycled materials',
  C2: 'Mr Potato Head',
  C3: 'Model using flower pots and a tennis ball',
};
