import Navbar from './Navbar'

it('Navbar: renders correctly', () => {
  const { getByText } = render(<Navbar />)
  expect(getByText('App Title')).toBeVisible()
})

it('Navbar: renders correctly with props title', () => {
  const AppName = 'Application Name'
  const { getByText } = render(<Navbar title={AppName} />)
  expect(getByText(AppName)).toBeVisible()
})
