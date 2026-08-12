import { Chess } from 'chess.js';
import { stockfishService } from './stockfishService';

class BunnyCoachService {
  public async askCoachAdvice(fen: string, pgn: string, lastMove: string, isBotMatch: boolean): Promise<string> {
    if (!isBotMatch) {
      return "Bunny Coach: I'm only active during Bot matches! Click me anytime while playing against the AI.";
    }

    try {
      const chess = new Chess(fen);
      const evalScore = stockfishService.evaluatePosition(chess);
      const bestMove = await stockfishService.getBestMove(chess, 'hard');

      const isWhiteTurn = chess.turn() === 'w';
      const sideName = isWhiteTurn ? 'White' : 'Black';

      let evalMessage = '';
      if (Math.abs(evalScore) < 0.5) {
        evalMessage = "The position is balanced right now.";
      } else if ((isWhiteTurn && evalScore > 1.5) || (!isWhiteTurn && evalScore < -1.5)) {
        evalMessage = `${sideName} has a clear position advantage! Keep building up piece coordination.`;
      } else if ((isWhiteTurn && evalScore < -1.5) || (!isWhiteTurn && evalScore > 1.5)) {
        evalMessage = `${sideName} is under some pressure, stay calm and defend key squares!`;
      } else {
        evalMessage = "It's a battle with opportunities for both sides!";
      }

      let moveSuggestion = '';
      if (bestMove) {
        moveSuggestion = `Bunny Engine suggests looking at move **${(bestMove as any).san || `${bestMove.from} ➔ ${bestMove.to}`}** for tactical play.`;
      } else {
        moveSuggestion = "Control the center and keep your King safe!";
      }

      const advice = `Bunny Coach: ${evalMessage} ${moveSuggestion}`;
      return advice;
    } catch (err) {
      return "Bunny Coach: Stay focused on key center squares and protect your valuable pieces!";
    }
  }
}

export const bunnyCoachService = new BunnyCoachService();
