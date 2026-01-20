import { Github, Send, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Author */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span> Разработал{" "}
            <span className="text-foreground font-medium">Рыбка Виктор</span>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rybkavm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-all hover:bg-primary hover:shadow-neon"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </a>
            <a
              href="https://t.me/rvmgitclone"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-all hover:bg-primary hover:shadow-neon"
            >
              <Send className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </a>
          </div>

          {/* Right - Phone */}
          <a
            href="tel:+79385043377"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>+7 (938) 504-33-77</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
};
