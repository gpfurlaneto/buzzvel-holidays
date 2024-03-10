import { Controller, useForm } from "react-hook-form";
import DatePicker from "../DatePicker";
import Input from "../Input";
import Participants from "../ParticipantsPanel";
import TextArea from "../TestArea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";

const holidayFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date({ required_error: 'Date is required' }),
  participants: z.array(z.string()).nullable().optional(),
  location: z.string().min(5, 'Location is required'),
})

interface HolidayFormProps {
  defaultValues?: HolidayFormSchemaType
  handleSubmit: (values: HolidayFormSchemaType) => Promise<void>
}

export type HolidayFormSchemaType = z.infer<typeof holidayFormSchema>

export default function HolidayForm({
  handleSubmit: submit,
  defaultValues
}: HolidayFormProps) {
  const {
    control,
    register,
    handleSubmit: onSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HolidayFormSchemaType>({
    defaultValues,
    resolver: zodResolver(holidayFormSchema),
  })

  const handleSubmit = async (values: HolidayFormSchemaType): Promise<void> => {
    await submit(values)
  }

  return (
    <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-2 w-full pb-10" >
      <Input aria-label='title' placeholder="Title" {...register('title')} error={errors.title?.message} />
      <TextArea aria-label='description' placeholder="Description" {...register('description')} error={errors.description?.message} />
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <DatePicker id='date' aria-label="date" placeholder="Date" onChange={onChange} value={value?.toLocaleDateString()} error={errors.date?.message} />
        )}
      />
      <Input aria-label='location' placeholder="Location" {...register('location')} error={errors.location?.message} />
      <Controller
        control={control}
        name="participants"
        render={({ field: { onChange, value } }) => (
          <Participants onChange={onChange} value={value ?? []} />
        )}
      />
      <div className="flex flex-col sm:flex-row gap-2 mx-auto sm:mr-0 sm:ml-auto w-full sm:w-fit">
        <Button variant='secondary' href="/" className="px-10 p-2 mt-4 w-full">Cancel</Button>
        <Button variant='primary' disabled={isSubmitting} className='rounded px-10 p-2 mt-4 w-full'>Submit</Button>
      </div>
    </form>
  )
}