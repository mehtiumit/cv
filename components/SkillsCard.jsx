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
import styles from "../styles/SkillsCard.module.css";

const techStack = [
  {
    icon: SiDotnet,
    name: ".NET Core",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiGo,
    name: "Golang",
    companies: ["Hepsiburada", "Getir"],
  },
  {
    icon: SiApachekafka,
    name: "Kafka",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiElasticsearch,
    name: "Elasticsearch",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiDocker,
    name: "Docker",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiGit,
    name: "Git",
    companies: ["Hepsiburada", "Getir"],
  },
  {
    icon: SiMysql,
    name: "SQL",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiGooglecloud,
    name: "BigQuery",
    companies: ["Hepsiburada"],
  },
  {
    icon: SiRedis,
    name: "Redis",
    companies: ["Hepsiburada", "Getir"],
  },
  {
    icon: SiMongodb,
    name: "MongoDB",
    companies: ["Hepsiburada", "Getir"],
  },
  {
    icon: BiBrain,
    name: "Prompt Engineering",
    companies: ["Personal Projects", "Hepsiburada", "Getir"],
  },
];

const SkillsCard = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className={styles["skills-card"]}>
      <div className={styles["skills-section"]}>
        <h3>Technical</h3>
        <div className={styles["tech-grid"]}>
          {techStack.map((tech, index) => (
            <div
              key={index}
              className={styles["tech-item"]}
              onMouseEnter={() => setActiveTooltip(index)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <tech.icon className="tech-icon" />
              <span>{tech.name}</span>
              {activeTooltip === index && (
                <div className={styles["tech-tooltip"]}>
                  <div className={styles.companies}>
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

      <div className={styles["additional-section"]}>
        <div className={styles["language-section"]}>
          <h3>Language</h3>
          <div className={styles["info-item"]}>
            <IoLanguage className={styles["info-icon"]} />
            <span>English (Upper Intermediate)</span>
          </div>
        </div>

        <div className={styles["interests-section"]}>
          <h3>Interests</h3>
          <div className={styles["interests-list"]}>
            <div className={styles["info-item"]}>
              <GiPublicSpeaker className={styles["info-icon"]} />
              <span>Debate</span>
            </div>
            <div className={styles["info-item"]}>
              <FaCamera className={styles["info-icon"]} />
              <span>Amateur Photography</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
