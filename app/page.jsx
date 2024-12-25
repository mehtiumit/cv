import ExperienceCard from "../components/ExperienceCard";
import AnimatedName from "../components/AnimatedName";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import LeadershipCard from '../components/LeadershipCard'
import AnimatedTitle from '../components/AnimatedTitle'
import SkillsCard from '../components/SkillsCard'
import InfoButton from '../components/InfoButton'
import styles from '../styles/Page.module.css'
import StickyMenu from '../components/StickyMenu'

const experiences = [
  {
    company: "Hepsiburada",
    workType: "Remote",
    position: "Back-End Developer",
    startDate: "August 2023",
    endDate: "Present",
    bulletPoints: [
      "Developed key advertising products (Sponsored Products, Sponsored Brands, FacebookAds, HepsiAds Campaigns) using .NET Core, Golang, Kafka, Redis, Elasticsearch, MongoDB, and Google BigQuery",
      "Collaborated with cross-functional teams including product management and QA to ensure timely delivery of high-quality software releases",
      "Developed and maintained microservices-based applications using Docker and Kubernetes for improved scalability and reliability",
      "Utilized Google BigQuery for data analytics and reporting, enabling data-driven decision making",
      "Configured and optimized Elasticsearch search engine to improve product search results and solve relevant product rotation in Sponsored Products",
      "Implemented Kafka messaging for real-time data processing and integration, improving system scalability",
      "Led migration from Elasticsearch to OpenSearch, optimizing search capabilities and data processing",
      "Implemented SOX compliance measures, ensuring adherence to financial and IT security standards",
    ],
  },
  {
    company: "Getir",
    workType: "Hybrid",
    position: "Back-End Developer",
    startDate: "July 2023",
    endDate: "August 2023",
    bulletPoints: [
      "Optimized application performance and reliability by utilizing Go, MongoDB, Redis, and unit testing as a Back-End Developer at Getir within the BiTaksi team.",
      "Collaborated with cross-functional teams to align backend development with front-end application requirements and corporate goals.",
      "Improved website performance and SEO metrics",
      "Contributed updates in backend systems, leading to more robust and scalable solutions.",
    ],
  },
  {
    company: "Hepsiburada via Tesodev",
    workType: "Remote",
    position: "Back-End Developer",
    startDate: "August 2021",
    endDate: "June 2023",
    bulletPoints: [
      "Worked as a Back-End Developer for the Hepsiburada HepsiAds team, focusing on the development and optimization of Sponsored Products, Sponsored Brands, FacebookAds, and HepsiAds campaigns.",
      "Utilized the same technology stack as in my subsequent internal role, including .NET Core, Golang,Kafka, Redis, Elasticsearch, MongoDB, and Google BigQuery.",
      "Contributed to significant revenue growth through enhancements in advertising products, mirroring the achievements detailed in my internal position at Hepsiburada.",
      "Collaborated closely with cross-functional teams to ensure the delivery of high-quality software releases, paralleling my later internal responsibilities.",
      "Maintained and scaled microservices-based applications, consistent with the practices adopted during my internal tenure."
    ],
  }
];

const leadershipActivities = [
  {
    organization: "GDG Antalya / WTM Antalya",
    location: "Antalya",
    role: "Event Organizer",
    period: "September 2018 - February 2020",
    bulletPoints: [
      "Coordinated and executed various events for GDG Antalya and Wtm Antalya, including speaker selection, logistics, and sponsorship agreements",
      "Managed event budgets, ensuring expenses were kept within allocated limits and that financial reports were accurate and timely",
      "Collaborated with cross-functional teams to plan and execute successful events, resulting in positive feedback from attendees and increased community engagement"
    ]
  }
]

export default function Home() {
  return (
    <div className={styles.container}>
      <StickyMenu />
      <header className={styles.header}>
        <div className={styles.titleLine}>
          <AnimatedName />
          <AnimatedTitle />
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <IoLocationOutline className="icon" />
            <span>Kepez, Antalya / Turkey</span>
          </div>
          <div className={styles.contactItem}>
            <HiOutlineMail className="icon" />
            <a href="mailto:mehtiumityildirim@gmail.com">
              mehtiumityildirim@gmail.com
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaLinkedinIn className="icon" />
            <a
              href="https://linkedin.com/in/mehtiumityildirim"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/mehtiumityildirim
            </a>
          </div>
          <div className={styles.contactItem}>
            <HiOutlinePhone className="icon" />
            <a href="tel:+905393873381">+90 539 387 33 81</a>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Leadership and Activities</h2>
        {leadershipActivities.map((activity, index) => (
          <LeadershipCard key={index} {...activity} />
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills & Interests</h2>
        <SkillsCard />
      </section>

      <InfoButton />
    </div>
  );
}
