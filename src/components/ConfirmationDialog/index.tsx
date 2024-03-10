import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Button from "../Button"
import { useTheme } from "next-themes"

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  const { theme } = useTheme()
  const className = theme === 'light' ? 'border-gray-100 bg-white' : 'border-white bg-black'
  return (
    <Transition appear show={isOpen} as={Fragment}>

      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">

          <div className="flex min-h-full items-center justify-center p-4 text-center">

            <Dialog.Panel className={`${className} w-full max-w-md transorm overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all border`}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6"
              >
                {title}
              </Dialog.Title>

              <div className="mt-4">
                <p className="text-sm">
                  {description}
                </p>
              </div>

              <div className="flex flex-row gap-2 w-fit ml-auto mt-8">
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button variant="primary" onClick={onConfirm}>Confirm</Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}