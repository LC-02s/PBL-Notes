export default function extractMarkdownTitle(value: string) {
  if (!value) {
    return ''
  }

  const match = /# (.*?)\n/g.exec(value)

  if (!match || !match[1].trim()) {
    return value.replace('#', '').trim().split('\n')[0]
  }

  return match[1]
}
