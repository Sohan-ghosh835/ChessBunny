export const WINNING_QUOTES: string[] = [
  "That was such a beautiful game baby. Your brain is honestly terrifyingly attractive <3",
  "You didn’t just win that match, you completely outsmarted. I’m so proud of my brilliant girl.",
  "Watching you play is honestly unfair, how can someone be this pretty AND this smart?",
  "That final move was so you, calm, clever, and absolutely devastating.",
  "I knew you were going to win. I just didn’t know you’d make it look that easy.",
  "My girl really looked at the board, calculated everything, and chose violence.",
  "You played that game like you already knew how it was going to end. That confidence looks ridiculously good on you.",
  "I’m officially running out of ways to tell you how proud I am of you. You were incredible today.",
  "Your opp brought a chessboard, but you brought a whole strategy. Good Girl!!",
  "That wasn’t just a win, sweetheart. That was a masterclass. I’m lucky I get to call you mine.",
  "I love seeing you get that little victorious smile after winning. It might be my favorite thing ever.",
  "You know what’s dangerous? You being this cute while simultaneously destroying people on a chessboard.",
  "Every time you win, I somehow fall for you a little harder. Stop being so impressive babygirl.",
  "You were so composed the whole game. Meanwhile I’m over here being ridiculously proud of you.",
  "Checkmate looks really good on you, baby.",
  "You didn’t just beat your opps, you made them question every decision they’ve ever made.",
  "Brains, confidence, patience, and that smile after a win, yeah, I’m definitely obsessed with you.",
  "I hope you know how genuinely proud I am whenever I see you accomplish something like this. You’re amazing, love.",
  "Another match, another reminder that my girlfriend is ridiculously talented. Keep winning, superstar.",
  "Congratulations, my love. You played brilliantly, you fought till the end, and you earned that win. Now come here and let me celebrate my champion."
];

export const LOSING_QUOTES: string[] = [
  "Hey baby, it’s okay. One loss doesn’t change how insanely proud I am of you.",
  "You didn’t play badly, you just had one game that didn’t go your way. You’re still my brilliant girl.",
  "I know losing sucks, especially when you really wanted that win. Come here, let me make you feel better.",
  "One match doesn’t define how good you are, baby. I’ve seen what you can do, and I know how talented you are.",
  "I know you’re probably upset with yourself right now, but please don’t be too hard on my girl. You gave it your best.",
  "Your opponent won the game, not you being any less amazing. Remember that, okay?",
  "It’s just one loss, sweetheart. You’ll learn from it, come back stronger, and absolutely destroy the next one.",
  "I wish you could see yourself the way I see you, because even after a loss, I’m still sitting here thinking how incredible you are.",
  "Hey babygirl, no sad face. You’re allowed to lose sometimes. Even champions have bad games.",
  "I know you wanted this one badly, and I’m sorry it didn’t go your way. But I’m still ridiculously proud of you.",
  "Losing one chess game doesn’t erase every brilliant move you’ve made before. You’re still my little chess genius.",
  "Don’t let one match make you doubt yourself. You’re smart, you’re improving, and you’re going to bounce back.",
  "I know that loss hurts, but I promise this isn’t the end of your story. Next game is another chance to show them what you can do.",
  "Come here, baby. No analyzing every single mistake right now. You played, you fought, and that’s enough for today.",
  "You know what I see when you lose? The same girl I’m completely obsessed with. A score on a board can’t change that.",
  "Maybe you lost the match, but you definitely didn’t lose my respect or how proud I am of you.",
  "I know you’re disappointed, love, but I also know you’re going to learn from this and come back even better.",
  "Don’t worry, my brilliant girl. We’ll call this one a character development episode and get you ready for the next win.",
  "It’s okay to be upset for a little while. Just don’t forget that I’m still here, still proud of you, and still your biggest fan.",
  "Come here, my love. Forget the result for a bit. You’re still my champion, and one little loss could never change that."
];

export const DRAW_QUOTES: string[] = [
  "A hard-fought draw, baby! You stood your ground brilliantly.",
  "Evenly matched, sweetheart! Your resilience and defense were amazing.",
  "A tie! You played with so much heart and intellect today, love."
];

export const getRandomWinningQuote = (): string => {
  const index = Math.floor(Math.random() * WINNING_QUOTES.length);
  return WINNING_QUOTES[index];
};

export const getRandomLosingQuote = (): string => {
  const index = Math.floor(Math.random() * LOSING_QUOTES.length);
  return LOSING_QUOTES[index];
};

export const getRandomDrawQuote = (): string => {
  const index = Math.floor(Math.random() * DRAW_QUOTES.length);
  return DRAW_QUOTES[index];
};

export interface MatchQuoteResult {
  userQuote?: string;
  userStatus?: 'win' | 'lose' | 'draw';

  whiteQuote?: string;
  whiteStatus?: 'win' | 'lose' | 'draw';
  blackQuote?: string;
  blackStatus?: 'win' | 'lose' | 'draw';
}

export const getMatchQuotes = (
  mode: string,
  winner: 'w' | 'b' | 'draw' | null,
  playerColor: 'w' | 'b' = 'w'
): MatchQuoteResult => {
  if (mode === 'ai' || mode === 'puzzle') {
    const humanColor = playerColor || 'w';

    if (winner === 'draw') {
      return {
        userQuote: getRandomDrawQuote(),
        userStatus: 'draw'
      };
    } else if (winner === humanColor) {
      return {
        userQuote: getRandomWinningQuote(),
        userStatus: 'win'
      };
    } else {
      return {
        userQuote: getRandomLosingQuote(),
        userStatus: 'lose'
      };
    }
  }

  if (mode === 'local') {
    if (winner === 'draw') {
      return {
        whiteQuote: getRandomDrawQuote(),
        whiteStatus: 'draw',
        blackQuote: getRandomDrawQuote(),
        blackStatus: 'draw'
      };
    }

    const whiteStatus = winner === 'w' ? 'win' : 'lose';
    const blackStatus = winner === 'b' ? 'win' : 'lose';

    return {
      whiteQuote: whiteStatus === 'win' ? getRandomWinningQuote() : getRandomLosingQuote(),
      whiteStatus,
      blackQuote: blackStatus === 'win' ? getRandomWinningQuote() : getRandomLosingQuote(),
      blackStatus
    };
  }

  if (mode === 'online') {
    if (winner === 'draw') {
      return {
        userQuote: getRandomDrawQuote(),
        userStatus: 'draw'
      };
    }

    const isUserWinner = winner === playerColor;
    return {
      userQuote: isUserWinner ? getRandomWinningQuote() : getRandomLosingQuote(),
      userStatus: isUserWinner ? 'win' : 'lose',
      whiteQuote: winner === 'w' ? getRandomWinningQuote() : getRandomLosingQuote(),
      whiteStatus: winner === 'w' ? 'win' : 'lose',
      blackQuote: winner === 'b' ? getRandomWinningQuote() : getRandomLosingQuote(),
      blackStatus: winner === 'b' ? 'win' : 'lose'
    };
  }

  return {
    userQuote: winner === 'w' ? getRandomWinningQuote() : getRandomLosingQuote(),
    userStatus: winner === 'w' ? 'win' : 'lose'
  };
};
