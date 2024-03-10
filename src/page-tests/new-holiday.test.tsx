import NewHoliday from "@/pages/holiday/new";
import { userEvent } from '@testing-library/user-event'
import { render, waitFor, fireEvent } from '@testing-library/react';
import api from "@/libs/axios";

jest.mock('next/router', () => {
  (global as unknown as { push: () => void }).push = jest.fn()
  return {
    useRouter: jest.fn().mockReturnValue({ push: (global as unknown as { push: () => void }).push }),
  }
})

test('Should the new holiday page', async () => {
  const { getByRole } = render(<NewHoliday />);
  await waitFor(() => {
    expect(getByRole('textbox', { name: 'title' })).toBeInTheDocument()
    expect(getByRole('textbox', { name: 'description' })).toBeInTheDocument()
    expect(getByRole('textbox', { name: 'date' })).toBeInTheDocument()
    expect(getByRole('textbox', { name: 'location' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Cancel' })).toBeInTheDocument()
  })
});

test('Should call api create holiday', async () => {
  api.createHoliday = jest.fn()
  const { getByRole, getByPlaceholderText } = render(<NewHoliday />);

  const titleInput = getByRole('textbox', { name: 'title' })
  await userEvent.type(titleInput, 'xxxxx title')

  const descriptionInput = getByRole('textbox', { name: 'description' })
  await userEvent.type(descriptionInput, 'xxxxx description')

  const dateInput = getByRole('textbox', { name: 'date' })
  const date = new Date()
  await fireEvent.change(dateInput, { target: { value: date.toISOString() } })

  const locationInput = getByRole('textbox', { name: 'location' })
  await userEvent.type(locationInput, 'xxxxx location')

  const buttonSubmit = getByRole('button', { name: 'Submit' })
  await userEvent.click(buttonSubmit)

  expect(api.createHoliday).toHaveBeenCalledWith({
    title: 'xxxxx title',
    description: 'xxxxx description',
    date: date.toISOString(),
    location: 'xxxxx location',
    participants: undefined
  })
});


test('Should redirect to home on cancel', async () => {
  const { getByRole, getByPlaceholderText } = render(<NewHoliday />);


  const buttonSubmit = getByRole('link', { name: 'Cancel' })
  await userEvent.click(buttonSubmit)
  expect((global as unknown as { push: () => void }).push).toHaveBeenCalledWith('/')

});