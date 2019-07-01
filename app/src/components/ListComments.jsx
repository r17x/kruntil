import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

type Props = {
  comments: array,
}

type itemProps = {
  name: string,
  id: number,
  email: string,
  body: string,
}

export default function AlignItemsList({ comments }: Props) {
  const classes = useStyles()

  const totalComments = comments.length
  const renderItem = ({ id, name, email, body }: itemProps, index) => (
    <>
      <ListItem key={id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name}>{name}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {email}
              </Typography>
              {body}
            </>
          }
        />
      </ListItem>
      {totalComments - 1 !== index && (
        <Divider variant="inset" component="li" />
      )}
    </>
  )

  return (
    <List key="comments" className={classes.root}>
      {comments.map(renderItem)}
    </List>
  )
}
