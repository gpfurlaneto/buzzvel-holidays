import classnames from "classnames"
import { forwardRef } from "react"

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label?: string
  error?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, className, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1 w-full pt-12 lg:pt-8">
      <label htmlFor={id}>{label}</label>
      <input id={id} className={classnames('bg-transparent outline-none border-b focus:border-red-600 w-full pl-2 pb-2', className)} ref={ref} {...props} />
      {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
    </div>
  )
})
  