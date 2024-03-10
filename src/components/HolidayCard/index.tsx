import dayjs from "dayjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Holiday } from "@/types/Holiday";
import { MouseEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faMapLocation, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface HolidayCardProps {
  holiday: Holiday
  handleDelete: (holiday: Holiday) => void
}

export default function HolidayCard({ holiday, handleDelete: onDelete }: HolidayCardProps) {
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
    <Link href={`/holiday/${holiday._id}`} className={`flex flex-row border rounded p-4 w-full ${baseClassName}`}>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row justify-between w-full">
          <h3 className="font-extrabold">{holiday.title}</h3>
          <span>
            {dayjs(holiday.date).format('MM/DD/YYYY')}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} width={18} height={18} />
            {holiday.location}
          </div>
          <div className="flex flex-row gap-2 ml-auto">
            <button onClick={handleDetails}>{showDetails ? 'Hide details' : 'See details'}</button>
            <span>|</span>
            <button onClick={handleDelete} className="text-red-500">Delete</button>
          </div>
        </div>
        {showDetails && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Description:</label>
              <span>{holiday.description}</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Participants:</label>
              <ul>
                {holiday?.participants?.map(participant => (
                  <li key={participant}>{participant}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}



