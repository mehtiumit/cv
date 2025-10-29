"use client";

import { useState } from "react";
import {
  SiDotnet,
  SiGo,
  SiApachekafka,
  SiElasticsearch,
  SiDocker,
  SiGit,
  SiMysql,
  SiGooglecloud,
  SiRedis,
  SiMongodb,
} from "react-icons/si";
import { BiBrain } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { GiPublicSpeaker } from "react-icons/gi";
import { useTranslation } from "../context/LanguageContext";

type TechItem = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  companies: string[];
};

const techStack: TechItem[] = [
  { icon: SiDotnet, name: ".NET Core", companies: ["Hepsiburada"] },
  { icon: SiGo, name: "Golang", companies: ["Hepsiburada", "Getir"] },
  { icon: SiApachekafka, name: "Kafka", companies: ["Hepsiburada"] },
  { icon: SiElasticsearch, name: "Elasticsearch", companies: ["Hepsiburada"] },
  { icon: SiDocker, name: "Docker", companies: ["Hepsiburada"] },
  { icon: SiGit, name: "Git", companies: ["Hepsiburada", "Getir"] },
  { icon: SiMysql, name: "SQL", companies: ["Hepsiburada"] },
  { icon: SiGooglecloud, name: "BigQuery", companies: ["Hepsiburada"] },
  { icon: SiRedis, name: "Redis", companies: ["Hepsiburada", "Getir"] },
  { icon: SiMongodb, name: "MongoDB", companies: ["Hepsiburada", "Getir"] },
  {
    icon: BiBrain,
    name: "Prompt Engineering",
    companies: ["Personal Projects", "Hepsiburada", "Getir"],
  },
];

export default function SkillsCard() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-dark-background">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">{t("content.skills.sections.technical")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="relative flex items-center space-x-2"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <tech.icon className="text-muted" />
                <span>{tech.name}</span>
                {activeTooltip === index && (
                  <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white">
                    <div className="flex flex-col space-y-1">
                      {tech.companies.map((company, idx) => (
                        <span key={idx}>{company}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold">{t("content.skills.sections.language")}</h3>
            <div className="mt-4 flex items-center space-x-2">
              <IoLanguage className="text-muted" />
              <span>
                {t("content.skills.languages.english.name")} (
                {t("content.skills.languages.english.level")})
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t("content.skills.sections.interests")}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <GiPublicSpeaker className="text-muted" />
                <span>{t("content.skills.interests.debate.name")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCamera className="text-muted" />
                <span>{t("content.skills.interests.photography.name")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
