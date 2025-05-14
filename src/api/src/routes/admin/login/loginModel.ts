import axios from 'axios'
import { IAdmin, ILoginData, IResponse } from '../../../../../interfaces'

const URL = 'https://projectbf-29lq.onrender.com/admin/auth'

// eslint-disable-next-line import/prefer-default-export
export const adminLogin = async (body: ILoginData) => (await axios.post<IResponse<IAdmin>>(URL, body)).data
