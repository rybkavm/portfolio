import { Code, Briefcase, MapPin } from "lucide-react";
import photo1 from "@/assets/photo-1.jpg";

const techStack = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Git", "REST API", "Figma"
];

const experience = {
  title: "Junior Frontend Developer",
  company: "Here could be your company",
  period: "2025 — Present",
  responsibilities: [
    "Верстка и базовая разработка на JavaScript",
    "Создание адаптивных сайтов",
    "Разработка веб-приложений на React и TypeScript",
  ],
};

export const AboutSection = () => {
  return (
    <div className="space-y-24 pb-12">
      {/* Intro Section */}
      <section className="min-h-[60vh] flex items-center">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Avatar with Matrix overlay */}
              <div className="relative">
                <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-gradient-primary p-1 shadow-neon">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img 
                      src={photo1} 
                      alt="Виктор Рыбка" 
                      className="w-full h-full object-cover"
                    />
                    {/* Matrix overlay */}
                    <div className="absolute inset-0 pointer-events-none matrix-photo-overlay" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-card">
                  <span className="font-mono text-sm text-primary">
                    <span className="text-muted-foreground">&lt;</span>
                    developer
                    <span className="text-muted-foreground">/&gt;</span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="font-mono text-sm text-primary mb-2">
                  <span className="opacity-60">//</span> Привет, мир!
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Я <span className="gradient-text">Виктор Рыбка</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-lg">
                  Frontend-разработчик с страстью к созданию интерактивных и 
                  визуально впечатляющих веб-приложений
                </p>
                
                {/* Terminal-style info */}
                <div className="bg-terminal-bg rounded-lg p-4 font-mono text-sm border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-muted-foreground">terminal</span>
                  </div>
                  <div className="text-terminal-text">
                    <p><span className="text-primary">$</span> whoami</p>
                    <p className="ml-4 text-foreground">Frontend Developer @ Web</p>
                    <p><span className="text-primary">$</span> location</p>
                    <p className="ml-4 text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Россия, Краснодар
                    </p>
                    <p className="cursor-blink"><span className="text-primary">$</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Stack Section */}
      <section>
          <div className="flex items-center gap-4 mb-8">
            <Code className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Стек</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <div
                key={tech}
                className="px-6 py-3 bg-card rounded-xl border border-border font-mono text-sm hover:bg-primary hover:text-primary-foreground hover:shadow-neon transition-all duration-300 cursor-default animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

      {/* Experience Section */}
      <section>
          <div className="flex items-center gap-4 mb-8">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Опыт работы</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

            <div className="relative pl-12 animate-fade-in">
              {/* Timeline dot */}
              <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-primary shadow-neon flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>

              <div className="bg-card rounded-xl p-6 border border-border card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <span className="text-sm text-primary font-mono">@ {experience.company}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 font-mono">
                  {experience.period}
                </p>
                <ul className="space-y-2">
                  {experience.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};
