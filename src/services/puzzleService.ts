export interface PuzzleCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  puzzles: Array<{ fen: string; description: string; solution?: string }>;
}

export const PUZZLE_CATEGORIES: PuzzleCategory[] = [
  {
    id: 'mate_in_1',
    title: 'Mate in 1',
    description: 'Deliver checkmate in exactly one move. Spot the killer blow!',
    icon: '☠️',
    puzzles: [
      // Classic Fool's Mate setup
      { fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3', description: 'White to move — Fool\'s Mate pattern. Black queen threatens h1. Can you survive... or is it already mate?', solution: 'Black already delivered Qxh1#' },
      // Scholar's mate
      { fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4', description: 'Scholar\'s Mate — White just played Qxf7#. Study how it happened.', solution: 'Qxf7# is already checkmate' },
      // Back rank with rook
      { fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', description: 'White to move. The enemy king is trapped behind its pawns. Deliver the rook checkmate.', solution: 'Rd8#' },
      // Queen delivers smothered checkmate style
      { fen: '5rk1/5ppp/8/8/8/8/5PPP/4QRK1 w - - 0 1', description: 'White to move. Coordinate your queen and rook for back rank mate.', solution: 'Qe8#' },
      // Anastasia's mate setup
      { fen: '5r1k/pp4pp/4N3/8/1Q6/8/PP4PP/7K w - - 0 1', description: 'White to move — Anastasia\'s Mate pattern. Knight on e6 assists. Find Qh7#.', solution: 'Qh7#' },
      // Arabian mate
      { fen: '7k/6pp/8/8/8/8/8/5RNK w - - 0 1', description: 'Arabian Mate: White to move. Knight + Rook corner the king. Play Rf8#.', solution: 'Rf8#' },
      // Epaulette mate
      { fen: '3rkr2/ppp2ppp/8/8/8/8/PPP2PPP/3QK3 w - - 0 1', description: 'Epaulette Mate position. White queen delivers checkmate while rooks block own king\'s escape.', solution: 'Qd8#' },
      // Corridor checkmate
      { fen: '6k1/5ppp/6P1/8/8/8/5PP1/4Q1K1 w - - 0 1', description: 'White to move. The g6 pawn cuts off escape. Find the queen checkmate.', solution: 'Qe8#' },
      // Bishop + queen cooperation
      { fen: 'r5k1/pb3ppp/1p6/8/8/1B6/PP3PPP/3Q2K1 w - - 0 1', description: 'White to move. Bishop controls a critical diagonal. Deliver checkmate with your queen.', solution: 'Qd8#' },
      // Two rooks checkmate drill
      { fen: '6k1/8/6K1/8/8/8/8/3RR3 w - - 0 1', description: 'White to move. Two rooks + king. Deliver the classic two-rook ladder mate.', solution: 'Rg1#' },
      // Rook and queen
      { fen: '6k1/5ppp/8/8/8/8/5PPP/3QR1K1 w - - 0 1', description: 'White to move. Line up your heavy pieces. Deliver back rank checkmate.', solution: 'Qd8# or Re8#' },
      // Boden's Mate classic
      { fen: 'r3kb1r/ppp2ppp/4p3/8/2B5/8/PPP3PP/2KR3R w kq - 0 1', description: 'Boden\'s Mate pattern. Two criss-crossing bishops deliver checkmate. Play Bd5#.', solution: 'Bd5#' },
      // h-file attack
      { fen: '5rk1/1pp2ppp/p7/8/8/8/PPP2PPP/3R2K1 w - - 0 1', description: 'White to move. Rook to the back rank wins instantly.', solution: 'Rd8#' },
      // Morphy's Mate blueprint
      { fen: '5bk1/pp3ppp/8/8/8/8/PP3PPP/3R1BK1 w - - 0 1', description: 'Morphy\'s Mate setup. White bishop + rook collaborate. Play Rd8#.', solution: 'Rd8#' },
      // Smothered Mate
      { fen: '6rk/6pp/7N/8/8/8/8/7K w - - 0 1', description: 'Smothered Mate! White knight on h6. The rooks smother the king. Play Nf7#.', solution: 'Nf7#' },
    ]
  },
  {
    id: 'fork',
    title: 'Knight Fork Tactics',
    description: 'Attack two enemy pieces simultaneously with a knight to win material.',
    icon: '🐴',
    puzzles: [
      // Classic royal fork: knight forks king and queen
      { fen: 'r3k2r/ppp2ppp/8/3q4/8/5N2/PPP2PPP/R3K2R w KQkq - 0 1', description: 'White to move. Your knight on f3 can reach d4, forking the king on e8 and queen on d5. Execute it!', solution: 'Nd4+ wins the queen' },
      // Knight forks king and rook
      { fen: '4k3/pp3ppp/8/8/2r5/8/PP3PPP/R3KN2 w - - 0 1', description: 'White to move. Find the knight move that simultaneously attacks king and rook.', solution: 'Ne3 or Nd2 forking positions' },
      // Pawn fork
      { fen: 'r1bqkb1r/ppp2ppp/2n1pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5', description: 'White to move. A central pawn advance forks two enemy pieces. Find the winning pawn push.', solution: 'd5 forks the knight on c6 and bishop' },
      // Queen fork
      { fen: 'r3k2r/ppp2ppp/2n5/8/3P4/8/PPP2PPP/R2QK2R w KQkq - 0 1', description: 'White to move. Your queen can fork king and rook in one move. Find it.', solution: 'Qa4+ or Qd5+ forking' },
      // Double knight fork opportunity
      { fen: '2r1k3/ppp2ppp/5n2/8/2N5/8/PPP2PPP/R3K2R w KQ - 0 1', description: 'White to move. Your knight on c4 is a powerful attacker. Find the fork that wins material.', solution: 'Ne5 forking f7 and c6/d7' },
      // Bishop fork (diagonal attack)
      { fen: 'r3k2r/ppp2ppp/2n5/3pP3/8/2B5/PPP2PPP/R3K2R w KQkq - 0 1', description: 'White to move. Your bishop can deliver a discovered fork. Find the diagonal skewer.', solution: 'Bg7 or Bb5 forking attack' },
      // Simple knight jump winning queen
      { fen: 'r2qk2r/ppp2ppp/2n5/4p3/4P3/2N5/PPP2PPP/R2QK2R w KQkq - 0 1', description: 'White to move. Knight jump to d5 forks queen on d8 and bishop. Calculate carefully.', solution: 'Nd5 forks queen and bishop' },
      // Classic Nf7 royal fork (Opera Game inspired)
      { fen: 'r3kb1r/ppp2ppp/2n2n2/4N3/4P3/8/PPP2PPP/R1BQKB1R w KQkq - 0 8', description: 'Opera Game pattern. White knight on e5. Find the royal fork that wins the exchange.', solution: 'Nxf7 forks queen and rook' },
      // Knight outpost fork
      { fen: '2r1kb1r/pp3ppp/2p1pn2/3N4/8/8/PPP2PPP/R2QK2R w KQkq - 0 10', description: 'White knight dominates on d5. Play Nxc7+ to fork king and rook.', solution: 'Nxc7+ royal fork' },
      // Zwischenzug then fork
      { fen: 'r1b2rk1/ppp2ppp/2n5/3N4/2B5/8/PPP2PPP/R3K2R w KQ - 0 12', description: 'White to move. Piece coordination leads to a devastating fork. Knight to e7+ forks.', solution: 'Ne7+ forking rooks' },
      // Rook fork
      { fen: '4k3/pp3ppp/8/8/8/8/PP3PPP/R3K3 w - - 0 1', description: 'White to move. Your rook on a1 can fork along the first rank or eighth rank. Find the tactic.', solution: 'Ra8+ then captures' },
      // E5 pawn push fork
      { fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3', description: 'White to move. A pawn advance forks the knight and threatens the center. Play d4 forking.', solution: 'd4 forks the e5 pawn and knight' },
      // Knight vs rook + bishop fork
      { fen: '2r3k1/pp3ppp/2nb4/8/2N5/8/PP3PPP/R4RK1 w - - 0 15', description: 'White to move. Knight on c4 jump to e5 threatens fork. Calculate the sequence.', solution: 'Ne5 double attack' },
      // Fork from long range
      { fen: '3rk2r/ppp2ppp/2n5/8/8/1N6/PPP2PPP/R2RK3 w Qk - 0 12', description: 'White to move. Your knight on b3 can fork the king and rook. Find the forking square.', solution: 'Nc5+ or Nd4+ forking' },
      // Advanced pawn fork
      { fen: 'r1b1kb1r/ppp2ppp/2n2q2/3pP3/8/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7', description: 'White to move. The e5 pawn threatens to push. Find the fork that wins a piece.', solution: 'e6 forks bishop and queen' },
    ]
  },
  {
    id: 'back_rank',
    title: 'Back Rank Mate',
    description: 'Exploit the enemy king trapped behind its own pawns on the back rank.',
    icon: '🏰',
    puzzles: [
      // Pure rook back rank
      { fen: '5rk1/ppp2ppp/8/8/8/8/PPP2PPP/3R2K1 w - - 0 1', description: 'White to move. Enemy king is locked behind pawns. Play Rd8 for the back rank checkmate.', solution: 'Rd8#' },
      // Queen delivers back rank
      { fen: '4r1k1/ppp2ppp/8/8/8/8/PPP2PPP/3Q2K1 w - - 0 1', description: 'White to move. Your queen reaches the 8th rank before the rook can defend. Find it.', solution: 'Qd8#' },
      // Must capture first then mate
      { fen: '3r2k1/ppp2ppp/8/8/8/8/PPP2PPP/3R2K1 w - - 0 1', description: 'White to move. Exchange rooks on d8 then deliver back rank mate.', solution: 'Rxd8#' },
      // Two rooks battery
      { fen: '6k1/ppp2ppp/8/8/8/8/PPP2PPP/3RR1K1 w - - 0 1', description: 'White to move. Double rook battery on the d and e files. Deliver checkmate.', solution: 'Rd8#' },
      // Rook sacrifice then back rank
      { fen: '2r3k1/ppp2ppp/8/8/8/8/PPP2PPP/3RR1K1 w - - 0 1', description: 'White to move. Sacrifice one rook on c8, then the second rook mates on c8.', solution: 'Rxc8+ Rxc8 Rxc8#' },
      // Lure then back rank
      { fen: '2r3k1/pp3ppp/2p5/8/8/8/PP3PPP/2R1R1K1 w - - 0 1', description: 'White to move. Force the enemy rook off c8 then deliver back rank mate.', solution: 'Rc8+ Rxc8 Rxc8#' },
      // Queen + rook coordination
      { fen: '5rk1/pp3ppp/8/8/8/8/PP3PPP/3QR1K1 w - - 0 1', description: 'White to move. Queen and rook combine for an unstoppable back rank attack.', solution: 'Qd8 or Re8 leads to mate' },
      // Deflection then back rank
      { fen: '2r3k1/ppp2ppp/8/8/8/8/PPP2PPP/2RQ2K1 w - - 0 1', description: 'White to move. First deflect the defending rook with a queen sacrifice, then checkmate.', solution: 'Qxc8+ Rxc8 Rxc8#' },
      // Rook penetrates
      { fen: '6k1/pp3ppp/2r5/8/8/8/PP3PPP/3R2K1 w - - 0 1', description: 'White to move. Your rook on d1 can infiltrate to the 8th rank instantly. Find mate.', solution: 'Rd8+ Rxd8 — or Rd8# if undefended' },
      // Classic Morphy-style back rank
      { fen: '5k2/ppp2ppp/8/8/8/8/PPP2PPP/3R1QK1 w - - 0 1', description: 'White to move — king on f8. Queen and rook deliver checkmate together.', solution: 'Qf7# or Rd8#' },
      // Zugzwang forcing back rank
      { fen: '6k1/pp4pp/5p2/8/8/8/PP4PP/3R2K1 w - - 0 1', description: 'White to move. The king is limited, rook on d1 can deliver the final blow.', solution: 'Rd8#' },
      // Diagonal bishop assists back rank
      { fen: '5rk1/pp3ppp/8/8/8/1B6/PP3PPP/3R2K1 w - - 0 1', description: 'White to move. Bishop controls f8, rook delivers checkmate. Find the combination.', solution: 'Rd8 and bishop covers escape' },
      // Both rooks cooperate
      { fen: '6k1/pp3ppp/8/8/8/8/PP3PPP/3RR1K1 w - - 0 1', description: 'White to move. Use both rooks to force checkmate. One delivers, one supports.', solution: 'Rd8# with Re8 support' },
      // Bishop + rook Morphy mate
      { fen: '5bk1/pp3ppp/8/8/8/8/PP3PPP/3R1BK1 w - - 0 1', description: 'Morphy\'s Mate pattern. Bishop controls key diagonal, rook delivers on d8. Play Rd8#.', solution: 'Rd8#' },
      // Queen alone mates
      { fen: '6k1/pp3ppp/8/8/8/8/PP3PPP/3Q2K1 w - - 0 1', description: 'White to move. Your queen alone can deliver back rank checkmate. Find Qd8#.', solution: 'Qd8#' },
    ]
  },
  {
    id: 'pin_skewer',
    title: 'Pins & Skewers',
    description: 'Immobilize key enemy pieces with pins or win material with diagonal skewers.',
    icon: '📌',
    puzzles: [
      // Classic bishop pin on knight
      { fen: 'rnbqk2r/pppp1ppp/5n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4', description: 'White to move. Black\'s Bb4 pins your knight on c3. Can you break the pin profitably?', solution: 'Nd5 or a3 breaks the pin' },
      // Rook pins rook against king
      { fen: 'r4rk1/ppp2ppp/8/8/8/8/PPP2PPP/4RRK1 w - - 0 1', description: 'White to move. Your rook on e1 can pin the enemy rook on f8 against the king. Play Re8!', solution: 'Re8 pins the rook' },
      // Bishop skewer king and queen
      { fen: '4q3/5k2/8/8/8/3B4/8/6K1 w - - 0 1', description: 'White to move. Your bishop skewers the king on f7, winning the queen on e8 after it moves.', solution: 'Bc4+ skewers king and queen' },
      // Rook skewer on the 8th rank
      { fen: 'r7/6k1/8/8/8/8/6K1/7R w - - 0 1', description: 'White to move. Rook delivers a skewer — attack king on g7, win the rook on a8.', solution: 'Rg1+ skewers king to win Ra8' },
      // Absolute pin — pinned piece cannot move
      { fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', description: 'White to move. Your bishop on c4 creates an absolute pin. Find the move that exploits it.', solution: 'Ng5 attacks the pinned f6 knight' },
      // Queen pin along file
      { fen: 'r2qkb1r/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP1QPPP/R1B1KB1R w KQkq - 2 6', description: 'White to move. Pin the enemy knight along the e-file with your queen.', solution: 'Qe5 pins the knight on f6' },
      // Double bishop skewer
      { fen: 'r3k3/pp3ppp/2q5/8/2B5/8/PP3PPP/4K3 w - - 0 1', description: 'White to move. Your bishop on c4 skewers the queen on c6 — after Qxc4 follows Rxc8.', solution: 'Bb5+ or Re1+ followed by skewer' },
      // Pin and win the pinned piece
      { fen: 'r2q1rk1/ppp2ppp/2n5/3p4/3P4/2N2N2/PPP1QPPP/R1B1KB1R w KQ - 0 8', description: 'White to move. Your queen on e2 pins the knight on c6 against the queen on d8. Attack it!', solution: 'Nb5 attacks the pinned knight' },
      // Rook behind rook skewer
      { fen: '1r4k1/1pp2ppp/8/8/8/8/1PP2PPP/1R3RK1 w - - 0 1', description: 'White to move. Play Rb8+ to skewer the king and win the rook behind it.', solution: 'Rb8+ Rxb8 Rxb8#' },
      // Long diagonal bishop pin
      { fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3', description: 'White to move. The long diagonal from c1-h6 beckons. Play Bb5+ pinning the knight.', solution: 'Bb5+ pins Nc6' },
      // Relative pin exploitation
      { fen: 'r1bq1rk1/ppp2ppp/2n5/3p4/2B5/2N2N2/PPP2PPP/R2Q1RK1 w - - 0 8', description: 'White to move. Pin the queen against the king and pile up on the pinned piece.', solution: 'Bxf7+ followed by Ne5' },
      // Queen skewer along diagonal
      { fen: '6k1/5ppp/8/8/8/8/5PPP/Q5K1 w - - 0 1', description: 'White to move. Queen on a1 skewers the king — find the one-move checkmate.', solution: 'Qa8#' },
      // Bishop pin on d-file
      { fen: 'r2qk2r/ppp2ppp/2n5/3p4/3P4/2N2B2/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Pin the queen against the king along the d-file.', solution: 'Rd1 pins queen on d8' },
      // X-ray attack
      { fen: '4rrk1/ppp2ppp/8/8/8/8/PPP2PPP/4RRK1 w - - 0 1', description: 'White to move. Use X-ray vision — your rook on e1 attacks through e8 to the rook behind.', solution: 'Rxe8 then Rxe8' },
      // Knight pin by bishop
      { fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4', description: 'White to move. Bishop on c4 pins the f6 knight. Find the attack that wins material.', solution: 'Ng5 attacks the pinned f7 pawn' },
    ]
  },
  {
    id: 'discovered',
    title: 'Discovered Attacks',
    description: 'Move one piece to unleash a devastating hidden attack from the piece behind it.',
    icon: '💡',
    puzzles: [
      // Classic discovered check
      { fen: '4k3/3N4/2B5/8/8/8/8/4K3 w - - 0 1', description: 'White to move. Moving the knight reveals the bishop\'s attack. Deliver a discovered double check!', solution: 'Nb6+ or Nc5+ discovered double check' },
      // Discovered attack wins queen
      { fen: 'r1b1k2r/pppp1ppp/8/4q3/4P3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 9', description: 'White to move. Move your knight to reveal the queen attacking e5. Win the enemy queen.', solution: 'Nd5 discovered attack wins queen' },
      // Discovered check winning rook
      { fen: 'r3k2r/ppp2ppp/2n5/3pN3/4B3/8/PPP2PPP/R2QK2R w KQkq - 0 8', description: 'White to move. Move the knight on e5, unleashing the bishop on e4 in discovered check.', solution: 'Nxd7+ discovered check wins rook' },
      // Discovered attack on queen
      { fen: 'r1b1kb1r/pppp1ppp/2n5/4q3/4P1b1/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 7', description: 'White to move. Your f3 knight discovery unleashes the queen vs the enemy queen on e5.', solution: 'Nd5 discovered attack' },
      // Battery discovered check
      { fen: '2r1k2r/ppp2ppp/2n5/3pP3/1b1P4/2N2N2/PPP2PPP/R2QKB1R w KQkq - 0 8', description: 'White to move. Advance the e-pawn to e6, discovered attack on the bishop on b4.', solution: 'e6 discovered attack on bishop' },
      // Unmask the rook
      { fen: '5k2/pp3ppp/8/4N3/8/8/PP3PPP/3RK3 w - - 0 1', description: 'White to move. Move the knight on e5 to reveal the rook\'s power along the d-file.', solution: 'Nc6+ or Nd7+ reveals Rd1' },
      // Double check from knight leap
      { fen: 'r3k3/ppp2ppp/2n5/3p4/3P1N2/2P5/PP3PPP/R3KB1R w KQq - 0 10', description: 'White to move. Knight leap gives discovered double check. Find the winning sequence.', solution: 'Ng6+ double check' },
      // Bishop retreats discovers rook
      { fen: '5k2/pp3ppp/2B5/8/8/8/PP3PPP/3R2K1 w - - 0 1', description: 'White to move. Move your bishop off the d-file to reveal Rd8# threat. Execute the combination.', solution: 'Bb7+ or Bd7 reveals Rd8#' },
      // Discovered attack on undefended piece  
      { fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p2B1/3P4/2N2N2/PPP2PPP/R2QK2R w KQ - 0 8', description: 'White to move. Move your bishop from g5 to discover an attack. Calculate the winning sequence.', solution: 'Bxf6 discovered threat' },
      // Knight jump uncovers bishop
      { fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B5/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 4', description: 'White to move. Knight move from f3 reveals bishop on c4 in a discovered attack on the king.', solution: 'Ng5 threatens Bxf7+ discovered' },
      // Discovered checkmate threat
      { fen: '6k1/pp4pp/2b1N3/8/8/8/PP4PP/4R1K1 w - - 0 1', description: 'White to move. Move the knight on e6, discovered attack from rook on e1. Win material or deliver check.', solution: 'Nd8+ or Nc7 discovered from Re1' },
      // Classic Morphy style discovery
      { fen: 'r1b1kbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 2 4', description: 'White to move — Scholar\'s pattern. Find the discovered attack that leads to Qxf7#.', solution: 'Bxf7+ discovered check' },
      // Rook activated by knight
      { fen: '3r2k1/pp4pp/2p1pN2/8/8/8/PP4PP/3R2K1 w - - 0 1', description: 'White to move. Knight on f6 moves to h7+, revealing rook on d1 firing on d8. Calculate!', solution: 'Nxh7+ Kxh7 Rxd8' },
      // Windmill (series of discoveries)
      { fen: '5k2/pp2r1pp/2n3N1/5B2/8/8/PP4PP/4R1K1 w - - 0 1', description: 'White to move — Windmill pattern! Knight and bishop trade discovered checks repeatedly to win material.', solution: 'Nxh7+ Ke8 Nf6+ Kf8 Nd7+ wins' },
      // Simple discovery wins pawn
      { fen: 'r1bqkb1r/pppp1ppp/5n2/4p3/2BPP3/8/PPP2PPP/RNBQK1NR w KQkq - 0 4', description: 'White to move. Push d5 — the pawn advance creates a discovered attack on the f6 knight.', solution: 'd5 forks and discovers attack' },
    ]
  },
  {
    id: 'endgame',
    title: 'Endgame Mastery',
    description: 'Convert winning endgame positions — king activity, pawn promotion, and zugzwang.',
    icon: '♔',
    puzzles: [
      // Opposition in king + pawn endgame
      { fen: '8/4k3/8/4P3/4K3/8/8/8 w - - 0 1', description: 'White to move. King and pawn endgame — take the opposition to escort the pawn to promotion.', solution: 'Ke5 takes opposition, e6, e7, e8=Q' },
      // Lucena position (rook endgame)
      { fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1', description: 'White to move — Lucena Position. Build a bridge with your rook to promote safely.', solution: 'Rc4 → Ra4 bridge building' },
      // Philidor position (draw defense)
      { fen: '4k3/8/8/8/4p3/8/4K3/4r3 b - - 0 1', description: 'Black to move — Philidor Position. Hold the draw by keeping the rook on the 6th rank.', solution: 'Re6 Philidor defense' },
      // Two bishops checkmate
      { fen: '8/8/8/8/8/2BB4/8/3k1K2 w - - 0 1', description: 'White to move. Two bishop checkmate — push the king to the corner step by step.', solution: 'Kf2, Bf4, Bd4, Bc3 — drive king to corner' },
      // Queen vs pawn (on 7th rank)
      { fen: '8/6P1/8/8/8/8/q7/7K w - - 0 1', description: 'White to move — pawn races to promote! Can White queen survive? Black queen vs White pawn on g7.', solution: 'Kg2 sidestep then g8=Q or defend' },
      // Pawn breakthrough
      { fen: '8/ppp5/8/PPP5/8/8/8/4K1k1 w - - 0 1', description: 'White to move. Three vs three pawns — find the breakthrough that guarantees a queen!', solution: 'b6! axb6 c6 bxc6 a6 breakthrough' },
      // Triangulation
      { fen: '8/8/3k4/8/3K4/3P4/8/8 w - - 0 1', description: 'White to move. Triangulate with your king to gain the opposition and promote.', solution: 'Ke4 → Kd4 → Ke4 triangulation' },
      // Rook vs pawn
      { fen: '8/8/8/8/8/6p1/8/6RK b - - 0 1', description: 'Black to move — pawn race against rook. Can Black promote or does White stop it?', solution: 'g2 Rg1 Kf2 draws or Kxg1' },
      // Rook and king checkmate
      { fen: '3k4/8/8/8/8/8/8/3RK3 w - - 0 1', description: 'White to move. King + Rook vs lone King — deliver checkmate in the corner.', solution: 'Rd6, Ke2, Kd3... drive to corner' },
      // Knight and pawn endgame
      { fen: '8/4p3/4k3/4N3/8/8/4P3/4K3 w - - 0 1', description: 'White to move. Your knight controls key squares. Push the pawn to promotion.', solution: 'e4, Nc4, Ke2, d5 advance' },
      // Rook endgame — active king
      { fen: '5k2/5r2/8/5K2/8/8/8/5R2 w - - 0 1', description: 'White to move. Active king + rook — White wins by penetrating with the king.', solution: 'Rf7+ drives king away' },
      // Zugzwang in pawn endgame
      { fen: '8/8/8/3k4/3p4/3K4/8/8 w - - 0 1', description: 'White to move — Zugzwang! Any move loses. Study this classic position.', solution: 'White is in zugzwang — whichever way king moves Black wins' },
      // Queen vs rook endgame
      { fen: '8/8/8/4k3/8/8/8/3RQK2 w - - 0 1', description: 'White to move. Overwhelming force — queen and rook drive the lone king to checkmate.', solution: 'Qe6+ Kf4 Rd4# or similar' },
      // Bishop and pawn vs bishop
      { fen: '8/8/8/3k4/3b4/3B4/3P4/3K4 w - - 0 1', description: 'White to move. Same-colored bishops with a pawn — push to promotion despite enemy bishop.', solution: 'Bc4+ Ke5 d4 advance' },
      // King vs King + pawns
      { fen: '8/pppp4/4k3/8/4K3/4P3/PPP5/8 w - - 0 1', description: 'White to move. Pawn majority on queenside — create a passed pawn and promote.', solution: 'e4, a4, b4 — create a passer' },
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
  const availableIndices = cat.puzzles
    .map((_, i) => i)
    .filter(i => !recent.includes(i));
    
  let chosenIndex: number;
  if (availableIndices.length > 0) {
    chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  } else {
    recentPuzzleIndices[cat.id] = [];
    chosenIndex = Math.floor(Math.random() * cat.puzzles.length);
  }
  
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
    solution: puzzleData.solution,
    categoryId: cat.id
  };
}
