import { toast } from 'react-toastify'
import type { CallbackOnFailed } from '../types'

const reportOnError: CallbackOnFailed = toast.error

export default reportOnError
