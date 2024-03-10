import HolidayForm, { HolidayFormSchemaType } from "@/components/HolidayForm"
import api from "@/libs/axios"
import { Holiday } from "@/types/Holiday"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const holiday = await api.loadHoliday(ctx?.params?.id as string) 
 
  return { props: { holiday } }
})

interface EditHolidayProps {
  holiday: Holiday
}

export default function EditHoliday({ holiday }: EditHolidayProps) {

  const router = useRouter()
  const defaultValue = {
    ...holiday,
    date: new Date(holiday.date)
  }

  const handleSubmit = async (value: HolidayFormSchemaType): Promise<void> => {
    await api.updateHoliday(holiday.id as string, {
      ...value,
      date: value?.date?.toISOString()
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