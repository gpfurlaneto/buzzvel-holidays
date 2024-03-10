import classnames from "classnames"
import { forwardRef } from "react"


interface TextAreaProps extends React.ComponentPropsWithRef<'textarea'> {
  label?: string
  error?: string
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ id, label, error, className, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1 pt-12 lg:pt-8 w-full">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} className={classnames(
        'bg-transparent outline-none border-b focus:border-red-600 w-full h-9 focus:h-24 pl-2 pb-2',
        className)} ref={ref} {...props} />
      {error && <span role='alert' aria-label={error} className="text-red-500 text-sm ml-1">{error}</span>}
    </div>
  )
})
