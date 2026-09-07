import Link from "next/link"

export function Breadcrumbs({
  items,
}: {
  items: { href: string; label: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              {last ? (
                <span className="text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
