import { useEffect, useState } from "react";
import HolidayCard from "@/components/HolidayCard";
import { Holiday } from "@/types/Holiday";
import Button from "@/components/Button";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import api from "@/libs/axios";
import { PDFDownload } from "@/components/PDFDownload";

export const getServerSideProps = (async () => {
  return { props: { holidays: await api.listAllHolidays() } }
})

interface HomeProps {
  holidays: Holiday[]
}

interface DocumentProps {
  holidays: Holiday[]
}

export default function Home({ holidays }: HomeProps) {

  const [allHolidays, setAllHolidays] = useState(holidays)
  const [holidayToDelete, setHolidayToDelete] = useState<null | Holiday>(null)
  const [initiated, setInitiated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInitiated(true)
    }
  }, [])

  const handleDelete = (holiday: Holiday) => {
    setHolidayToDelete(holiday)
  }

  const handleConfirmDelete = async () => {
    await api.deleteHoliday(holidayToDelete?._id as string)
    setAllHolidays(prev => prev.filter(item => item._id !== holidayToDelete?._id))
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
      {initiated && allHolidays.length > 0 && <div className="ml-auto w-fit mt-2"><PDFDownload holidays={allHolidays} /></div>}
      <div className="flex flex-col gap-4 mt-8">
        {allHolidays.map(holiday => (
          <HolidayCard key={holiday._id} holiday={holiday} handleDelete={handleDelete} />
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
