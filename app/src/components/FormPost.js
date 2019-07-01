import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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

export default function FormPost({ onSubmit }: Props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    title: '',
    body: '',
    userId: null,
  })

  function handleChange(prop) {
    return e =>
      setValues({
        ...values,
        [prop]: e.target.value,
      })
  }

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <TextField
        autoFocus
        id="outlined-name"
        label="Title Post"
        className={classes.textField}
        value={values.title}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        fullWidth
      />
    </form>
  )
}
