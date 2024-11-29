import React from 'react'

interface BreakProps {
  value: string
}

export default function Break({ value }: BreakProps) {
  const text = value.split('\n')

  return text.map((separated, idx) => (
    <React.Fragment key={`${separated}-${idx}`}>
      {separated}
      {idx !== text.length - 1 && <br />}
    </React.Fragment>
  ))
}
