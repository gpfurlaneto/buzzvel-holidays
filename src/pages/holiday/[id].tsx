import HolidayForm, { HolidayFormSchemaType } from "@/components/HolidayForm"

export const getServerSideProps = (async () => {
  
  const holiday = {
    title: 'Title 1',
    description: 'Description 2',
    date: {
      startDate: new Date().toString(),
      endDate: new Date().toString()
    },
    participants: ['aaaaa', 'bbbbb'],
    location: 'aaaaaaaaaaaaa'
  }
  return { props: { holiday } }
})

interface EditHolidayProps {
  holiday: HolidayFormSchemaType
}

export default function EditHoliday({ holiday }: EditHolidayProps) {
  return (
    <div className="flex flex-col w-full max-w-screen-md mx-auto">
      Edit Holiday
      <HolidayForm defaultValues={holiday} handleSubmit={() => {}}/>
    </div>
  )
}