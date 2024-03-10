import HolidayForm, { HolidayFormSchemaType } from "@/components/HolidayForm"
import { loadHoliday, updateHoliday } from "@/libs/axios"
import { Holiday } from "@/types/Holiday"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const holiday = await loadHoliday(ctx?.params?.id as string) 
 
  return { props: { holiday } }
})

interface EditHolidayProps {
  holiday: Holiday
}

export default function EditHoliday({ holiday }: EditHolidayProps) {

  const router = useRouter()
  const defaultValue = {
    ...holiday,
    date: {
      startDate: new Date(holiday.date.startDate),
      endDate: new Date(holiday.date.endDate)
    }
  }

  delete defaultValue.id
  const handleSubmit = async (value: HolidayFormSchemaType): Promise<void> => {
    await updateHoliday(holiday.id as string, {
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
      Edit Holiday
      <HolidayForm defaultValues={defaultValue} handleSubmit={handleSubmit}/>
    </div>
  )
}