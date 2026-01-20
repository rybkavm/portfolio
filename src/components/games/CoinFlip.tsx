import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";
import { LeaderboardModal } from "./LeaderboardModal";

type CoinSide = "heads" | "tails";

const getStoredScores = (): { name: string; streak: number }[] => {
  const stored = localStorage.getItem("coinflip-leaderboard");
  return stored ? JSON.parse(stored) : [];
};

const saveScore = (name: string, streak: number) => {
  const scores = getStoredScores();
  const existing = scores.find((s) => s.name === name);
  if (existing) {
    if (streak > existing.streak) {
      existing.streak = streak;
    }
  } else {
    scores.push({ name, streak });
  }
  scores.sort((a, b) => b.streak - a.streak);
  localStorage.setItem("coinflip-leaderboard", JSON.stringify(scores.slice(0, 5)));
};

export const CoinFlip = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinSide | null>(null);
  const [guess, setGuess] = useState<CoinSide | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    const stored = localStorage.getItem("coinflip-best-streak");
    return stored ? parseInt(stored) : 0;
  });
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [lastStreak, setLastStreak] = useState(0);

  const flipCoin = (selectedGuess: CoinSide) => {
    if (isFlipping) return;

    setGuess(selectedGuess);
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome: CoinSide = Math.random() > 0.5 ? "heads" : "tails";
      setResult(outcome);
      setIsFlipping(false);

      if (outcome === selectedGuess) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          localStorage.setItem("coinflip-best-streak", newStreak.toString());
        }
      } else {
        if (streak > 0) {
          setLastStreak(streak);
          setShowNameInput(true);
        }
        setStreak(0);
      }
    }, 1500);
  };

  const handleSaveName = () => {
    if (playerName.trim() && lastStreak > 0) {
      saveScore(playerName.trim(), lastStreak);
      setShowNameInput(false);
      setPlayerName("");
      setLastStreak(0);
    }
  };

  const resetGame = () => {
    setResult(null);
    setGuess(null);
    setStreak(0);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Орёл или Решка</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowLeaderboard(true)}>
          <Trophy className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Угадайте, какой стороной упадёт монетка!
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-6 font-mono text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{streak}</div>
          <div className="text-muted-foreground">Серия</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{bestStreak}</div>
          <div className="text-muted-foreground">Рекорд</div>
        </div>
      </div>

      {/* Coin */}
      <div className="flex justify-center mb-8">
        <div
          className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg flex items-center justify-center text-4xl font-bold text-amber-900 ${
            isFlipping ? "animate-flip" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {!isFlipping && result && (
            <span>{result === "heads" ? "🦅" : "🏛️"}</span>
          )}
          {!result && !isFlipping && <span>?</span>}
        </div>
      </div>

      {/* Result */}
      {result && !isFlipping && (
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-lg font-bold">
            Выпало: {result === "heads" ? "Орёл 🦅" : "Решка 🏛️"}
          </p>
          <p
            className={`text-sm mt-1 ${
              result === guess ? "text-primary" : "text-destructive"
            }`}
          >
            {result === guess ? "✓ Вы угадали!" : "✗ Не угадали"}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button
          onClick={() => flipCoin("heads")}
          disabled={isFlipping}
          className="h-14 text-lg"
          variant={guess === "heads" && result ? "default" : "outline"}
        >
          🦅 Орёл
        </Button>
        <Button
          onClick={() => flipCoin("tails")}
          disabled={isFlipping}
          className="h-14 text-lg"
          variant={guess === "tails" && result ? "default" : "outline"}
        >
          🏛️ Решка
        </Button>
      </div>

      <Button onClick={resetGame} className="w-full" variant="ghost">
        <RotateCcw className="h-4 w-4 mr-2" />
        Сбросить серию
      </Button>

      {/* Name Input Modal */}
      {showNameInput && lastStreak > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full mx-4 animate-scale-in">
            <h4 className="text-lg font-bold mb-2 text-center">Серия окончена!</h4>
            <p className="text-center text-muted-foreground mb-4">
              Ваша серия: {lastStreak} угадываний подряд
            </p>
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
              <Button
                onClick={() => {
                  setShowNameInput(false);
                  setLastStreak(0);
                }}
                variant="outline"
              >
                Пропустить
              </Button>
            </div>
          </div>
        </div>
      )}

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        title="Орёл или Решка"
        scores={getStoredScores().map((s) => ({ name: s.name, score: s.streak }))}
        scoreLabel="Серия"
      />
    </div>
  );
};
