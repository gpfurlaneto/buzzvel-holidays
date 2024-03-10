import { render, waitFor, fireEvent } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'

import PartipantsPanel from '.'

test('Shoud render correctly', () => {
	const { getByText, getByRole } = render(<PartipantsPanel
		onChange={() => {}}
		value={['aaaaa', 'bbbbb']}
	/>)

	expect(getByRole('textbox')).toBeInTheDocument()
	expect(getByRole('button', { name: 'Add Participant'})).toBeInTheDocument()
	expect(getByText('aaaaa')).toBeInTheDocument()
	expect(getByRole('button', { name: 'Delete participant aaaaa'})).toBeInTheDocument()
	expect(getByText('bbbbb')).toBeInTheDocument()
	expect(getByRole('button', { name: 'Delete participant bbbbb'})).toBeInTheDocument()
})

test('Shoud add a participant', async () => {
	const { getByText, getByRole } = render(<PartipantsPanel
		onChange={() => {}}
		value={[]}
	/>)

	const input = getByRole('textbox')
	fireEvent.change(input, {target: {value: 'xxxxx'}})
	const buttonAddParticipant = getByRole('button', { name: 'Add Participant'})
	await userEvent.click(buttonAddParticipant)
	await waitFor(() => {
		expect(getByText('xxxxx')).toBeInTheDocument()
	})
	
})


test('Shoud delete a participant', async () => {
	const { getByText, getByRole, queryByText } = render(<PartipantsPanel
		onChange={() => {}}
		value={['zzzzz']}
	/>)
	
	expect(getByText('zzzzz')).toBeInTheDocument()
	const deleteParticipant = getByRole('button', { name: 'Delete participant zzzzz'})
	await userEvent.click(deleteParticipant)

	await waitFor(() => {
		expect(queryByText('zzzzz')).not.toBeInTheDocument()
	})
	
})