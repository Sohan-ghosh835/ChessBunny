import { Chess, Square } from 'chess.js';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface EvalResult {
  score: number; // Positive = White winning, Negative = Black winning
  bestMove: string | null;
  evaluationText: string;
}

export interface ReviewMoveAnalysis {
  move: string;
  fen: string;
  classification: 'brilliant' | 'great' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  evalDelta: number;
  player: 'w' | 'b';
}

// Piece-Square Tables (8x8 arrays from White's perspective; inverted for Black)
const pawnPST: number[][] = [
  [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
  [0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5],
  [0.1,  0.1,  0.2,  0.3,  0.3,  0.2,  0.1,  0.1],
  [0.05, 0.05, 0.1,  0.25, 0.25, 0.1,  0.05, 0.05],
  [0.0,  0.0,  0.0,  0.2,  0.2,  0.0,  0.0,  0.0],
  [0.05,-0.05,-0.1,  0.0,  0.0, -0.1, -0.05, 0.05],
  [0.05, 0.1,  0.1, -0.2, -0.2,  0.1,  0.1,  0.05],
  [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

const knightPST: number[][] = [
  [-0.5, -0.4, -0.3, -0.3, -0.3, -0.3, -0.4, -0.5],
  [-0.4, -0.2,  0.0,  0.0,  0.0,  0.0, -0.2, -0.4],
  [-0.3,  0.0,  0.1,  0.15, 0.15, 0.1,  0.0, -0.3],
  [-0.3,  0.05, 0.15, 0.2,  0.2,  0.15, 0.05,-0.3],
  [-0.3,  0.0,  0.15, 0.2,  0.2,  0.15, 0.0, -0.3],
  [-0.3,  0.05, 0.1,  0.15, 0.15, 0.1,  0.05,-0.3],
  [-0.4, -0.2,  0.0,  0.05, 0.05, 0.0, -0.2, -0.4],
  [-0.5, -0.4, -0.3, -0.3, -0.3, -0.3, -0.4, -0.5]
];

const bishopPST: number[][] = [
  [-0.2, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.2],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.1,  0.15, 0.15, 0.1,  0.0, -0.1],
  [-0.1,  0.05, 0.1,  0.2,  0.2,  0.1,  0.05,-0.1],
  [-0.1,  0.0,  0.15, 0.2,  0.2,  0.15, 0.0, -0.1],
  [-0.1,  0.1,  0.1,  0.1,  0.1,  0.1,  0.1, -0.1],
  [-0.1,  0.15, 0.0,  0.0,  0.0,  0.0,  0.15,-0.1],
  [-0.2, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.2]
];

const rookPST: number[][] = [
  [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
  [ 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [ 0.0,  0.0,  0.0,  0.15, 0.15, 0.1,  0.0,  0.0]
];

const queenPST: number[][] = [
  [-0.2, -0.1, -0.1, -0.05,-0.05,-0.1, -0.1, -0.2],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.1,  0.0,  0.05, 0.05, 0.05, 0.05, 0.0, -0.1],
  [-0.05, 0.0,  0.05, 0.1,  0.1,  0.05, 0.0, -0.05],
  [ 0.0,  0.0,  0.05, 0.1,  0.1,  0.05, 0.0,  0.0],
  [-0.1,  0.05, 0.05, 0.05, 0.05, 0.05, 0.0, -0.1],
  [-0.1,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.1],
  [-0.2, -0.1, -0.1, -0.05,-0.05,-0.1, -0.1, -0.2]
];

// Middlegame King: HUGE penalties for stepping into enemy ranks when queens/rooks are active!
const kingMiddlegamePST: number[][] = [
  [ 0.2,  0.3,  0.1,  0.0,  0.0,  0.1,  0.3,  0.2],
  [ 0.2,  0.2,  0.0,  0.0,  0.0,  0.0,  0.2,  0.2],
  [-0.3, -0.5, -0.6, -0.8, -0.8, -0.6, -0.5, -0.3],
  [-0.8, -1.2, -1.5, -2.0, -2.0, -1.5, -1.2, -0.8],
  [-1.5, -2.2, -2.8, -3.5, -3.5, -2.8, -2.2, -1.5],
  [-2.2, -3.2, -4.0, -5.0, -5.0, -4.0, -3.2, -2.2],
  [-3.0, -4.0, -5.0, -6.0, -6.0, -5.0, -4.0, -3.0],
  [-3.5, -4.5, -5.5, -7.0, -7.0, -5.5, -4.5, -3.5]
];

class StockfishService {
  private pieceValues: Record<string, number> = {
    p: 1.0,
    n: 3.15,
    b: 3.35,
    r: 5.0,
    q: 9.25,
    k: 0.0
  };

  private getPSTValue(pieceType: string, color: 'w' | 'b', r: number, c: number): number {
    const tableMap: Record<string, number[][]> = {
      p: pawnPST,
      n: knightPST,
      b: bishopPST,
      r: rookPST,
      q: queenPST,
      k: kingMiddlegamePST
    };

    const table = tableMap[pieceType];
    if (!table) return 0;

    // Table is defined from White's perspective (rank 0 = top of array = 8th rank)
    const row = color === 'w' ? r : 7 - r;
    return table[row][c];
  }

  // Static Position Evaluation
  public evaluatePosition(chess: Chess): number {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? -999 : 999;
    }
    if (chess.isDraw()) {
      return 0;
    }

    let score = 0;
    const board = chess.board();

    // Check penalty/bonus
    if (chess.inCheck()) {
      score += chess.turn() === 'w' ? -0.8 : 0.8;
    }

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          const val = this.pieceValues[piece.type] || 0;
          const pst = this.getPSTValue(piece.type, piece.color, r, c);
          const totalVal = val + pst;

          if (piece.color === 'w') {
            score += totalVal;
          } else {
            score -= totalVal;
          }
        }
      }
    }

    return Number(score.toFixed(2));
  }

  // Varied opening book for Black — maps fen move count to a set of opening options
  // Returns a SAN move string if we're in the opening, or null to fall through to minimax
  private getOpeningBookMove(chess: Chess): string | null {
    const history = chess.history();
    const moveCount = history.length;
    if (moveCount > 4) return null; // Only guide first 2 moves for each side

    const lastWhiteMove = history[history.length - 1] || '';

    // Black's first move response (history.length === 1 = White just played move 1)
    if (moveCount === 1) {
      const responses: Record<string, string[]> = {
        'e4':  ['e5', 'c5', 'e6', 'c6', 'd5', 'g6'],
        'd4':  ['d5', 'Nf6', 'e6', 'f5', 'g6', 'c5'],
        'c4':  ['e5', 'c5', 'Nf6', 'e6', 'g6'],
        'Nf3': ['d5', 'Nf6', 'c5', 'e6', 'g6'],
        'g3':  ['d5', 'Nf6', 'c5', 'e5'],
        'b3':  ['e5', 'd5', 'Nf6'],
        'f4':  ['d5', 'e5', 'Nf6', 'c5'],
      };
      const options = responses[lastWhiteMove] || ['e5', 'd5', 'c5', 'Nf6', 'e6'];
      const moves = chess.moves();
      const valid = options.filter(m => moves.includes(m));
      if (valid.length > 0) return valid[Math.floor(Math.random() * valid.length)];
    }

    // Black's second move response (history.length === 3 = White just played move 2)
    if (moveCount === 3) {
      const blackFirst = history[1]; // Black's first move
      const secondMoveOptions: Record<string, string[]> = {
        'e5':  ['Nf6', 'Nc6', 'd6', 'Bc5', 'Nf6', 'f5'],
        'c5':  ['Nc6', 'd6', 'e6', 'Nf6', 'a6', 'g6'],
        'd5':  ['Nf6', 'e6', 'Bf5', 'c6', 'Nc6'],
        'e6':  ['d5', 'Nf6', 'c5', 'Be7'],
        'c6':  ['d5', 'Nf6', 'e5'],
        'g6':  ['Bg7', 'd5', 'Nf6', 'c5'],
        'Nf6': ['g6', 'e6', 'd5', 'c5', 'd6'],
        'f5':  ['Nf6', 'd6', 'e6'],
      };
      const options = secondMoveOptions[blackFirst] || ['Nf6', 'd6', 'e6', 'Nc6', 'Be7'];
      const moves = chess.moves();
      const valid = options.filter(m => moves.includes(m));
      if (valid.length > 0) return valid[Math.floor(Math.random() * valid.length)];
    }

    return null;
  }

  // Get Best Move for AI — fully differentiated by difficulty level
  public getBestMove(chess: Chess, difficulty: DifficultyLevel): Promise<{ from: string; to: string; promotion?: string }> {
    return new Promise((resolve) => {
      const moves = chess.moves({ verbose: true });
      if (moves.length === 0) return;

      // Snappy human-like thinking delays
      const delayMap: Record<DifficultyLevel, number> = {
        easy:   250,
        medium: 350,
        hard:   450,
        expert: 550
      };

      // Search depths
      const depthMap: Record<DifficultyLevel, number> = {
        easy:   1,
        medium: 2,
        hard:   3,
        expert: 3
      };

      setTimeout(() => {
        // ── EASY (≈800 elo) ─────────────────────────────────────────────────
        // Plays a fully random move 55% of the time. Never uses opening book.
        // Occasionally throws away winning captures.
        if (difficulty === 'easy') {
          if (Math.random() < 0.55) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            return resolve({ from: randomMove.from, to: randomMove.to, promotion: randomMove.promotion });
          }
          // Other 45% — look 1 move deep but with 20% chance of ignoring the best capture
          const candidates = this.orderMovesStatic(moves);
          const ignoreCapture = Math.random() < 0.20;
          const pool = ignoreCapture ? candidates.filter(m => !m.captured) : candidates;
          const chosen = (pool.length > 0 ? pool : candidates)[0];
          return resolve({ from: chosen.from, to: chosen.to, promotion: chosen.promotion });
        }

        // ── MEDIUM (≈1300 elo) ──────────────────────────────────────────────
        // Uses opening book for first 2 moves. Plays random 15% of the time.
        // Searches 2 moves deep.
        if (difficulty === 'medium') {
          if (Math.random() < 0.15) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            return resolve({ from: randomMove.from, to: randomMove.to, promotion: randomMove.promotion });
          }
          // Opening book
          const bookMoveSAN = this.getOpeningBookMove(chess);
          if (bookMoveSAN) {
            const verboseMove = moves.find(m => m.san === bookMoveSAN);
            if (verboseMove) return resolve({ from: verboseMove.from, to: verboseMove.to, promotion: verboseMove.promotion });
          }
        }

        // ── HARD (≈1800 elo) & EXPERT (≈2300 elo) ──────────────────────────
        // Both use the full opening book. Hard has 3% random, expert 0%.
        if (difficulty === 'hard' && Math.random() < 0.03) {
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          return resolve({ from: randomMove.from, to: randomMove.to, promotion: randomMove.promotion });
        }

        // Opening book for hard/expert
        if (difficulty === 'hard' || difficulty === 'expert') {
          const bookMoveSAN = this.getOpeningBookMove(chess);
          if (bookMoveSAN) {
            const verboseMove = moves.find(m => m.san === bookMoveSAN);
            if (verboseMove) return resolve({ from: verboseMove.from, to: verboseMove.to, promotion: verboseMove.promotion });
          }
        }

        // Minimax for medium/hard/expert
        const depth = depthMap[difficulty];
        const isWhite = chess.turn() === 'w';
        const orderedMoves = this.orderMovesStatic(moves);
        let bestMove = orderedMoves[0];
        let bestVal = isWhite ? -Infinity : Infinity;

        for (const move of orderedMoves) {
          chess.move(move);
          const val = this.minimax(chess, depth - 1, -Infinity, Infinity, !isWhite);
          chess.undo();
          if (isWhite ? val > bestVal : val < bestVal) {
            bestVal = val;
            bestMove = move;
          }
        }

        resolve({ from: bestMove.from, to: bestMove.to, promotion: bestMove.promotion });
      }, delayMap[difficulty]);
    });
  }

  // Pure static move ordering — NO chess.move/undo calls. Uses MVV-LVA + flags only.
  private orderMovesStatic(moves: any[]): any[] {
    return moves.slice().sort((a, b) => {
      return this.moveScore(b) - this.moveScore(a);
    });
  }

  private moveScore(move: any): number {
    let score = 0;
    // Captures: MVV-LVA — prioritise taking high-value pieces with low-value pieces
    if (move.captured) {
      const victimVal = this.pieceValues[move.captured] || 1;
      const attackerVal = this.pieceValues[move.piece] || 1;
      score += 10 * victimVal - attackerVal + 100; // Always positive bonus
    }
    // Promotions
    if (move.promotion) score += 90;
    // Checks (SAN contains '+')
    if (move.san && move.san.includes('+')) score += 50;
    return score;
  }

  private minimax(chess: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
    if (chess.isGameOver()) return this.evaluatePosition(chess);
    if (depth === 0) return this.evaluatePosition(chess);

    const rawMoves = chess.moves({ verbose: true });
    // Use static ordering inside minimax — fast, no board mutation
    const moves = this.orderMovesStatic(rawMoves);

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalVal = this.minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        maxEval = Math.max(maxEval, evalVal);
        alpha = Math.max(alpha, evalVal);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalVal = this.minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        minEval = Math.min(minEval, evalVal);
        beta = Math.min(beta, evalVal);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }

  // Get Hint for Human Player
  public async getHint(chess: Chess): Promise<{ from: string; to: string; san: string } | null> {
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return null;

    const moveObj = await this.getBestMove(chess, 'expert');
    const fullMove = moves.find(m => m.from === moveObj.from && m.to === moveObj.to);
    if (!fullMove) return null;

    return {
      from: fullMove.from,
      to: fullMove.to,
      san: fullMove.san
    };
  }

  // Full Game Review Analysis — works for any game length including puzzles
  public analyzeGame(
    history: string[],
    userColor: 'w' | 'b' = 'w',
    gameOverResult?: { winner: 'w' | 'b' | 'draw' | null; reason: string },
    startingFen?: string
  ): {
    accuracy: number;
    whiteAccuracy: number;
    blackAccuracy: number;
    moves: ReviewMoveAnalysis[];
    summaryText: string;
    brilliantCount: number;
    greatCount: number;
    goodCount: number;
    inaccuracyCount: number;
    mistakeCount: number;
    blunderCount: number;
  } {
    if (!history || history.length === 0) {
      return {
        accuracy: 100, whiteAccuracy: 100, blackAccuracy: 100,
        moves: [], summaryText: 'No moves to review yet',
        brilliantCount: 0, greatCount: 0, goodCount: 0,
        inaccuracyCount: 0, mistakeCount: 0, blunderCount: 0
      };
    }

    const tempChess = new Chess();
    // Load the puzzle/custom starting position if provided
    if (startingFen) {
      try { tempChess.load(startingFen); } catch (_) { /* fallback to default */ }
    }
    // Determine side-to-move offset based on starting FEN
    const startTurn = tempChess.turn(); // 'w' or 'b'
    const analyses: ReviewMoveAnalysis[] = [];
    let prevEval = this.evaluatePosition(tempChess);
    const whiteAccuracies: number[] = [];
    const blackAccuracies: number[] = [];

    history.forEach((sanMove, index) => {
      // Derive the correct colour based on actual starting turn, not always white
      const moveColor: 'w' | 'b' = (startTurn === 'w') ? (index % 2 === 0 ? 'w' : 'b') : (index % 2 === 0 ? 'b' : 'w');

      // Capture material before move
      const boardBefore = tempChess.board();
      let pieceValBefore = 0;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = boardBefore[r][c];
          if (p && p.color === moveColor) pieceValBefore += this.pieceValues[p.type] || 0;
        }
      }

      // Apply move — skip if invalid
      const result = tempChess.move(sanMove);
      if (!result) return;

      const currentEval = this.evaluatePosition(tempChess);

      // Material after move for brilliant detection
      const boardAfter = tempChess.board();
      let pieceValAfter = 0;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = boardAfter[r][c];
          if (p && p.color === moveColor) pieceValAfter += this.pieceValues[p.type] || 0;
        }
      }

      // Eval delta from the moving player's perspective
      const evalDelta = moveColor === 'w'
        ? (currentEval - prevEval)
        : (prevEval - currentEval);

      // Eval loss: how much did this move cost?
      const evalLoss = Math.max(0, -evalDelta);
      const sacrificedMaterial = pieceValBefore - pieceValAfter;

      // ── Classification thresholds (tighter than before) ──────────────────
      // Blunder:     ≥ 2.0 pawn loss
      // Mistake:     ≥ 0.9 pawn loss
      // Inaccuracy:  ≥ 0.35 pawn loss
      // Good:        ≥ 0 (neutral/slight improvement)
      // Great:       eval gain ≥ 0.6
      // Brilliant:   voluntary piece sacrifice with strong position maintained
      let classification: ReviewMoveAnalysis['classification'] = 'good';

      if (evalLoss >= 2.0) {
        classification = 'blunder';
      } else if (evalLoss >= 0.9) {
        classification = 'mistake';
      } else if (evalLoss >= 0.35) {
        classification = 'inaccuracy';
      } else if (sacrificedMaterial >= 2.0 && evalLoss <= 0.2 && evalDelta >= -0.3) {
        // Genuine sacrifice: gave up ≥2 pawns of material but position improved/held
        classification = 'brilliant';
      } else if (evalDelta >= 0.6) {
        classification = 'great';
      } else {
        classification = 'good';
      }

      analyses.push({
        move: sanMove,
        fen: tempChess.fen(),
        classification,
        evalDelta: parseFloat(evalDelta.toFixed(2)),
        player: moveColor
      });

      // Per-player accuracy scoring using win probability formula
      const moveScore = evalLoss <= 0
        ? 100
        : Math.max(0, Math.round(100 * Math.exp(-0.5 * evalLoss)));

      if (moveColor === 'w') whiteAccuracies.push(moveScore);
      else blackAccuracies.push(moveScore);

      prevEval = currentEval;
    });

    const avg = (arr: number[]) =>
      arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 100;

    const whiteAccuracy = avg(whiteAccuracies);
    const blackAccuracy = avg(blackAccuracies);
    const accuracy = userColor === 'w' ? whiteAccuracy : blackAccuracy;

    // Move type counts for the reviewing player
    const userMoves = analyses.filter(m => m.player === userColor);
    const brilliantCount  = userMoves.filter(m => m.classification === 'brilliant').length;
    const greatCount      = userMoves.filter(m => m.classification === 'great').length;
    const goodCount       = userMoves.filter(m => m.classification === 'good').length;
    const inaccuracyCount = userMoves.filter(m => m.classification === 'inaccuracy').length;
    const mistakeCount    = userMoves.filter(m => m.classification === 'mistake').length;
    const blunderCount    = userMoves.filter(m => m.classification === 'blunder').length;

    // Generate contextual summary
    const winner = gameOverResult?.winner;
    let summaryText = '';
    const isPuzzle = history.length <= 6; // Short game = likely a puzzle

    if (isPuzzle) {
      if (accuracy >= 90) summaryText = 'Excellent puzzle solving! Sharp tactical vision';
      else if (accuracy >= 70) summaryText = 'Good puzzle attempt! Study the best line';
      else summaryText = 'Tricky position — review the solution and try again';
    } else if (winner === userColor) {
      if (accuracy >= 85) summaryText = 'Victorious with precision! Master-level control';
      else if (accuracy >= 70) summaryText = 'Great victory! Strong tactical play';
      else summaryText = 'Won despite some errors — nice resilience!';
    } else if (winner && winner !== 'draw' && winner !== userColor) {
      if (accuracy >= 80) summaryText = 'Tough loss despite good play — keep fighting';
      else if (accuracy >= 65) summaryText = 'Close game — reduce blunders to improve';
      else summaryText = 'Tough match — study the key mistakes to grow!';
    } else if (winner === 'draw') {
      summaryText = accuracy >= 80 ? 'Solid draw! Great defensive play' : 'Balanced game ending in a draw';
    } else {
      if (accuracy >= 85) summaryText = 'Outstanding precision! Grandmaster-level moves';
      else if (accuracy >= 70) summaryText = 'Great strategic vision! Keep it up';
      else summaryText = 'Nice game! Work on reducing inaccuracies';
    }

    return {
      accuracy, whiteAccuracy, blackAccuracy,
      moves: analyses,
      summaryText,
      brilliantCount, greatCount, goodCount,
      inaccuracyCount, mistakeCount, blunderCount
    };
  }
}

export const stockfishService = new StockfishService();
