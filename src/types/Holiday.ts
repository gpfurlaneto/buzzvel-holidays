export type Holiday = {
  id?: string
  title: string
  description: string
  date: {
    startDate: string
    endDate: string
  },
  participants: string[]
  location: string
}