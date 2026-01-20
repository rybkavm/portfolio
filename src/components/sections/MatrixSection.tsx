import { useEffect, useRef } from "react";

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const MatrixSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create rain columns
    const columns = 20;
    const columnElements: HTMLDivElement[] = [];

    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.className = "matrix-column";
      const duration = 3 + Math.random() * 5;
      const initialOffset = Math.random() * duration;
      column.style.cssText = `
        position: absolute;
        top: -100%;
        left: ${(i / columns) * 100}%;
        width: ${100 / columns}%;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: matrix-fall ${duration}s linear infinite;
        animation-delay: -${initialOffset}s;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        color: hsl(142 90% 70%);
        text-shadow: 0 0 20px hsl(142 100% 60% / 1), 0 0 40px hsl(142 100% 55% / 0.9), 0 0 60px hsl(142 100% 50% / 0.6);
        font-weight: 700;
      `;

      // Generate random characters
      const charCount = 15 + Math.floor(Math.random() * 10);
      for (let j = 0; j < charCount; j++) {
        const char = document.createElement("span");
        char.textContent = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        char.style.opacity = `${1 - j * 0.04}`;
        if (j === 0) {
          char.style.color = "hsl(142 100% 95%)";
          char.style.textShadow = "0 0 30px white, 0 0 50px hsl(142 100% 75%), 0 0 70px hsl(142 100% 65%)";
        }
        column.appendChild(char);
      }

      container.appendChild(column);
      columnElements.push(column);
    }

    // Update characters periodically
    const interval = setInterval(() => {
      columnElements.forEach((column) => {
        const chars = column.querySelectorAll("span");
        chars.forEach((char) => {
          if (Math.random() > 0.95) {
            char.textContent = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
        });
      });
    }, 100);

    return () => {
      clearInterval(interval);
      columnElements.forEach((col) => col.remove());
    };
  }, []);

  return (
    <div className="pb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Матрица</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-mono">
          Чистый CSS + минимальный JS для рендеринга
        </p>
      </div>

      {/* Phone with Matrix effect */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Phone frame */}
          <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-3 shadow-2xl">
            {/* Phone bezel highlights */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-gray-600 via-transparent to-transparent opacity-30" />
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tl from-gray-600 via-transparent to-transparent opacity-20" />
            
            {/* Side buttons */}
            <div className="absolute -left-1 top-24 w-1 h-12 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-1 top-40 w-1 h-8 bg-gray-700 rounded-l-sm" />
            <div className="absolute -right-1 top-32 w-1 h-16 bg-gray-700 rounded-r-sm" />
            
            {/* Speaker */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-700 rounded-full" />
            
            {/* Camera */}
            <div className="absolute top-3 right-16 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
            </div>
            
            {/* Screen */}
            <div className="relative w-full h-full bg-black rounded-[32px] overflow-hidden">
              {/* Scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
              
              {/* Matrix rain container */}
              <div
                ref={containerRef}
                className="absolute inset-0 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.05) 100%)",
                }}
              />
              
              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Screen glow */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,255,65,0.15)] pointer-events-none" />
            </div>
          </div>
          
          {/* Phone shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-4 bg-black/30 rounded-full blur-xl" />
          
          {/* Ambient glow */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-primary rounded-full scale-110" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-col items-center gap-2 px-6 py-4 bg-card rounded-2xl border border-border">
          <code className="font-mono text-sm text-primary">
            @keyframes matrix-fall
          </code>
          <p className="text-xs text-muted-foreground">
            Анимация реализована на чистом CSS
          </p>
        </div>
      </div>
    </div>
  );
};
