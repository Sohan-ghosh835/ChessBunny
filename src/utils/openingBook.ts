export interface ChessOpening {
  name: string;
  eco: string;
}

const openingsMap: Record<string, ChessOpening> = {
  'e4 e5': { name: 'King\'s Pawn Game', eco: 'C20' },
  'e4 e5 Nf3 Nc6': { name: 'King\'s Knight Opening', eco: 'C44' },
  'e4 e5 Nf3 Nc6 Bc4': { name: 'Italian Game', eco: 'C50' },
  'e4 e5 Nf3 Nc6 Bb5': { name: 'Ruy Lopez', eco: 'C60' },
  'e4 c5': { name: 'Sicilian Defense', eco: 'B20' },
  'e4 e6': { name: 'French Defense', eco: 'C00' },
  'e4 c6': { name: 'Caro-Kann Defense', eco: 'B10' },
  'd4 d5': { name: 'Queen\'s Pawn Game', eco: 'D00' },
  'd4 d5 c4': { name: 'Queen\'s Gambit', eco: 'D06' },
  'd4 Nf6': { name: 'Indian Defense', eco: 'A45' },
  'd4 Nf6 c4 g6': { name: 'King\'s Indian Defense', eco: 'E60' },
  'c4': { name: 'English Opening', eco: 'A10' },
  'Nf3': { name: 'Reti Opening', eco: 'A04' }
};

export function getOpeningName(history: string[]): string {
  if (!history || history.length === 0) return 'Standard Start';
  
  const moveStr = history.slice(0, 4).join(' ');
  
  for (let len = 4; len >= 1; len--) {
    const subStr = history.slice(0, len).join(' ');
    if (openingsMap[subStr]) {
      return `${openingsMap[subStr].name} (${openingsMap[subStr].eco})`;
    }
  }

  return 'Custom Game';
}
