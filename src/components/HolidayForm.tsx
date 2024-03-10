import { Controller, useForm } from "react-hook-form";
import DatePicker from "./DatePicker";
import Input from "./Input";
import Participants from "./Participants";
import TextArea from "./TextArea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTheme } from "next-themes";
import Button from "./Button";

const holidayFormSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  description: z.string().min(5, 'Title is required'),
  date: z.coerce.date(),
  participants: z.array(z.string()),
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
    <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-2 w-full" >
      <Input placeholder="Title" {...register('title')} error={errors.title?.message}/>
      <TextArea placeholder="Description" {...register('description')} error={errors.description?.message}/>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <DatePicker placeholder="Date" onChange={onChange} value={value?.toLocaleDateString()} error={errors.date?.message ? 'Date is required' : ''}/>
        )}
      />
      <Input placeholder="Location" {...register('location')} error={errors.location?.message}/>
      <Controller
        control={control}
        name="participants"
        render={({ field: { onChange, value } }) => (
          <Participants onChange={onChange} value={value} />
        )}
      />
      <div className="flex flex-row gap-2 ml-auto">
      <Button variant='secondary' href="/" className="px-10 p-2 mt-4 w-fit">Cancel</Button>
      <Button variant='primary' disabled={isSubmitting} className='rounded px-10 p-2 mt-4 w-fit'>Submit</Button>
      </div>
    </form>
  )
}