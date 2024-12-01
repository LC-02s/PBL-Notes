import { toast } from 'react-toastify'
import type { ReportFn } from '../types'

export const reportOnError: ReportFn = toast.error

export const reportOnSuccess: ReportFn = toast.success
