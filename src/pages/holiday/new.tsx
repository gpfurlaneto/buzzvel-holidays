import HolidayForm, { HolidayFormSchemaType } from "@/components/HolidayForm";
import { createHoliday } from "@/libs/axios";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function NewHoliday(): ReactElement {
  const router = useRouter()
  const handleSubmit = async (value: HolidayFormSchemaType): Promise<void> => {
    await createHoliday({
      ...value,
      date: {
        startDate: value?.date?.startDate?.toISOString(),
        endDate: value?.date?.endDate?.toISOString()
      }
    })
    router.push('/')
  }

  return (
    <div className="flex flex-col w-full">
      New Holiday
      <HolidayForm handleSubmit={handleSubmit}/>
    </div>
  )
}