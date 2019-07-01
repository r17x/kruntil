import Drawer from './Drawer'

it('Drawer: renders correctly', () => {
  const { getByText } = render(<Drawer />)
  expect(getByText('App Title')).toBeVisible()
})

it('Drawer: renders correctly with props title', () => {
  const AppName = 'Application Name'
  const { getByText } = render(<Drawer title={AppName} />)
  expect(getByText(AppName)).toBeVisible()
})
