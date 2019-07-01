import React from 'react'
import { Query } from 'react-apollo'
import { GET_USERS, GET_USER } from 'services/Query'
import List from 'components/Lists'
import ListAlt from '@material-ui/icons/ListAlt'
import PhotoAlbum from '@material-ui/icons/PhotoAlbum'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Circular from 'components/Circular'
import history from 'pages/history'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ErrorMessage from 'components/Error'

type Props = {
  detail?: boolean,
  match?: object,
}

export default function Users({ detail, match }: Props) {
  return (
    <Query query={detail ? GET_USER(match.params.id) : GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) return <Circular />
        if (error) return <ErrorMessage />

        const { users, user } = data

        if (detail) return <Users.Detail {...user} />

        const handleItem = data => {
          history.push(`/users/${data.id}`)
        }

        const handleAction = (path, data) => {
          history.push(`/users/${data.id}/${path}`)
        }

        const Action = ({ data }: { data: object }) => (
          <>
            <IconButton key="posts" onClick={e => handleAction('posts', data)}>
              <Tooltip title="List Posts">
                <ListAlt />
              </Tooltip>
            </IconButton>
            <IconButton
              key="albums"
              onClick={e => handleAction('albums', data)}
            >
              <Tooltip title="List Albums">
                <PhotoAlbum />
              </Tooltip>
            </IconButton>
          </>
        )
        const header = 'Users'
        return (
          <List
            header={header}
            data={users}
            primary="username"
            secondary="email"
            onItemClick={handleItem}
            Action={Action}
          />
        )
      }}
    </Query>
  )
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
})

type UserDetail = {
  name: string,
  username: string,
}

Users.Detail = function Detail(user: UserDetail) {
  const classes = useStyles()
  const blackList = ['id', '__typename']
  return (
    <Card className={classes.card}>
      <CardContent>
        {Object.keys(user)
          .filter(key => !blackList.includes(key))
          .map(key => (
            <Typography
              key={key}
              color={key !== 'username' ? 'textSecondary' : 'textPrimary'}
            >
              {user[key]}
            </Typography>
          ))}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push(`/users`)}>
          Back to User list.
        </Button>
      </CardActions>
    </Card>
  )
}
