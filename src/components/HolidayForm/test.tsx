import { render } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'
import HolidayForm from ".";

test('Should render component correctly', () => {
  const defaultValues = {
    title: 'Title of holiday',
    description: 'Description of holiday',
    date: new Date(),
    participants: ['aaaaa', 'bbbbb'],
    location: 'Location of holiday'
  }
  
  const { getByRole, getByText } = render(
    <HolidayForm 
      handleSubmit={async () => {}} 
      defaultValues={defaultValues}
    />
  )

  expect(getByRole('textbox', { name: 'title'})).toBeInTheDocument()
  expect(getByRole('textbox', { name: 'description'})).toBeInTheDocument()
  expect(getByRole('textbox', { name: 'date'})).toBeInTheDocument()
  expect(getByRole('textbox', { name: 'location'})).toBeInTheDocument()
  expect(getByText('aaaaa')).toBeInTheDocument()
  expect(getByText('bbbbb')).toBeInTheDocument()
  expect(getByRole('button', { name: 'Submit'})).toBeInTheDocument()
  expect(getByRole('link', { name: 'Cancel'})).toBeInTheDocument()
})

test('Should call handleSubmit', async () => {
  const defaultValues = {
    title: 'Title of holiday',
    description: 'Description of holiday',
    date: new Date(),
    participants: ['aaaaa', 'bbbbb'],
    location: 'Location of holiday'
  }
  
  const handleSubmit = jest.fn()
  const { getByRole } = render(
    <HolidayForm 
      handleSubmit={handleSubmit} 
      defaultValues={defaultValues}
    />
  )
  
  const submit = getByRole('button', { name: 'Submit'})
  await userEvent.click(submit)
  expect(handleSubmit).toHaveBeenCalledWith(defaultValues)
})

test('Should display validation errors', async () => {
  const handleSubmit = jest.fn()
  const { getByRole, getByText } = render(
    <HolidayForm 
      handleSubmit={handleSubmit} 
    />
  )
  
  const submit = getByRole('button', { name: 'Submit'})
  await userEvent.click(submit)
  
  expect(getByRole('alert', { name: 'Title is required'})).toBeInTheDocument()
  expect(getByRole('alert', { name: 'Description is required'})).toBeInTheDocument()
  expect(getByRole('alert', { name: 'Date is required'})).toBeInTheDocument()
  expect(getByRole('alert', { name: 'Location is required'})).toBeInTheDocument()
})