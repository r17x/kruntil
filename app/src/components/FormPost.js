import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { getByProp } from 'utils/Object'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}))

const initValues = {
  title: '',
  body: '',
  userId: null,
}

type Props = {
  data: object,
  onSubmit: func,
  options: array,
  optionValue: string,
  optionLabel: string,
}

export default function FormPost({
  onSubmit,
  options,
  optionValue,
  optionLabel,
}: Props) {
  const classes = useStyles()

  const [values, setValues] = useState(initValues)

  const handleChange = prop => e =>
    setValues({
      ...values,
      [prop]: e.target.value,
    })

  const handleSubmit = e => {
    const variables = values
    typeof onSubmit === 'function' && onSubmit({ variables })
    setValues(initValues)
    e.preventDefault()
  }

  const renderOptions = (option, index) => (
    <MenuItem value={getByProp(option, optionValue)}>
      {getByProp(option, optionLabel)}
    </MenuItem>
  )

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        autoFocus
        id="title"
        label="Title Post"
        className={classes.textField}
        value={values.title}
        onChange={handleChange('title')}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="body"
        label="Body Post"
        className={classes.textField}
        value={values.body}
        onChange={handleChange('body')}
        margin="normal"
        variant="outlined"
        multiline
        rows="5"
        fullWidth
      />
      <InputLabel className={classes.textField} shrink htmlFor="user">
        User
      </InputLabel>
      <Select
        className={classes.textField}
        id="user"
        value={values.userId}
        onChange={handleChange('userId')}
        fullWidth
        margin="normal"
        label="Select User"
      >
        {options.map(renderOptions)}
      </Select>
      <Button
        margin="normal"
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: 10 }}
      >
        Create new
      </Button>
    </form>
  )
}
