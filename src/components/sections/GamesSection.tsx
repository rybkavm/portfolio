import { TicTacToe } from "@/components/games/TicTacToe";
import { CoinFlip } from "@/components/games/CoinFlip";
import { ShellGame } from "@/components/games/ShellGame";
import { Gamepad2 } from "lucide-react";

export const GamesSection = () => {
  return (
    <div className="pb-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-mono text-sm mb-4">
          <Gamepad2 className="h-4 w-4" />
          <span>TypeScript Powered</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Мини-игры</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Три интерактивные игры, созданные на TypeScript. 
          Все рекорды сохраняются локально!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TicTacToe />
        <CoinFlip />
        <ShellGame />
      </div>

      {/* Fun note */}
      <div className="mt-12 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">&gt;</span> Попробуйте побить все рекорды! 
          <span className="text-primary animate-pulse ml-1">_</span>
        </p>
      </div>
    </div>
  );
};
