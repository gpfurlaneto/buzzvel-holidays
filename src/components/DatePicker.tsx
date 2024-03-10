import { default as BaseDatePicker} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export interface DatePickerProps {
  id?: string
  label?: string
  error?: string
  placeholder?: string
  value: string | undefined
  onChange: (date: Date) => void
}

export default function DatePicker(
  { id, label, error, value, onChange, placeholder }: DatePickerProps
) {
  return (
    <div className="flex flex-col gap-1 pt-12 lg:pt-8 w-full">
      <label htmlFor={id}>{label}</label>
      <BaseDatePicker
        id={id}
        value={value}
        placeholderText={placeholder}
        onChange={onChange}
        className='bg-transparent outline-none border-b focus:border-red-600 w-full pl-2 pb-2'
      /> 
      {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
      </div>
  )
}


