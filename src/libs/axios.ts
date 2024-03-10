import { Holiday } from "@/types/Holiday";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

async function createHoliday(holiday: Holiday): Promise<void> {
  console.log(axiosInstance)
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