import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play } from "lucide-react";
import { LeaderboardModal } from "./LeaderboardModal";

const getStoredScores = (): { name: string; wins: number }[] => {
  const stored = localStorage.getItem("shellgame-leaderboard");
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
  localStorage.setItem("shellgame-leaderboard", JSON.stringify(scores.slice(0, 5)));
};

type GamePhase = "ready" | "showing" | "shuffling" | "guessing" | "result";

export const ShellGame = () => {
  const [ballPosition, setBallPosition] = useState(1);
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [cupPositions, setCupPositions] = useState([0, 1, 2]);
  const [shuffleAnimation, setShuffleAnimation] = useState<string[]>(["", "", ""]);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    const newBallPosition = Math.floor(Math.random() * 3);
    setBallPosition(newBallPosition);
    setSelectedCup(null);
    setCupPositions([0, 1, 2]);
    setShuffleAnimation(["", "", ""]);
    setPhase("showing");

    // Show ball position
    setTimeout(() => {
      setPhase("shuffling");
      performShuffle();
    }, 1500);
  };

  const performShuffle = () => {
    let currentPositions = [0, 1, 2];
    let shuffleCount = 0;
    const totalShuffles = 5;

    const shuffle = () => {
      if (shuffleCount >= totalShuffles) {
        setPhase("guessing");
        setShuffleAnimation(["", "", ""]);
        return;
      }

      // Pick two random positions to swap
      const pos1 = Math.floor(Math.random() * 3);
      let pos2 = Math.floor(Math.random() * 3);
      while (pos2 === pos1) {
        pos2 = Math.floor(Math.random() * 3);
      }

      // Set animation classes - use smaller values to stay in bounds
      const newAnimations = ["", "", ""];
      const cup1Index = currentPositions.indexOf(pos1);
      const cup2Index = currentPositions.indexOf(pos2);

      // Calculate distance based on cup positions (1 step = 88px on desktop, 72px on mobile)
      const distance = Math.abs(pos2 - pos1);
      const translateValue = distance === 2 ? 160 : 80;

      if (pos1 < pos2) {
        newAnimations[cup1Index] = `translateX(${translateValue}px)`;
        newAnimations[cup2Index] = `translateX(-${translateValue}px)`;
      } else {
        newAnimations[cup1Index] = `translateX(-${translateValue}px)`;
        newAnimations[cup2Index] = `translateX(${translateValue}px)`;
      }

      setShuffleAnimation(newAnimations);

      // Swap positions
      setTimeout(() => {
        const temp = currentPositions[cup1Index];
        currentPositions[cup1Index] = currentPositions[cup2Index];
        currentPositions[cup2Index] = temp;
        setCupPositions([...currentPositions]);
        setShuffleAnimation(["", "", ""]);

        shuffleCount++;
        setTimeout(shuffle, 300);
      }, 300);
    };

    setTimeout(shuffle, 500);
  };

  const selectCup = (visualIndex: number) => {
    if (phase !== "guessing") return;

    setSelectedCup(visualIndex);
    setPhase("result");

    // Check if the visual position contains the ball
    const actualPosition = cupPositions[visualIndex];
    const won = actualPosition === ballPosition;

    if (won) {
      setWins((prev) => prev + 1);
      setShowNameInput(true);
    } else {
      setLosses((prev) => prev + 1);
    }
  };

  const handleSaveName = () => {
    if (playerName.trim()) {
      saveScore(playerName.trim());
      setShowNameInput(false);
      setPlayerName("");
    }
  };

  const resetGame = () => {
    setPhase("ready");
    setSelectedCup(null);
    setCupPositions([0, 1, 2]);
    setShuffleAnimation(["", "", ""]);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6" ref={gameContainerRef}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Напёрстки</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowLeaderboard(true)}>
          <Trophy className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Следите за шариком и угадайте, под каким стаканом он находится!
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-6 font-mono text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{wins}</div>
          <div className="text-muted-foreground">Угадано</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">{losses}</div>
          <div className="text-muted-foreground">Проиграно</div>
        </div>
      </div>

      {/* Cups - contained area */}
      <div className="flex justify-center mb-8 overflow-hidden">
        <div className="flex gap-2 sm:gap-4 h-32 items-end px-4">
          {[0, 1, 2].map((visualIndex) => {
            const actualPosition = cupPositions[visualIndex];
            const hasBall = actualPosition === ballPosition;
            const isRevealed = phase === "showing" || phase === "result";
            const isSelected = selectedCup === visualIndex;
            const showBall = hasBall && isRevealed;

            return (
              <div key={visualIndex} className="relative flex flex-col items-center">
                {/* Ball */}
                {showBall && (
                  <div className="absolute bottom-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg z-0 animate-fade-in" />
                )}

                {/* Cup */}
                <button
                  onClick={() => selectCup(visualIndex)}
                  disabled={phase !== "guessing"}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 transition-all duration-300 ${
                    phase === "guessing"
                      ? "cursor-pointer hover:scale-105"
                      : "cursor-default"
                  } ${isRevealed ? "-translate-y-8" : ""} ${
                    isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  }`}
                  style={{
                    transform: `${shuffleAnimation[visualIndex]} ${isRevealed ? "translateY(-32px)" : ""}`,
                  }}
                >
                  {/* Cup shape */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-xl rounded-t-sm transform perspective-500 shadow-lg">
                    {/* Cup rim */}
                    <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-sm" />
                    {/* Cup highlight */}
                    <div className="absolute inset-y-2 left-2 w-2 bg-gradient-to-r from-amber-400 to-transparent rounded-full opacity-50" />
                  </div>
                </button>

                {/* Cup number */}
                <span className="mt-2 text-xs text-muted-foreground font-mono">
                  #{visualIndex + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-4 h-6">
        {phase === "ready" && (
          <span className="text-muted-foreground">Нажмите "Играть" для начала</span>
        )}
        {phase === "showing" && (
          <span className="text-primary animate-pulse">Запомните позицию шарика...</span>
        )}
        {phase === "shuffling" && (
          <span className="text-accent">Перемешиваем...</span>
        )}
        {phase === "guessing" && (
          <span className="text-primary">Выберите стакан!</span>
        )}
        {phase === "result" && selectedCup !== null && (
          <span className={cupPositions[selectedCup] === ballPosition ? "text-primary" : "text-destructive"}>
            {cupPositions[selectedCup] === ballPosition ? "🎉 Вы угадали!" : "❌ Неверно!"}
          </span>
        )}
      </div>

      {/* Buttons */}
      {(phase === "ready" || phase === "result") && (
        <Button onClick={startGame} className="w-full">
          <Play className="h-4 w-4 mr-2" />
          {phase === "ready" ? "Играть" : "Играть снова"}
        </Button>
      )}

      {phase !== "ready" && phase !== "result" && (
        <Button onClick={resetGame} className="w-full" variant="outline" disabled>
          <RotateCcw className="h-4 w-4 mr-2" />
          Подождите...
        </Button>
      )}

      {/* Name Input Modal - centered in viewport */}
      {showNameInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full animate-scale-in">
            <h4 className="text-lg font-bold mb-4 text-center">🎉 Вы угадали!</h4>
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
        title="Напёрстки"
        scores={getStoredScores().map((s) => ({ name: s.name, score: s.wins }))}
        scoreLabel="Угадано"
      />
    </div>
  );
};
