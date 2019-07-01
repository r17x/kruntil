import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import { getByProp } from 'utils/Object'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

type Props = {
  data: array,
  primary: node,
  renderItem?: func,
  secondary?: node,
  onItemClick?: func,
  Action?: node,
  extra?: string,
  header?: string,
}

export default function Lists({
  data,
  primary,
  secondary,
  extra,
  header,
  onItemClick,
  renderItem,
  Action,
}: Props) {
  const defaultRenderItem = item => {
    const itemPrimary = getByProp(item, primary)
    const itemSecondary = getByProp(item, secondary)
    const extraProperty = getByProp(item, extra)
    const labelId = `checkbox-list-secondary-label-${itemPrimary}`
    return (
      <ListItem
        key={itemPrimary}
        button
        onClick={onItemClick.bind(defaultRenderItem, item)}
      >
        {header && <ListSubheader>{header}</ListSubheader>}
        <ListItemText
          id={labelId}
          primary={itemPrimary}
          secondary={itemSecondary}
        >
          {extraProperty}
        </ListItemText>
        <ListItemSecondaryAction>
          {Action && <Action data={item} />}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
  const classes = useStyles()
  return (
    <List dense className={classes.root} subheader={<li />}>
      {data.map(renderItem || defaultRenderItem)}
    </List>
  )
}

Lists.defaultProps = { data: [] }
