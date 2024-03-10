import dayjs from "dayjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Holiday } from "@/types/Holiday";
import { MouseEvent, useState } from "react";

interface HolidayCardProps {
  holiday: Holiday
  handleDelete: (holiday: Holiday) => void
}

export default function HolidayCard({ holiday, handleDelete: onDelete}: HolidayCardProps) {
  const { theme } = useTheme()
  const [showDetails, setShowDetails] = useState(false)
  const baseClassName = theme === 'light' ? 'shadow-light' : 'shadow-dark '
  
  const handleDetails = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onDelete(holiday)
  }

  return (
    <Link href={`/holiday/${holiday.id}`} className={`flex flex-row border rounded p-4 w-full ${baseClassName}`}>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row justify-between w-full">
          <span>{holiday.title}</span>
          <span>
          {dayjs(holiday.date.startDate).format('MM/DD/YYYY')}
          {' - '}
          {dayjs(holiday.date.endDate).format('MM/DD/YYYY')}
          </span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <span>{holiday.location}</span>
          <div className="flex flex-row gap-2">
            <button onClick={handleDetails}>{showDetails ? 'Hide details' : 'See details'}</button>
            <span>|</span>
            <button onClick={handleDelete} className="text-red-500">Delete</button>
          </div>
        </div>
        {showDetails && (
          <div>
            {holiday.description}
            <ul>
              {holiday.participants.map(participant => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  )
}



