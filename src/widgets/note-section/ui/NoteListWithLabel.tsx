interface NoteListLabelProps {
  prefix: string
  length: number
}

export default function NoteListWithLabel({
  length,
  prefix,
  children,
}: React.PropsWithChildren<NoteListLabelProps>) {
  if (length <= 0) {
    return null
  }

  return (
    <li>
      <h3 className="mb-2 w-full px-0.5 text-sm text-gray500 transition-colors">{`${prefix} Notes (${length})`}</h3>
      {children}
    </li>
  )
}
