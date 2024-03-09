import { forwardRef } from "react"
import Datepicker, { DatepickerType } from "react-tailwindcss-datepicker"

export interface DatePickerProps extends DatepickerType {
  label?: string
  error?: string
}

export default forwardRef<HTMLInputElement, DatePickerProps>(function Input(
  { inputId, label, error, ...props }
) {
  return (
    <div className="flex flex-col gap-1 pt-12 lg:pt-8 w-full">
      <label htmlFor={inputId}>{label}</label>
      <Datepicker 
        inputId={inputId}
        inputClassName='bg-transparent outline-none border-b focus:border-red-600 w-full pl-2 pb-2'
        {...props}
      /> 
      </div>
  )
})


