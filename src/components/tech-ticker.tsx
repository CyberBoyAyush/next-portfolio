"use client";

import { motion } from "framer-motion";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiAppwrite,
  SiVercel,
  SiTailwindcss,
  SiDocker,
  SiAmazon,
  SiNodedotjs,
  SiPython,
} from "react-icons/si";
import { OpenRouter } from "@lobehub/icons";
import { Network } from "lucide-react";
import { useThemeSafe } from "./theme-provider";

interface TechItem {
  name: string;
  icon: React.ComponentType;
  darkColor: string;
  lightColor: string;
}

const techs: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, darkColor: "text-blue-400", lightColor: "text-blue-600" },
  { name: "React", icon: SiReact, darkColor: "text-cyan-400", lightColor: "text-cyan-600" },
  { name: "Next.js", icon: SiNextdotjs, darkColor: "text-white", lightColor: "text-gray-900" },
  { name: "Tailwind", icon: SiTailwindcss, darkColor: "text-cyan-300", lightColor: "text-cyan-600" },
  { name: "Node.js", icon: SiNodedotjs, darkColor: "text-green-500", lightColor: "text-green-600" },
  { name: "Prisma", icon: SiPrisma, darkColor: "text-teal-400", lightColor: "text-teal-600" },
  { name: "Postgres", icon: SiPostgresql, darkColor: "text-blue-300", lightColor: "text-blue-600" },
  { name: "Appwrite", icon: SiAppwrite, darkColor: "text-pink-500", lightColor: "text-pink-600" },
  { name: "Vercel AI SDK", icon: SiVercel, darkColor: "text-white", lightColor: "text-gray-900" },
  { name: "OpenRouter", icon: OpenRouter, darkColor: "text-indigo-400", lightColor: "text-indigo-600" },
  { name: "Python", icon: SiPython, darkColor: "text-yellow-300", lightColor: "text-yellow-600" },
  { name: "Docker", icon: SiDocker, darkColor: "text-blue-500", lightColor: "text-blue-600" },
  { name: "AWS", icon: SiAmazon, darkColor: "text-orange-400", lightColor: "text-orange-600" },
  { name: "System Design", icon: Network, darkColor: "text-purple-400", lightColor: "text-purple-600" },
];

const TechTicker = () => {
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

  return (
    <div className="w-full overflow-hidden relative py-4 sm:py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-8 sm:gap-12 w-max"
        style={{ willChange: "transform" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...techs, ...techs].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2 group select-none"
          >
            <div className={`text-xl sm:text-2xl ${isLight ? tech.lightColor : tech.darkColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <tech.icon />
            </div>
            <span className={`text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              isLight 
                ? 'text-gray-500 group-hover:text-gray-700' 
                : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechTicker;
