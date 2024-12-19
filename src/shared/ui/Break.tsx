import { Fragment } from 'react/jsx-runtime'

interface BreakProps {
  value: string
}

export default function Break({ value }: BreakProps) {
  const text = value.split('\n')

  return text.map((separated, idx) => (
    <Fragment key={`${separated}-${idx}`}>
      {separated}
      {idx !== text.length - 1 && <br />}
    </Fragment>
  ))
}
