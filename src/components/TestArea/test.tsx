import { render } from "@testing-library/react";
import TextArea from "."

test('Should render component correctly', () => {
  const { getByRole } = render(<TextArea error='error msg' />)
  expect(getByRole('textbox')).toBeInTheDocument()
  expect(getByRole('alert', { name: 'error msg' })).toBeInTheDocument()
})