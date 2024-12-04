export default function extractMarkdownTitle(value: string) {
  if (!value) {
    return ''
  }

  const match = /# (.*?)\n/g.exec(value)

  if (!match || !match[1]) {
    return ''
  }

  return match[1]
}
