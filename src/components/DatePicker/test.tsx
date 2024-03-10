import { render } from "@testing-library/react";
import DatePicker from "."

test('Should render component correctly', () => {
  const { getByRole } = render(<DatePicker value={new Date().toISOString()} onChange={() => {}} error='error msg'/>)
  expect(getByRole('textbox')).toBeInTheDocument()
  expect(getByRole('alert', { name: 'error msg'})).toBeInTheDocument()
})