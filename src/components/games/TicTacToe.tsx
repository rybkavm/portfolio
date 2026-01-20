import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";
import { LeaderboardModal } from "./LeaderboardModal";

type Player = "X" | "O" | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

const getStoredScores = (): { name: string; wins: number }[] => {
  const stored = localStorage.getItem("tictactoe-leaderboard");
  return stored ? JSON.parse(stored) : [];
};

const saveScore = (name: string) => {
  const scores = getStoredScores();
  const existing = scores.find((s) => s.name === name);
  if (existing) {
    existing.wins += 1;
  } else {
    scores.push({ name, wins: 1 });
  }
  scores.sort((a, b) => b.wins - a.wins);
  localStorage.setItem("tictactoe-leaderboard", JSON.stringify(scores.slice(0, 5)));
};

export const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const checkWinner = (board: Board): Player | "draw" | null => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) return "draw";
    return null;
  };

  const getAiMove = (board: Board): number => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);

    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = "O";
      if (checkWinner(testBoard) === "O") return move;
    }

    // Block player
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = "X";
      if (checkWinner(testBoard) === "X") return move;
    }

    // Take center
    if (availableMoves.includes(4)) return 4;

    // Take corner
    const corners = [0, 2, 6, 8].filter((c) => availableMoves.includes(c));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Random
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const aiMove = getAiMove(board);
        if (aiMove !== undefined) {
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);
        }
        setIsPlayerTurn(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner]);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      if (result === "X") {
        setPlayerWins((prev) => prev + 1);
        setShowNameInput(true);
      } else if (result === "O") {
        setAiWins((prev) => prev + 1);
      }
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const handleSaveName = () => {
    if (playerName.trim()) {
      saveScore(playerName.trim());
      setShowNameInput(false);
      setPlayerName("");
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Крестики-нолики</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowLeaderboard(true)}>
          <Trophy className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Играйте против ИИ. Вы — X, компьютер — O.
      </p>

      {/* Score */}
      <div className="flex justify-center gap-8 mb-6 font-mono text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{playerWins}</div>
          <div className="text-muted-foreground">Ваши победы</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">{aiWins}</div>
          <div className="text-muted-foreground">Победы ИИ</div>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2 mb-6 max-w-[240px] mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!!cell || !!winner || !isPlayerTurn}
            className={`aspect-square rounded-lg border-2 text-3xl font-bold transition-all
              ${cell === "X" ? "text-primary border-primary bg-primary/10" : ""}
              ${cell === "O" ? "text-destructive border-destructive bg-destructive/10" : ""}
              ${!cell && !winner && isPlayerTurn ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer" : "border-border"}
              ${!cell && !winner && !isPlayerTurn ? "border-border opacity-50" : ""}
            `}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status */}
      <div className="text-center mb-4">
        {winner === "X" && (
          <span className="text-primary font-bold">🎉 Вы победили!</span>
        )}
        {winner === "O" && (
          <span className="text-destructive font-bold">ИИ победил!</span>
        )}
        {winner === "draw" && (
          <span className="text-muted-foreground font-bold">Ничья!</span>
        )}
        {!winner && (
          <span className="text-muted-foreground">
            {isPlayerTurn ? "Ваш ход (X)" : "Ход ИИ (O)..."}
          </span>
        )}
      </div>

      <Button onClick={resetGame} className="w-full" variant="outline">
        <RotateCcw className="h-4 w-4 mr-2" />
        Новая игра
      </Button>

      {/* Name Input Modal */}
      {showNameInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full mx-4 animate-scale-in">
            <h4 className="text-lg font-bold mb-4 text-center">🎉 Новый рекорд!</h4>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background mb-4 font-mono"
              maxLength={20}
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveName} className="flex-1">
                Сохранить
              </Button>
              <Button onClick={() => setShowNameInput(false)} variant="outline">
                Пропустить
              </Button>
            </div>
          </div>
        </div>
      )}

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        title="Крестики-нолики"
        scores={getStoredScores().map((s) => ({ name: s.name, score: s.wins }))}
        scoreLabel="Побед"
      />
    </div>
  );
};
