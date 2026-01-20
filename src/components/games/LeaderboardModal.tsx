import { X, Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  scores: { name: string; score: number }[];
  scoreLabel: string;
}

export const LeaderboardModal = ({
  isOpen,
  onClose,
  title,
  scores,
  scoreLabel,
}: LeaderboardModalProps) => {
  if (!isOpen) return null;

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-bold">Таблица лидеров</h4>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{title}</p>

        {scores.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>Пока нет рекордов</p>
            <p className="text-sm">Будьте первым!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {scores.slice(0, 5).map((entry, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  index === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary"
                }`}
              >
                <div className={`text-lg ${getMedalColor(index)}`}>
                  {index < 3 ? (
                    <Medal className="h-5 w-5" />
                  ) : (
                    <span className="w-5 text-center font-mono text-sm">#{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 font-mono text-sm truncate">{entry.name}</div>
                <div className="font-bold text-primary">
                  {entry.score} <span className="text-xs text-muted-foreground">{scoreLabel}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button onClick={onClose} className="w-full mt-6" variant="outline">
          Закрыть
        </Button>
      </div>
    </div>
  );
};
