import { render } from "@testing-library/react";
import Input from "."

test('Should render component correctly', () => {
  const { getByRole } = render(<Input error='error msg'/>)
  expect(getByRole('textbox')).toBeInTheDocument()
  expect(getByRole('alert', { name: 'error msg'})).toBeInTheDocument()
})