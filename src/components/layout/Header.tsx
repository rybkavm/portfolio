import { Moon, Sun, Terminal } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "about", label: "Обо мне" },
  { id: "interests", label: "Интересы" },
  { id: "gallery", label: "Галерея" },
  { id: "games", label: "Мини-игры" },
  { id: "matrix", label: "Матрица" },
];

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Terminal className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-mono text-lg font-bold">
              <span className="text-primary">&lt;</span>
              Виктор
              <span className="text-primary">/&gt;</span>
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-2 font-mono text-sm transition-colors tab-indicator ${
                  activeTab === tab.id
                    ? "text-primary active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden"
          >
            <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            <span className="sr-only">Переключить тему</span>
          </Button>
        </div>

        {/* Navigation - Mobile */}
        <nav className="flex md:hidden items-center gap-1 pb-3 overflow-x-auto scrollbar-hide flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 font-mono text-xs rounded-full transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
