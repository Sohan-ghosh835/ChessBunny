import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { io, Socket } from 'socket.io-client';
import { TopBar, GameMode } from './components/TopBar';
import { ChessBoard } from './components/ChessBoard';
import { StatusBar } from './components/StatusBar';
import { RightSidebar } from './components/RightSidebar';
import { BottomControls } from './components/BottomControls';

// Modals
import { PromotionModal } from './components/modals/PromotionModal';
import { GameOverModal } from './components/modals/GameOverModal';
import { OnlineRoomModal } from './components/modals/OnlineRoomModal';
import { PuzzleModal, PuzzleItem } from './components/modals/PuzzleModal';
import { GameReviewModal } from './components/modals/GameReviewModal';
import { SettingsModal, GameSettings } from './components/modals/SettingsModal';
import { ProfileModal } from './components/modals/ProfileModal';

// Services
import { stockfishService, DifficultyLevel } from './services/stockfishService';
import { audioService } from './services/audioService';
import { getRandomPuzzleForCategory } from './services/puzzleService';

export const App: React.FC = () => {
  // Main Chess State
  const [chess] = useState<Chess>(() => new Chess());
  const [fen, setFen] = useState<string>(chess.fen());
  const [history, setHistory] = useState<string[]>([]);
  const [fenHistory, setFenHistory] = useState<string[]>([chess.fen()]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(-1);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  // Captured pieces
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);

  // Settings & Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [settings, setSettings] = useState<GameSettings>({
    animations: true,
    sound: true,
    theme: 'light',
    highlightLegalMoves: true,
    coordinates: true,
    autoQueen: false,
    flipAutomatically: false
  });

  // Game Options
  const [mode, setMode] = useState<GameMode>('ai');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  // Timers (in seconds)
  const [whiteTime, setWhiteTime] = useState<number>(300);
  const [blackTime, setBlackTime] = useState<number>(300);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);

  // Evaluation
  const [evalScore, setEvalScore] = useState<number>(0);

  // Online Duel State
  const socketRef = useRef<Socket | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([]);

  // Hint state
  const [hintSquare, setHintSquare] = useState<Square | null>(null);

  // Puzzle state
  const [currentPuzzleCategoryId, setCurrentPuzzleCategoryId] = useState<string | null>(null);
  const [currentPuzzleTitle, setCurrentPuzzleTitle] = useState<string | undefined>(undefined);

  // Pending Promotion State
  const [pendingMove, setPendingMove] = useState<{ from: Square; to: Square } | null>(null);

  // Modals Visibility
  const [showPromotion, setShowPromotion] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [gameOverResult, setGameOverResult] = useState<{ winner: 'w' | 'b' | 'draw' | null; reason: string }>({ winner: null, reason: '' });
  const [showOnlineModal, setShowOnlineModal] = useState<boolean>(false);
  const [showPuzzleModal, setShowPuzzleModal] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Difficulty change toast
  const [difficultyToast, setDifficultyToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup Socket Connection for Private Rooms
  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (isLocalhost ? 'http://localhost:3001' : 'https://chessbunnybackend.onrender.com');
    const socket = io(backendUrl, { autoConnect: true });
    socketRef.current = socket;

    socket.on('room_created', ({ roomCode }) => {
      setRoomCode(roomCode);
      setPlayerColor('w');
      setIsFlipped(false);
    });

    socket.on('room_joined', ({ roomCode, color }) => {
      setRoomCode(roomCode);
      setPlayerColor(color || 'b');
      setIsFlipped(true);
    });

    socket.on('game_started', ({ roomCode, roomState }) => {
      setRoomCode(roomCode);
      setShowOnlineModal(false);
      resetGame(roomState.fen);
    });

    socket.on('move_made', ({ move, fen, roomState }) => {
      chess.load(fen);
      setFen(fen);
      setHistory(roomState.moves);
      setFenHistory((prev) => [...prev, fen]);
      setCurrentMoveIndex(roomState.moves.length - 1);
      setLastMove({ from: move.from as Square, to: move.to as Square });

      if (move.captured) {
        audioService.playCapture();
      } else {
        audioService.playMove();
      }
    });

    socket.on('timer_tick', ({ whiteTime, blackTime }) => {
      setWhiteTime(whiteTime);
      setBlackTime(blackTime);
    });

    socket.on('chat_received', (chatObj) => {
      setChatMessages((prev) => [...prev, chatObj]);
    });

    socket.on('game_over', ({ reason, winner }) => {
      setGameOverResult({ winner, reason });
      setShowGameOver(true);
    });

    socket.on('error_message', (msg) => {
      alert(`Bunny Notice: ${msg}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [chess]);

  // Timer Interval for local / AI games
  useEffect(() => {
    if (!timerEnabled || chess.isGameOver() || mode === 'online') return;

    const timer = setInterval(() => {
      if (chess.turn() === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            triggerGameOver('b', 'White ran out of time!');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            triggerGameOver('w', 'Black ran out of time!');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [chess, mode, fen, timerEnabled]);

  // Update captured pieces & eval score on fen change
  useEffect(() => {
    const board = chess.board();
    const currentPieces: { w: string[]; b: string[] } = { w: [], b: [] };
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          currentPieces[piece.color].push(piece.type);
        }
      }
    }

    const initialWhite = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    const initialBlack = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

    // Captured by White = missing Black pieces
    const capWhite: string[] = [];
    initialBlack.forEach((p) => {
      const idx = currentPieces.b.indexOf(p);
      if (idx > -1) {
        currentPieces.b.splice(idx, 1);
      } else {
        capWhite.push(p);
      }
    });

    // Captured by Black = missing White pieces
    const capBlack: string[] = [];
    initialWhite.forEach((p) => {
      const idx = currentPieces.w.indexOf(p);
      if (idx > -1) {
        currentPieces.w.splice(idx, 1);
      } else {
        capBlack.push(p);
      }
    });

    setCapturedWhite(capWhite);
    setCapturedBlack(capBlack);

    const score = stockfishService.evaluatePosition(chess);
    setEvalScore(score);
  }, [fen, chess]);

  // Handle Triggering Game Over
  const triggerGameOver = (winner: 'w' | 'b' | 'draw' | null, reason: string) => {
    setGameOverResult({ winner, reason });
    setShowGameOver(true);
  };

  // Execute Move
  const makeMove = useCallback(
    async (from: Square, to: Square, promotionPiece: string = 'q') => {
      try {
        // In Online Mode, emit to server and let server broadcast move_made back to sync both players
        if (mode === 'online' && socketRef.current && roomCode) {
          socketRef.current.emit('make_move', { roomCode, from, to, promotion: promotionPiece });
          return;
        }

        const move = chess.move({ from, to, promotion: promotionPiece });
        if (!move) return;

        const newFen = chess.fen();
        setFen(newFen);
        const newHistory = chess.history();
        setHistory(newHistory);
        setFenHistory((prev) => [...prev, newFen]);
        setCurrentMoveIndex(newHistory.length - 1);
        setLastMove({ from, to });

        if (move.captured) {
          audioService.playCapture();
        } else {
          audioService.playMove();
        }

        // Check for Game Over
        if (chess.isCheckmate()) {
          triggerGameOver(chess.turn() === 'w' ? 'b' : 'w', 'Checkmate!');
          return;
        } else if (chess.isDraw()) {
          triggerGameOver('draw', 'Stalemate / Draw!');
          return;
        } else if (chess.inCheck()) {
          audioService.playCheck();
        }

        // Trigger AI Turn if Mode === 'ai' or 'puzzle' and it's Black turn
        if ((mode === 'ai' || mode === 'puzzle') && chess.turn() === 'b' && !chess.isGameOver()) {
          setIsThinking(true);
          const aiMove = await stockfishService.getBestMove(chess, difficulty);
          setIsThinking(false);
          if (aiMove) {
            makeMove(aiMove.from as Square, aiMove.to as Square, aiMove.promotion || 'q');
          }
        }
      } catch (e) {
        // Invalid move swallowed
      }
    },
    [chess, mode, roomCode, difficulty]
  );

  // Handle Square Drop / Selection
  const handleBoardMove = (from: Square, to: Square) => {
    // In Online Mode, check turn matches player's assigned color!
    if (mode === 'online' && chess.turn() !== playerColor) {
      return;
    }

    // Check if move is pawn promotion
    const piece = chess.get(from);
    if (piece && piece.type === 'p') {
      if ((piece.color === 'w' && to.endsWith('8')) || (piece.color === 'b' && to.endsWith('1'))) {
        if (settings.autoQueen) {
          makeMove(from, to, 'q');
        } else {
          setPendingMove({ from, to });
          setShowPromotion(true);
        }
        return;
      }
    }

    makeMove(from, to);
  };

  // Promotion Selection
  const handlePromotionSelect = (pPiece: 'q' | 'r' | 'n' | 'b') => {
    setShowPromotion(false);
    if (pendingMove) {
      makeMove(pendingMove.from, pendingMove.to, pPiece);
      setPendingMove(null);
    }
  };

  // Undo Move
  const handleUndo = () => {
    if (history.length === 0 || mode === 'online') return;

    if (mode === 'ai') {
      chess.undo();
      chess.undo();
    } else {
      chess.undo();
    }

    const newFen = chess.fen();
    setFen(newFen);
    setHistory(chess.history());
    setCurrentMoveIndex(chess.history().length - 1);
  };

  // Redo Move (from history rewinding)
  const handleRedo = () => {
    if (currentMoveIndex < history.length - 1) {
      const nextIdx = currentMoveIndex + 1;
      setCurrentMoveIndex(nextIdx);
      if (fenHistory[nextIdx + 1]) {
        chess.load(fenHistory[nextIdx + 1]);
        setFen(fenHistory[nextIdx + 1]);
      }
    }
  };

  // Rewind to Move Index
  const handleSelectHistoryMove = (index: number) => {
    setCurrentMoveIndex(index);
    if (fenHistory[index + 1]) {
      chess.load(fenHistory[index + 1]);
      setFen(fenHistory[index + 1]);
    }
  };

  // Hint — visually highlights the best square for 2 seconds
  const handleHint = async () => {
    const hint = await stockfishService.getHint(chess);
    if (hint) {
      setHintSquare(hint.from as Square);
      setTimeout(() => setHintSquare(null), 2200);
    }
  };

  // Reset Game
  const resetGame = (initialFen?: string) => {
    chess.reset();
    if (initialFen) chess.load(initialFen);

    setFen(chess.fen());
    setHistory([]);
    setFenHistory([chess.fen()]);
    setCurrentMoveIndex(-1);
    setLastMove(null);
    setWhiteTime(300);
    setBlackTime(300);
    setIsThinking(false);
    setShowGameOver(false);
    // Do NOT reset timerEnabled — preserve user's preference across games
  };

  // Handle Difficulty Change — auto-resets to a fresh game at new level
  const handleDifficultyChange = (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    if (mode === 'ai') {
      resetGame();
      setIsFlipped(false);
      const labels: Record<DifficultyLevel, string> = {
        easy:   'Easy (~800) — New game started!',
        medium: 'Medium (~1300) — New game started!',
        hard:   'Hard (~1800) — New game started!',
        expert: 'Expert (~2300) — New game started!'
      };
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setDifficultyToast(labels[newDiff]);
      toastTimerRef.current = setTimeout(() => setDifficultyToast(null), 1900);
    }
  };

  // Handle Mode Change Trigger
  const handleSetMode = (newMode: GameMode) => {
    setMode(newMode);
    if (newMode === 'online') {
      setShowOnlineModal(true);
    } else if (newMode === 'puzzle') {
      setShowPuzzleModal(true);
    } else {
      resetGame();
      setIsFlipped(false);
    }
  };

  // Select Puzzle
  const handleSelectPuzzle = (puzzle: PuzzleItem) => {
    setShowPuzzleModal(false);
    if (puzzle.categoryId) setCurrentPuzzleCategoryId(puzzle.categoryId);
    if (puzzle.title) setCurrentPuzzleTitle(puzzle.title);
    resetGame(puzzle.fen);
  };

  // New Puzzle — fresh position from same category
  const handleNewPuzzle = () => {
    if (!currentPuzzleCategoryId) {
      setShowPuzzleModal(true);
      return;
    }
    const puzzle = getRandomPuzzleForCategory(currentPuzzleCategoryId);
    resetGame(puzzle.fen);
  };

  return (
    <div className="app-layout">
      
      {/* Background Floating Hearts */}
      <div className="bg-particles-layer">
        <span className="floating-heart" style={{ left: '10%', animationDelay: '0s' }}>♡</span>
        <span className="floating-heart" style={{ left: '25%', animationDelay: '3s' }}>♡</span>
        <span className="floating-heart" style={{ left: '45%', animationDelay: '6s' }}>♡</span>
        <span className="floating-heart" style={{ left: '70%', animationDelay: '1s' }}>♡</span>
        <span className="floating-heart" style={{ left: '88%', animationDelay: '4s' }}>♡</span>
      </div>

      {/* Difficulty change toast */}
      {difficultyToast && (
        <div className="difficulty-toast">{difficultyToast}</div>
      )}

      {/* Top Bar Header */}
      <TopBar
        mode={mode}
        setMode={handleSetMode}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onUndo={handleUndo}
        onFlipBoard={() => setIsFlipped(!isFlipped)}
        onOpenSettings={() => setShowSettingsModal(true)}
        canUndo={history.length > 0 && mode !== 'online'}
      />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Center Column: Status Bar, Board, Controls */}
        <div className="center-column">
          
          <StatusBar
            whiteTime={whiteTime}
            blackTime={blackTime}
            activeTurn={chess.turn()}
            moveCount={history.length}
            evalScore={evalScore}
            capturedWhite={capturedWhite}
            capturedBlack={capturedBlack}
            whiteName={mode === 'online' ? (playerColor === 'w' ? 'You (White)' : 'Opponent (White)') : 'White Bunny'}
            blackName={mode === 'online' ? (playerColor === 'b' ? 'You (Black)' : 'Opponent (Black)') : 'Black Bunny'}
            timerEnabled={timerEnabled}
            onToggleTimer={() => setTimerEnabled(prev => !prev)}
          />

          <ChessBoard
            chess={chess}
            isFlipped={isFlipped}
            onMakeMove={handleBoardMove}
            highlightLegalMoves={settings.highlightLegalMoves}
            showCoordinates={settings.coordinates}
            lastMove={lastMove}
            isThinking={isThinking}
            hintSquare={hintSquare}
          />

          <BottomControls
            onUndo={handleUndo}
            onRedo={handleRedo}
            onHint={handleHint}
            onResign={() => {
              if (mode === 'online' && socketRef.current && roomCode) {
                socketRef.current.emit('resign_game', { roomCode });
              } else {
                triggerGameOver(chess.turn() === 'w' ? 'b' : 'w', 'Resigned');
              }
            }}
            onOfferDraw={() => triggerGameOver('draw', 'Draw offered & accepted')}
            onAnalysis={() => setShowReviewModal(true)}
            onNewGame={() => mode === 'puzzle' ? handleNewPuzzle() : resetGame()}
            canUndo={history.length > 0 && mode !== 'online'}
            canRedo={currentMoveIndex < history.length - 1}
            isGameOver={showGameOver}
          />

        </div>

        {/* Right Sidebar Column */}
        <RightSidebar
          history={history}
          currentMoveIndex={currentMoveIndex}
          onSelectMove={handleSelectHistoryMove}
          evalScore={evalScore}
          isOnlineMode={mode === 'online'}
          isBotMatch={mode === 'ai' || mode === 'puzzle'}
          isPuzzleMode={mode === 'puzzle'}
          currentPuzzleTitle={currentPuzzleTitle}
          onNewPuzzle={handleNewPuzzle}
          onOpenPuzzleMenu={() => setShowPuzzleModal(true)}
          fen={fen}
          pgn={chess.pgn()}
          chatMessages={chatMessages}
          onSendChat={(text) => socketRef.current?.emit('send_chat', { roomCode, text, username: playerColor === 'w' ? 'White Bunny' : 'Black Bunny' })}
        />

      </main>

      {/* Modals & Dialogs */}
      {showPromotion && (
        <PromotionModal color={chess.turn()} onSelect={handlePromotionSelect} />
      )}

      {showGameOver && (
        <GameOverModal
          winner={gameOverResult.winner}
          reason={gameOverResult.reason}
          onNewGame={() => {
            setShowGameOver(false);
            if (mode === 'puzzle') {
              handleNewPuzzle();
            } else {
              resetGame();
            }
          }}
          onReview={() => {
            setShowGameOver(false);
            setShowReviewModal(true);
          }}
          onClose={() => setShowGameOver(false)}
        />
      )}

      {showOnlineModal && (
        <OnlineRoomModal
          roomCode={roomCode}
          onCreateRoom={() => socketRef.current?.emit('create_room', { username: 'White Bunny' })}
          onJoinRoom={(code) => socketRef.current?.emit('join_room', { roomCode: code, username: 'Black Bunny' })}
          onClose={() => setShowOnlineModal(false)}
        />
      )}

      {showPuzzleModal && (
        <PuzzleModal onSelectPuzzle={handleSelectPuzzle} onClose={() => setShowPuzzleModal(false)} />
      )}

      {showReviewModal && (
        <GameReviewModal
          history={history}
          playerColor={playerColor}
          gameOverResult={gameOverResult}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal settings={settings} onUpdateSettings={setSettings} onClose={() => setShowSettingsModal(false)} />
      )}

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}

    </div>
  );
};
