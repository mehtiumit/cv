// Project data model and sample data (TypeScript)
// Each project contains all fields needed for project cards

import enTranslations from './translations/en.json'
import trTranslations from './translations/tr.json'

export type Platform = 'web' | 'android' | 'ios'

export interface ProjectData {
  id: string
  title: string
  description: string
  purpose?: string
  features?: string[]
  platform: Platform
  technologies: string[]
  link?: string
  githubLink?: string
  featured: boolean
  completionDate?: string
}

export const projects: ProjectData[] = [
  // Web Projects
  {
    id: 'web-1',
    title: 'E-Commerce Dashboard',
    description:
      'Modern and responsive e-commerce management panel. Includes real-time sales analytics, product management, and customer tracking system.',
    purpose:
      'Streamline e-commerce business operations with comprehensive analytics and management tools',
    features: [
      'Real-time sales analytics and reporting',
      'Product inventory management system',
      'Customer tracking and behavior analysis',
      'Interactive charts and data visualization',
      'Responsive design for all devices',
    ],
    platform: 'web',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    link: 'https://ecommerce-dashboard-demo.com',
    githubLink: 'https://github.com/username/ecommerce-dashboard',
    featured: true,
    completionDate: '2024-01',
  },
  {
    id: 'web-2',
    title: 'Portfolio Website',
    description:
      'Personal portfolio website. A modern CV site with dark/light theme support, animations, and responsive design.',
    purpose:
      'Showcase professional skills and projects with an engaging, modern web presence',
    features: [
      'Dark and light theme toggle',
      'Smooth animations and transitions',
      'Fully responsive design',
      'Project showcase with filtering',
      'Contact form integration',
    ],
    platform: 'web',
    technologies: ['Next.js', 'React', 'CSS Modules', 'Framer Motion'],
    link: 'https://portfolio-demo.com',
    githubLink: 'https://github.com/username/portfolio',
    featured: true,
    completionDate: '2024-02',
  },
  {
    id: 'web-3',
    title: 'Task Management App',
    description:
      'Task management application developed for team collaboration. Features Kanban board, time tracking, and project analytics.',
    purpose:
      'Enhance team productivity through organized task management and collaboration tools',
    features: [
      'Kanban board for visual task organization',
      'Time tracking and productivity metrics',
      'Real-time collaboration with team members',
      'Project analytics and reporting',
      'Task assignment and deadline management',
    ],
    platform: 'web',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    link: 'https://taskmanager-demo.com',
    githubLink: 'https://github.com/username/task-manager',
    featured: false,
    completionDate: '2023-12',
  },

  // Android Projects
  {
    id: 'android-1',
    title: 'Fitness Tracker',
    description:
      'Comprehensive fitness application with daily activity tracking, exercise plans, and nutrition monitoring.',
    purpose:
      'Help users maintain a healthy lifestyle through comprehensive fitness tracking and guidance',
    features: [
      'Daily activity and step tracking',
      'Personalized exercise plans and workouts',
      'Nutrition monitoring and calorie counting',
      'Progress tracking with charts and statistics',
      'Goal setting and achievement rewards',
    ],
    platform: 'android',
    technologies: [
      'Kotlin',
      'Android Jetpack',
      'Room Database',
      'Retrofit',
      'Material Design',
    ],
    link: 'https://play.google.com/store/apps/fitness-tracker',
    githubLink: 'https://github.com/username/fitness-tracker-android',
    featured: true,
    completionDate: '2024-01',
  },
  {
    id: 'android-2',
    title: 'Weather App',
    description:
      'Modern weather application featuring current weather information, 7-day forecasts, and interactive maps.',
    purpose:
      'Provide accurate and detailed weather information with intuitive visual presentation',
    features: [
      'Current weather conditions and temperature',
      '7-day detailed weather forecast',
      'Interactive weather maps and radar',
      'Location-based weather alerts',
      'Hourly weather predictions',
    ],
    platform: 'android',
    technologies: ['Java', 'Android SDK', 'OpenWeatherMap API', 'Google Maps API'],
    link: 'https://play.google.com/store/apps/weather-app',
    githubLink: 'https://github.com/username/weather-android',
    featured: false,
    completionDate: '2023-11',
  },
  {
    id: 'android-3',
    title: 'Note Taking App',
    description:
      'Advanced note-taking application with Markdown support, category system, and cloud synchronization.',
    purpose: 'Organize thoughts and information efficiently with advanced note-taking capabilities',
    features: [
      'Markdown support for rich text formatting',
      'Category and tag organization system',
      'Cloud synchronization across devices',
      'Search functionality within notes',
      'Export notes in multiple formats',
    ],
    platform: 'android',
    technologies: ['Kotlin', 'MVVM', 'Firebase', 'Room', 'Material You'],
    githubLink: 'https://github.com/username/notes-android',
    featured: false,
    completionDate: '2023-10',
  },

  // iOS Projects
  {
    id: 'ios-1',
    title: 'Budget Tracker',
    description:
      'Budget tracking application developed for personal finance management. Features expense categories, charts, and goal setting.',
    purpose:
      'Empower users to take control of their finances through detailed budget tracking and analysis',
    features: [
      'Expense categorization and tracking',
      'Visual charts and spending analytics',
      'Budget goal setting and monitoring',
      'Recurring transaction management',
      'Financial insights and recommendations',
    ],
    platform: 'ios',
    technologies: ['Swift', 'SwiftUI', 'Core Data', 'Charts Framework', 'CloudKit'],
    link: 'https://apps.apple.com/app/budget-tracker',
    githubLink: 'https://github.com/username/budget-tracker-ios',
    featured: true,
    completionDate: '2024-02',
  },
  {
    id: 'ios-2',
    title: 'Recipe Book',
    description:
      'Recipe application featuring recipe collection, shopping list creation, and nutritional value calculation.',
    purpose: 'Simplify cooking and meal planning with organized recipes and smart shopping features',
    features: [
      'Comprehensive recipe collection and search',
      'Automatic shopping list generation',
      'Nutritional value calculation and tracking',
      'Step-by-step cooking instructions',
      'Recipe sharing and favorites system',
    ],
    platform: 'ios',
    technologies: ['Swift', 'UIKit', 'Core Data', 'AVFoundation', 'Vision Framework'],
    link: 'https://apps.apple.com/app/recipe-book',
    githubLink: 'https://github.com/username/recipe-book-ios',
    featured: false,
    completionDate: '2023-12',
  },
  {
    id: 'ios-3',
    title: 'Meditation App',
    description:
      'Mindfulness application featuring daily meditation sessions, breathing exercises, and sleep stories.',
    purpose:
      'Promote mental wellness and mindfulness through guided meditation and relaxation techniques',
    features: [
      'Daily guided meditation sessions',
      'Breathing exercises and techniques',
      'Sleep stories and relaxation sounds',
      'Progress tracking and streaks',
      'Personalized meditation recommendations',
    ],
    platform: 'ios',
    technologies: ['SwiftUI', 'Combine', 'AVAudioPlayer', 'HealthKit', 'StoreKit'],
    link: 'https://apps.apple.com/app/meditation-app',
    githubLink: 'https://github.com/username/meditation-ios',
    featured: true,
    completionDate: '2024-01',
  },
]

export const getProjectsByPlatform = (platform: Platform | 'all'): ProjectData[] => {
  if (platform === 'all') return projects
  return projects.filter((project) => project.platform === platform)
}

export const getFeaturedProjects = (): ProjectData[] => {
  return projects.filter((project) => project.featured)
}

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find((project) => project.id === id)
}

export const platformOptions: Array<{ value: 'all' | Platform; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
]

// Function to get localized project data
export const getLocalizedProjects = (language: 'en' | 'tr' = 'en'): ProjectData[] => {
  const translations = language === 'tr' ? (trTranslations as any) : (enTranslations as any)

  return projects.map((project) => {
    const localizedData = translations.projectData?.[project.id]
    if (localizedData) {
      return {
        ...project,
        title: localizedData.title,
        description: localizedData.description,
        purpose: localizedData.purpose,
        features: localizedData.features,
      }
    }
    return project
  })
}

export const getLocalizedProjectsByPlatform = (
  platform: Platform | 'all',
  language: 'en' | 'tr' = 'en'
): ProjectData[] => {
  const localized = getLocalizedProjects(language)
  if (platform === 'all') return localized
  return localized.filter((p) => p.platform === platform)
}

export const getLocalizedFeaturedProjects = (language: 'en' | 'tr' = 'en'): ProjectData[] => {
  return getLocalizedProjects(language).filter((p) => p.featured)
}

export const getLocalizedProjectById = (
  id: string,
  language: 'en' | 'tr' = 'en'
): ProjectData | undefined => {
  return getLocalizedProjects(language).find((p) => p.id === id)
}

export default projects


