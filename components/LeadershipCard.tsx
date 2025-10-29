'use client'

interface LeadershipCardProps {
  organization: string
  location: string
  role: string
  period: string
  bulletPoints: string[]
}

export default function LeadershipCard({ organization, location, role, period, bulletPoints }: LeadershipCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-dark-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{organization}</span>
          <span className="text-muted">/</span>
          <span className="text-sm text-muted">{location}</span>
        </div>
        <div className="text-sm text-muted">{period}</div>
      </div>
      <h4 className="mt-2 text-lg font-semibold">{role}</h4>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {bulletPoints.map((point, index) => (
          <li key={index} className="text-muted">{point}</li>
        ))}
      </ul>
    </div>
  )
}


