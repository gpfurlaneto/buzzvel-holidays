import { useTheme } from "next-themes"
import Link from "next/link"
import { ReactNode } from "react"

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  className?: string
  variant: 'primary' | 'secondary' | 'neutral'
  href?: string
  children: string | ReactNode,
  disabled?: boolean
}

const hoverClassNames = {
  primary: 'hover:border-red-500 hover:text-red-500',
  secondary: 'hover:border-red-500 hover:bg-red-500',
  neutral: {
    light: 'hover:bg-red-500 hover:text-white', // border-red-500
    dark: 'hover:bg-black border-black hover:border-white'
  }
}

function getNeutralHoverClass(theme: string | undefined) {
  if (theme === 'light') {
    return hoverClassNames.neutral.light
  }

  return hoverClassNames.neutral.dark
}

export default function Button({
  className,
  variant,
  href,
  children,
  ...props
}: ButtonProps) {
  const { theme } = useTheme()
  const borderColor = theme === 'light' ? 'border-black' : 'border-white'
  const hoverClass = variant === 'neutral' ? getNeutralHoverClass(theme) : hoverClassNames[variant]
  const classNameValue = `border rounded px-10 p-2 text-center ${borderColor} ${hoverClass} ${className ?? ''}`

  if (href) {
    return <Link className={classNameValue} href={href} >{children}</Link>
  }

  return (
    <button className={classNameValue} {...props}>{children}</button>
  )
}