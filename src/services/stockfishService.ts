import { Chess } from 'chess.js';

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
}

class StockfishService {
  private pieceValues: Record<string, number> = {
    p: 1,
    n: 3,
    b: 3.2,
    r: 5,
    q: 9,
    k: 0
  };

  // Evaluate FEN board position statically
  public evaluatePosition(chess: Chess): number {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? -99 : 99;
    }
    if (chess.isDraw()) {
      return 0;
    }

    let score = 0;
    const board = chess.board();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          let val = this.pieceValues[piece.type] || 0;
          // Small positional bonus for center control (d4, d5, e4, e5)
          if ((r === 3 || r === 4) && (c === 3 || c === 4)) {
            val += 0.25;
          }
          if (piece.color === 'w') {
            score += val;
          } else {
            score -= val;
          }
        }
      }
    }

    return Number(score.toFixed(1));
  }

  // Get Best Move for AI
  public getBestMove(chess: Chess, difficulty: DifficultyLevel): Promise<{ from: string; to: string; promotion?: string }> {
    return new Promise((resolve) => {
      const moves = chess.moves({ verbose: true });
      if (moves.length === 0) {
        return;
      }

      // Thinking delay simulation based on difficulty
      const delayMap: Record<DifficultyLevel, number> = {
        easy: 400,
        medium: 700,
        hard: 1000,
        expert: 1200
      };

      setTimeout(() => {
        if (difficulty === 'easy') {
          // 40% random, 60% capture/good move
          if (Math.random() < 0.4) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            return resolve({ from: randomMove.from, to: randomMove.to, promotion: randomMove.promotion });
          }
        }

        // Minimax depth selection
        const depthMap: Record<DifficultyLevel, number> = {
          easy: 1,
          medium: 2,
          hard: 3,
          expert: 4
        };

        const depth = depthMap[difficulty];
        let bestMove = moves[0];
        let bestVal = chess.turn() === 'w' ? -Infinity : Infinity;

        // Minimax evaluation
        for (const move of moves) {
          chess.move(move);
          const val = this.minimax(chess, depth - 1, -Infinity, Infinity, chess.turn() === 'w');
          chess.undo();

          if (chess.turn() === 'w') {
            if (val > bestVal) {
              bestVal = val;
              bestMove = move;
            }
          } else {
            if (val < bestVal) {
              bestVal = val;
              bestMove = move;
            }
          }
        }

        resolve({ from: bestMove.from, to: bestMove.to, promotion: bestMove.promotion });
      }, delayMap[difficulty]);
    });
  }

  private minimax(chess: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
    if (depth === 0 || chess.isGameOver()) {
      return this.evaluatePosition(chess);
    }

    const moves = chess.moves({ verbose: true });

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

  // Full Game Review Analysis
  public analyzeGame(history: string[]): { accuracy: number; moves: ReviewMoveAnalysis[] } {
    const tempChess = new Chess();
    const analyses: ReviewMoveAnalysis[] = [];
    let prevEval = 0;
    let totalBlunders = 0;
    let totalMistakes = 0;
    let totalBrilliants = 0;

    history.forEach((sanMove) => {
      tempChess.move(sanMove);
      const currentEval = this.evaluatePosition(tempChess);
      const evalDelta = Math.abs(currentEval - prevEval);

      let classification: ReviewMoveAnalysis['classification'] = 'good';
      if (evalDelta >= 3.0) {
        classification = 'blunder';
        totalBlunders++;
      } else if (evalDelta >= 1.5) {
        classification = 'mistake';
        totalMistakes++;
      } else if (evalDelta >= 0.8) {
        classification = 'inaccuracy';
      } else if (evalDelta < 0.2 && (sanMove.includes('x') || sanMove.includes('+'))) {
        classification = 'brilliant';
        totalBrilliants++;
      }

      analyses.push({
        move: sanMove,
        fen: tempChess.fen(),
        classification,
        evalDelta
      });

      prevEval = currentEval;
    });

    const accuracy = Math.max(45, Math.min(98, Math.round(100 - (totalBlunders * 12 + totalMistakes * 5) / (history.length || 1))));

    return {
      accuracy,
      moves: analyses
    };
  }
}

export const stockfishService = new StockfishService();
