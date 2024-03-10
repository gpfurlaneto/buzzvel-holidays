import { default as BaseDatePicker} from "react-datepicker";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import "react-datepicker/dist/react-datepicker.css";
export interface DatePickerProps {
  id?: string
  error?: string
  placeholder?: string
  value: string | undefined
  onChange: (date: Date) => void
  'aria-label'?: string
}

export default function DatePicker(
  { id, error, value, onChange, placeholder, 'aria-label': ariaLabel }: DatePickerProps
) {
  return (
    <div className="flex flex-col gap-1 pt-12 lg:pt-8 w-full">
      <VisuallyHidden.Root>
      <span id={`${id}-aria-label`}>{ariaLabel}</span>
      </VisuallyHidden.Root>
      <BaseDatePicker
        ariaLabelledBy={`${id}-aria-label`}
        id={id}
        value={value}
        placeholderText={placeholder}
        onChange={onChange}
        className='bg-transparent outline-none border-b focus:border-red-600 w-full pl-2 pb-2'
      /> 
      {error && <span role='alert' aria-label={error} className="text-red-500 text-sm ml-1">{error}</span>}
      </div>
  )
}


