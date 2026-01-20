import { Code, Gamepad2, Coins, Plane, Coffee } from "lucide-react";

const interests = [
  {
    icon: Code,
    title: "Программирование",
    description: "Создание веб-приложений и изучение новых технологий — моя страсть",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Gamepad2,
    title: "Видеоигры",
    description: "Люблю новинки от Sony, особенно Человека-паука",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Coins,
    title: "Коллекционирование",
    description: "Собираю купюры разных стран и долларовый миллиардер, если верить банку Зимбабве",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Plane,
    title: "Путешествия",
    description: "Исследую новые места и культуры при каждой возможности",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    icon: Coffee,
    title: "Кофе",
    description: "Ценитель хорошего кофе и альтернативных способов заваривания",
    gradient: "from-amber-600 to-orange-600",
  },
];

export const InterestsSection = () => {
  return (
    <div className="pb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Мои <span className="gradient-text">увлечения</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Интересы, которые вдохновляют меня и помогают развиваться
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {interests.map((interest, index) => (
          <div
            key={interest.title}
            className="group relative bg-card rounded-2xl border border-border overflow-hidden card-hover animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative p-6">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                <interest.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {interest.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {interest.description}
              </p>
            </div>

            {/* Bottom decoration */}
            <div className={`h-1 bg-gradient-to-r ${interest.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </div>
        ))}
      </div>

      {/* Fun fact */}
      <div className="mt-12 bg-card rounded-2xl border border-border p-8 text-center">
        <div className="font-mono text-sm text-primary mb-4">
          <span className="opacity-60">//</span> fun_fact.js
        </div>
        <p className="text-lg text-muted-foreground">
          Когда я не пишу код, я скорее всего где-то в горах с любимой женой или играю в 
          <span className="text-primary"> Человека-паука</span> 🕷️
        </p>
      </div>
    </div>
  );
};
