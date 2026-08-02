export interface PuzzleCategory {
  id: string;
  title: string;
  description: string;
  puzzles: Array<{ fen: string; description: string }>;
}

export const PUZZLE_CATEGORIES: PuzzleCategory[] = [
  {
    id: 'fork',
    title: 'Fork Tactics',
    description: 'Attack two enemy pieces at once to win material.',
    puzzles: [
      { fen: 'r3k2r/ppp2ppp/2n5/3N4/3p4/8/PPP2PPP/R3K2R w KQkq - 0 8', description: 'White to move. Find the knight fork winning the rook.' },
      { fen: 'r3k3/2q1pppp/8/8/3N4/8/5PPP/6K1 w - - 0 1', description: 'White to move. Fork king and queen with your knight.' },
      { fen: 'r3k1nr/ppq1nppp/8/3P4/8/5N2/PPP2PPP/R1BQKB1R w KQ - 0 8', description: 'White to move. Advance the pawn to fork two pieces.' },
      { fen: 'r3k2r/ppp3pp/8/8/3b4/8/PPP3PP/R2QK2R w KQkq - 0 9', description: 'White to move. Queen fork wins the bishop.' },
      { fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/4n3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4', description: 'White to move. Win the enemy knight with a fork.' },
      { fen: 'r1b1kb1r/ppp2ppp/2n2q2/3np3/8/2N2N2/PPPPQPPP/R1B1KB1R w KQkq - 2 7', description: 'White to move. Find the royal knight fork.' },
      { fen: 'r2qkb1r/ppp1pppp/2n2n2/3p4/3P4/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 1 5', description: 'White to move. Create a double attack fork.' },
      { fen: 'r2k3r/ppq2ppp/8/8/5N2/8/PPP2PPP/R3K2R w KQ - 0 8', description: 'White to move. Knight fork wins the queen.' },
      { fen: 'r3k2r/ppp2ppp/N1n5/8/3p4/8/PPP2PPP/R3K2R w KQkq - 0 8', description: 'White to move. Find the capture fork.' },
      { fen: 'r3k2r/ppp2ppp/2n5/3Np3/8/8/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Strike with the knight fork.' },
      { fen: 'r3k1r1/pp3ppp/2p1p3/3N4/8/8/PPP2PPP/R3K2R w KQ - 0 8', description: 'White to move. Fork king and rook with the knight.' },
      { fen: 'r2qk2r/ppp2ppp/2n5/1N6/3p4/8/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Knight captures and forks two pieces.' },
      { fen: '2r1k2r/1p3ppp/p1n1p3/3N4/8/8/PPP2PPP/R3R1K1 w k - 0 16', description: 'White to move. Knight fork on c7.' },
      { fen: 'rnbqk2r/pppp1ppp/5n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4', description: 'White to move. Fork with Nd5.' },
      { fen: 'r1bqk2r/ppp2ppp/2n2n2/3pp3/1b1PP3/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 6', description: 'White to move. Central pawn fork.' },
      { fen: 'q3k2r/pp3ppp/2n5/2bN4/8/5P2/PPP3PP/R2QK2R w KQk - 0 13', description: 'White to move. Royal fork with Nc7+.' },
      { fen: 'r2qk2r/pp1b1ppp/2n5/3N4/1P1bn3/5N2/P1P2PPP/R1BQKB1R w KQkq - 0 10', description: 'White to move. Tactical knight fork.' },
      { fen: 'r2q1rk1/ppp2ppp/2np4/2bNp3/2B1P1b1/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 10', description: 'White to move. Fork opportunity in middle game.' }
    ]
  },
  {
    id: 'mate_in_1',
    title: 'Queen Mate in 1',
    description: 'Deliver checkmate in exactly one move with the queen.',
    puzzles: [
      { fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4', description: 'White to move. Deliver checkmate on f7.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/4Q1K1 w - - 0 1', description: 'White to move. Back rank queen checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/1Q4K1 w - - 0 1', description: 'White to move. Back rank queen checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/2Q3K1 w - - 0 1', description: 'White to move. Back rank queen checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/Q5K1 w - - 0 1', description: 'White to move. Back rank queen checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/3Q2K1 w - - 0 1', description: 'White to move. Back rank queen checkmate.' },
      { fen: 'k7/ppp5/8/8/8/8/5PPP/4Q1K1 w - - 0 1', description: 'White to move. King on the edge — mate in 1.' },
      { fen: '1k6/ppp5/8/8/8/8/5PPP/Q5K1 w - - 0 1', description: 'White to move. Corner king — mate in 1.' },
      { fen: '4k3/3ppp2/8/8/8/8/3PPP2/2Q3K1 w - - 0 1', description: 'White to move. Back rank queen mate.' },
      { fen: '4k3/3ppp2/8/8/8/8/3PPP2/3Q2K1 w - - 0 1', description: 'White to move. Back rank queen mate.' },
      { fen: '5k2/4ppp1/8/8/8/8/5PPP/3Q2K1 w - - 0 1', description: 'White to move. King on f8 — mate in 1.' },
      { fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 5', description: 'White to move. Spot checkmate on f7.' },
      { fen: 'r1b1kbnr/pppp1ppp/8/4p3/2B1P2q/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 2 5', description: 'White to move. Queen mate on f7.' },
      { fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3', description: 'Fool\'s mate position — find the instant queen checkmate.' },
      { fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1P3/2N2Q2/PPPP1PPP/R1B1K1NR w KQkq - 2 4', description: 'White to move. Classic Scholar\'s pattern checkmate.' },
      { fen: 'r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 2 5', description: 'White to move. Queen checkmate on f7.' },
      { fen: 'r1bqk2r/pppp1Bpp/2n2n2/4p3/4P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 5', description: 'White to move. Deliver checkmate.' },
      { fen: '3k4/3p4/3Q4/8/8/8/4K3/8 w - - 0 1', description: 'White to move. Queen and King endgame mate in 1.' }
    ]
  },
  {
    id: 'back_rank',
    title: 'Back Rank Charm',
    description: 'Exploit the enemy king trapped behind its own pawns.',
    puzzles: [
      { fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', description: 'White to move. Back rank checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1', description: 'White to move. Back rank checkmate.' },
      { fen: '6k1/5ppp/8/R7/8/8/5PPP/6K1 w - - 0 1', description: 'White to move. Back rank checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/1R4K1 w - - 0 1', description: 'White to move. Back rank checkmate.' },
      { fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', description: 'White to move. Rook to the back rank.' },
      { fen: '6k1/5ppp/2r5/8/8/8/5PPP/4R1K1 w - - 0 1', description: 'White to move. Force checkmate on the back rank.' },
      { fen: '3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', description: 'White to move. Capture and checkmate.' },
      { fen: '5pk1/5ppp/8/8/8/8/1R3PPP/6K1 w - - 0 1', description: 'White to move. Back rank mate.' },
      { fen: 'k7/ppp5/8/8/8/8/5PPP/4R1K1 w - - 0 1', description: 'White to move. Rook seals the back rank.' },
      { fen: '1k6/ppp5/8/8/8/8/5PPP/3R2K1 w - - 0 1', description: 'White to move. Back rank checkmate.' },
      { fen: '3r2k1/p4ppp/1p6/8/8/8/5PPP/4R1K1 w - - 0 1', description: 'White to move. Swing the rook for mate.' },
      { fen: '2r3k1/1p3ppp/8/8/8/8/5PPP/1Q4K1 w - - 0 1', description: 'White to move. Infiltrate back rank with Queen.' },
      { fen: '5rk1/p4p1p/6p1/8/8/8/5PPP/3R2K1 w - - 0 1', description: 'White to move. Exploiting weak f8/g8 back rank.' },
      { fen: '6k1/3r1ppp/8/8/8/8/3R1PPP/6K1 w - - 0 1', description: 'White to move. Trade rooks and deliver back-rank mate.' }
    ]
  },
  {
    id: 'pin_skewer',
    title: 'Pin & Skewer',
    description: 'Pin or skewer enemy pieces to win decisive material.',
    puzzles: [
      { fen: '4q3/5k2/8/8/8/8/8/1B4K1 w - - 0 1', description: 'White to move. Skewer king and queen with your bishop.' },
      { fen: 'r7/8/8/k7/8/8/8/6RK w - - 0 1', description: 'White to move. Skewer king and rook with your rook.' },
      { fen: 'rn1qk2r/ppp2ppp/3b1n2/3p4/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 2 6', description: 'White to move. Pin the enemy knight.' },
      { fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4', description: 'White to move. Create a deadly pin on f7.' },
      { fen: 'r2q1rk1/ppp2npp/2n5/4p3/2B1P3/2N2N2/PPP2PPP/R2QK2R w KQ - 0 8', description: 'White to move. Attack the pinned knight.' },
      { fen: '6k1/4bppp/8/8/4B3/8/5PPP/6K1 w - - 0 1', description: 'White to move. Bishop skewer wins material.' },
      { fen: '4r1k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', description: 'White to move. Pin the rook against the king.' },
      { fen: 'r3k2r/ppp2ppp/2n5/3q4/3P4/2N5/PPP2PPP/R2QK2R w KQkq - 0 10', description: 'White to move. Win the queen with a pin tactic.' },
      { fen: '3r2k1/ppp2ppp/8/8/8/2B5/PPP2PPP/4R1K1 w - - 0 1', description: 'White to move. Pin the defender.' },
      { fen: 'r1b1k2r/pppp1ppp/2n5/4p3/2B1Pq2/3P1N2/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Skewer along the diagonal.' }
    ]
  },
  {
    id: 'discovered',
    title: 'Discovered Attack',
    description: 'Move one piece to unleash a hidden attack behind it.',
    puzzles: [
      { fen: '4k3/3N4/2B5/8/8/8/8/4K3 w - - 0 1', description: 'White to move. Deliver a discovered double check.' },
      { fen: 'r1b1k2r/pppp1ppp/8/4q3/8/2N5/PPP2PPP/R2QKB1R w KQkq - 0 9', description: 'White to move. Discover an attack on the queen.' },
      { fen: 'rnbqk2r/pppp1ppp/5n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4', description: 'White to move. Uncover a surprise attack.' },
      { fen: 'r3k2r/ppp2ppp/2n5/3pN3/8/2B5/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Move the knight to reveal the bishop.' },
      { fen: 'r1b1k1r1/pppp1ppp/2n5/4q3/4P3/2NB4/PPP2PPP/R2QK2R w KQq - 0 8', description: 'White to move. Discovered attack wins the queen.' },
      { fen: 'r2qk2r/ppp2ppp/2n5/3pP3/1b1P4/2N2N2/PPP2PPP/R2QKB1R w KQkq - 0 8', description: 'White to move. Discovered attack with e6.' },
      { fen: 'r1bqk2r/ppp2ppp/2n5/3np3/2B5/3P1N2/PPP2PPP/R1BQK2R w KQkq - 0 8', description: 'White to move. Unmask the bishop attack.' }
    ]
  }
];

// Track recent puzzles to prevent immediate repetitive draws
const recentPuzzleIndices: Record<string, number[]> = {};

export function getRandomPuzzleForCategory(categoryId: string) {
  const cat = PUZZLE_CATEGORIES.find((c) => c.id === categoryId) || PUZZLE_CATEGORIES[0];
  if (!recentPuzzleIndices[cat.id]) {
    recentPuzzleIndices[cat.id] = [];
  }
  
  const recent = recentPuzzleIndices[cat.id];
  // Find indices that haven't been shown recently
  const availableIndices = cat.puzzles
    .map((_, i) => i)
    .filter(i => !recent.includes(i));
    
  let chosenIndex: number;
  if (availableIndices.length > 0) {
    chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  } else {
    // Reset recent history if all have been shown
    recentPuzzleIndices[cat.id] = [];
    chosenIndex = Math.floor(Math.random() * cat.puzzles.length);
  }
  
  // Track this index in recent list (keep last 50% of pool size)
  recent.push(chosenIndex);
  if (recent.length > Math.floor(cat.puzzles.length / 2)) {
    recent.shift();
  }

  const puzzleData = cat.puzzles[chosenIndex];
  return {
    id: `${cat.id}_${Date.now()}_${chosenIndex}`,
    title: cat.title,
    description: puzzleData.description,
    fen: puzzleData.fen,
    categoryId: cat.id
  };
}
