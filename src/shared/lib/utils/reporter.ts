import { toast } from 'react-toastify'

type ReportFn = (message: string) => void

export const reportOnError: ReportFn = toast.error

export const reportOnSuccess: ReportFn = toast.success
