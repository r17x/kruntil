import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

type Props = {
  title: string,
}

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}))

export default function Navbar({ title }: Props) {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Navbar.defaultProps = {
  title: 'App Title',
}
