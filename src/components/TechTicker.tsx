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

const techs = [
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "Prisma", icon: SiPrisma, color: "text-teal-400" },
  { name: "Postgres", icon: SiPostgresql, color: "text-blue-300" },
  { name: "Appwrite", icon: SiAppwrite, color: "text-pink-500" },
  { name: "Vercel AI SDK", icon: SiVercel, color: "text-white" },
  { name: "OpenRouter", icon: OpenRouter, color: "text-indigo-400" },
  { name: "Python", icon: SiPython, color: "text-yellow-300" },
  { name: "Docker", icon: SiDocker, color: "text-blue-500" },
  { name: "AWS", icon: SiAmazon, color: "text-orange-400" },
  { name: "System Design", icon: Network, color: "text-purple-400" },
];

const TechTicker = () => {
  return (
    <div className="w-full overflow-hidden relative py-4 sm:py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-8 sm:gap-12 w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Duplicate the list to create seamless loop */}
        {[...techs, ...techs].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2 group select-none"
          >
            <div className={`text-xl sm:text-2xl ${tech.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <tech.icon />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-400 group-hover:text-gray-200 transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechTicker;
