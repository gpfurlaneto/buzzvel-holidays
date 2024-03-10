import { useState } from "react";
import HolidayCard from "@/components/HolidayCard";
import { Holiday } from "@/types/Holiday";
import Button from "@/components/Button";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { deleteHoliday, listAllHolidays } from "@/libs/axios";

export const getServerSideProps = (async () => {
  return { props: { holidays: await listAllHolidays() } }
})

interface HomeProps {
  holidays: Holiday[]
}

export default function Home({ holidays }: HomeProps) {
  
  const [allHolidays, setAllHolidays] = useState(holidays)
  const [holidayToDelete, setHolidayToDelete] = useState<null | Holiday>(null)
  const handleDelete =(holiday: Holiday) => {
    setHolidayToDelete(holiday)
  }

  const handleConfirmDelete = async () => {
    await deleteHoliday(holidayToDelete?.id as string)
    setAllHolidays(prev => prev.filter(item => item.id !== holidayToDelete?.id))
    setHolidayToDelete(null)
  }

  const handleCloseModal = () => {
    setHolidayToDelete(null)
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1>Holidays</h1>
        <Button variant="primary" href="/holiday/new">Create Holiday</Button>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {allHolidays.map(holiday => (
          <HolidayCard key={holiday.id} holiday={holiday} handleDelete={handleDelete} />
        ))}
      </div>
      <ConfirmationDialog 
        isOpen={!!holidayToDelete} 
        title="Confirm delete" 
        description={`Are you sure you want to delete the holiday "${holidayToDelete?.title}"?`}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
        
    </div>
  );
}
