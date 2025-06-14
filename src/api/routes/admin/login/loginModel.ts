import DB_URL from '@/api/serverHelpers/DB_URL'
import { IAdmin, ILoginData, IResponse } from '@/interfaces'
import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const adminLogin = async (body: ILoginData) => (await axios.post<IResponse<IAdmin>>(`${DB_URL}/admin/auth`, body)).data
