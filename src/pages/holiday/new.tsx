import HolidayForm from "@/components/HolidayForm";
import { ReactElement } from "react";

export default function NewHoliday(): ReactElement {
  const handleSubmit = () => {

  }
  return (
    <div className="flex flex-col w-full max-w-screen-md mx-auto">
      New Holiday
      <HolidayForm handleSubmit={handleSubmit}/>
    </div>
  )
}