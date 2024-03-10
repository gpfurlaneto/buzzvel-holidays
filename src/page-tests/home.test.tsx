import { render, waitFor } from '@testing-library/react';
import HomePage, { getServerSideProps } from '../pages/index';
import api from '@/libs/axios';
import { Holiday } from '@/types/Holiday';

// TODO Test delete holidays, it needs to check testes with Confirmation Dialog
const holidays: Holiday[] = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Description 1',
    date: new Date().toISOString(),
    participants: ['aaaaa', 'bbbbb'],
    location: 'aaaaaaaaaaaaa'
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Description 2',
    date: new Date().toISOString(),
    participants: ['ccccc', 'ddddd'],
    location: 'eeeeeeeeeeeeeee'
  }
]

test('Should render a list of holidays', async () => {
  api.listAllHolidays = jest.fn().mockReturnValue(holidays)
  const { props } = await getServerSideProps()
  const { getByText } = render(<HomePage {...props}/>);
  await waitFor(() => {
    expect(getByText(holidays[0].title)).toBeInTheDocument()
  })
  expect(getByText(holidays[1].title)).toBeInTheDocument()
  expect(api.listAllHolidays).toHaveBeenCalled()
});
