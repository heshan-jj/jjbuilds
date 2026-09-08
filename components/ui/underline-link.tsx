import Link from "next/link"
import { cn } from "@/lib/utils"

export function UnderlineLink({
  children,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-smooth",
        "hover:before:origin-left hover:before:scale-x-100"
      )}
    >
      {children}
    </Link>
  )
}
