import { render, waitFor } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'
import HolidayCard from "."
import dayjs from "dayjs";

test('Should render component correctly', async () => {
  const date = new Date().toISOString()
  const deleteFn = jest.fn()
  const holiday = {
    _id: '1',
    title: 'Name of Holiday',
    description: 'Some description here',
    location: 'Details about location',
    date,
    participants: ['aaaaa', 'bbbbb']
  }
  const { getByText, getByRole } = render(<HolidayCard handleDelete={deleteFn} holiday={holiday} />)

  expect(getByText('Name of Holiday')).toBeInTheDocument()
  expect(getByText(dayjs(date).format('MM/DD/YYYY'))).toBeInTheDocument()
  expect(getByText('Details about location')).toBeInTheDocument()

})


test('Should show/hide details', async () => {
  const date = new Date().toISOString()
  const deleteFn = jest.fn()
  const holiday = {
    _id: '1',
    title: 'Name of Holiday',
    description: 'Some description here',
    location: 'Details about location',
    date,
    participants: ['aaaaa', 'bbbbb']
  }
  const { getByText, getByRole, queryByText } = render(<HolidayCard handleDelete={deleteFn} holiday={holiday} />)

  const buttonShowDetails = getByRole('button', { name: 'See details' })
  await userEvent.click(buttonShowDetails)

  await waitFor(() => {
    expect(getByText('Some description here')).toBeInTheDocument()
  })

  await waitFor(() => {
    expect(getByText('aaaaa')).toBeInTheDocument()
  })

  await waitFor(() => {
    expect(getByText('bbbbb')).toBeInTheDocument()
  })

  const buttonHideDetails = getByRole('button', { name: 'Hide details' })
  await userEvent.click(buttonHideDetails)

  await waitFor(() => {
    expect(queryByText('Some description here')).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(queryByText('aaaaa')).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(queryByText('bbbbb')).not.toBeInTheDocument()
  })
})


test('Should call delete', async () => {
  const date = new Date().toISOString()
  const deleteFn = jest.fn()
  const holiday = {
    _id: '1',
    title: 'Name of Holiday',
    description: 'Some description here',
    location: 'Details about location',
    date,
    participants: ['aaaaa', 'bbbbb']
  }
  const { getByText, getByRole } = render(<HolidayCard handleDelete={deleteFn} holiday={holiday} />)

  const buttonDelete = getByRole('button', { name: 'Delete' })
  await userEvent.click(buttonDelete)

  expect(deleteFn).toHaveBeenCalledWith(holiday)
})