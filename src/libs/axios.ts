import { Holiday } from "@/types/Holiday";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL
});

let holidays: Holiday[] = [
  {
    _id: '1',
    title: 'Title 1',
    description: 'Description 1',
    date: new Date().toISOString(),
    participants: ['aaaaa', 'bbbbb'],
    location: 'aaaaaaaaaaaaa'
  },
  {
    _id: '2',
    title: 'Title 2',
    description: 'Description 2',
    date: new Date().toISOString(),
    participants: ['ccccc', 'ddddd'],
    location: 'eeeeeeeeeeeeeee'
  }
]
async function createHoliday(holiday: Holiday): Promise<void> {
  await axiosInstance.post('/holidays', holiday)
}

async function updateHoliday(id: string, holidayToEdit: Holiday): Promise<void> {
  await axiosInstance.put(`/holidays/${id}`, holidayToEdit)
}

async function loadHoliday(holidayId: string): Promise<Holiday> {
  const { data } = await axiosInstance.get(`/holidays/${holidayId}`)
  return data
}

async function deleteHoliday(holidayId: string): Promise<void> {
  await axiosInstance.delete(`/holidays/${holidayId}`)
}

async function listAllHolidays(): Promise<Holiday[]> {
  const response = await axiosInstance.get('/holidays')
  return response.data
}

const api = { 
  createHoliday,
  updateHoliday,
  loadHoliday,
  deleteHoliday,
  listAllHolidays,
  axiosInstance
}

export default api