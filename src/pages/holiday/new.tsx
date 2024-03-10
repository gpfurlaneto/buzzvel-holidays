import HolidayForm, { HolidayFormSchemaType } from "@/components/HolidayForm";
import api from "@/libs/axios";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function NewHoliday(): ReactElement {
  const router = useRouter()
  const handleSubmit = async (value: HolidayFormSchemaType): Promise<void> => {
    await api.createHoliday({
      ...value,
      date: value.date.toISOString(),
    })
    router.push('/')
  }

  return (
    <div className="flex flex-col w-full">
      New Holiday
      <HolidayForm handleSubmit={handleSubmit} />
    </div>
  )
}