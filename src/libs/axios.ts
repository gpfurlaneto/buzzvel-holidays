import { Holiday } from "@/types/Holiday";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000'
});

let holidays: Holiday[] = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Description 1',
    date: {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    },
    participants: ['aaaaa', 'bbbbb'],
    location: 'aaaaaaaaaaaaa'
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Description 2',
    date: {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    },
    participants: ['ccccc', 'ddddd'],
    location: 'eeeeeeeeeeeeeee'
  }
]
export async function createHoliday(holiday: Holiday): Promise<void> {
  holidays.push(holiday)
}

export async function updateHoliday(id: string, holidayToEdit: Holiday): Promise<void> {
  holidays = holidays.filter(holiday => holiday.id !== id)
  holidays.push({
    ...holidayToEdit,
    id
  })
}

export async function loadHoliday(holidayId: string): Promise<Holiday> {
  return holidays.find(holiday => holiday.id === holidayId) as Holiday
}
export async function deleteHoliday(holidayId: string): Promise<void> {
  holidays = holidays.filter(holiday => holiday.id !== holidayId)
}

export async function listAllHolidays(): Promise<Holiday[]> {
  return holidays
}
export { axiosInstance }