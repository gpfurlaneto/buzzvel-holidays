import EditHoliday, { getServerSideProps } from "@/pages/holiday/[id]";
import { userEvent } from '@testing-library/user-event'
import { render, waitFor, fireEvent } from '@testing-library/react';
import api from "@/libs/axios";
import { GetServerSidePropsContext } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const holiday = {
	id: '1',
	title: 'Title 1',
	description: 'Description 1',
	date: new Date().toISOString(),
	participants: ['aaaaa', 'bbbbb'],
	location: 'aaaaaaaaaaaaa'
}

jest.mock('next/router', () => {
  (global as unknown as { push: () => void }).push = jest.fn()
  return {
  useRouter: jest.fn().mockReturnValue({ push: (global as unknown as { push: () => void }).push }),
}})

test('Should load the edit page correctly', async () => {
	api.loadHoliday = jest.fn().mockReturnValue(holiday)

	const { props } = await getServerSideProps({
		params: {
			'id': '1'
		} as Params
	} as GetServerSidePropsContext)

  const { getByRole } = render(<EditHoliday {...props}/>);
  await waitFor(() => {
    expect(getByRole('textbox', { name: 'title'})).toHaveValue(holiday.title)
    expect(getByRole('textbox', { name: 'description'})).toHaveValue(holiday.description)
		expect(getByRole('textbox', { name: 'date'})).toHaveValue(new Date(holiday.date).toLocaleDateString())
    expect(getByRole('textbox', { name: 'location'})).toHaveValue(holiday.location)
  })
	expect(api.loadHoliday).toHaveBeenCalled()
});


test('Should api updateHoliday', async () => {
	api.loadHoliday = jest.fn().mockReturnValue(holiday)
	api.updateHoliday = jest.fn()

	const { props } = await getServerSideProps({
		params: {
			'id': '1'
		} as Params
	} as GetServerSidePropsContext)

  const { getByRole } = render(<EditHoliday {...props}/>);
  const submitButton = getByRole('button', { name: 'Submit'})
	await userEvent.click(submitButton)
	expect(api.loadHoliday).toHaveBeenCalled()
	expect(api.updateHoliday).toHaveBeenCalledWith(holiday.id, {
		...holiday,
		id: undefined
	})
	expect((global as unknown as { push: () => void }).push).toHaveBeenCalledWith('/')
});