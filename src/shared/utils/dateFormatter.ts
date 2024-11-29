import dayjs, { type ConfigType } from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export default function formatDateFromNow(date: ConfigType) {
  const now = dayjs().format('YYYY-MM-DD')

  return dayjs(date).from(now)
}
