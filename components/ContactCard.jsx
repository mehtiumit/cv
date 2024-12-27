'use client'
import { motion } from 'framer-motion'
import styles from '../styles/ContactCard.module.css'

export default function ContactCard({ icon: Icon, text, link }) {
  return (
    <motion.a 
      href={link}
      className={styles.contactCard}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={styles.icon} />
      <span>{text}</span>
    </motion.a>
  )
} 