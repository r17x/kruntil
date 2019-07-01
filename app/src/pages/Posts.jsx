import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { GET_USERS, GET_POSTS, GET_POSTS_USER, GET_POST } from 'services/Query'
import { CREATE_POST } from 'services/Mutation'
import List from 'components/Lists'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Circular from 'components/Circular'
import history from 'pages/history'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Comments from 'components/ListComments'
import ErrorMessage from 'components/Error'

import { Mutation } from 'react-apollo'
import DialogForm from 'components/DialogForm'
import FormPost from 'components/FormPost'

export default function Posts({ detail, match }: Props) {
  const query =
    (detail || match.path.endsWith('posts')) && match.params.id
      ? (detail ? GET_POST : GET_POSTS_USER)(match.params.id)
      : GET_POSTS

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(!open)
  return (
    <>
      {!detail && (
        <Button onClick={handleClose} color="primary" gutterBottom>
          Create New Post.
        </Button>
      )}

      <DialogForm
        title="Create new Post"
        description="Write title, body, & Submit"
        open={open}
        handleClose={handleClose}
      >
        <Query query={GET_USERS}>
          {({ loading, error, data: users }) => (
            <Mutation mutation={CREATE_POST}>
              {(createPost, { data }) =>
                loading ? (
                  'Loading...'
                ) : error ? (
                  'Something wrong.'
                ) : (
                  <FormPost
                    options={users.users}
                    optionLabel="name"
                    optionValue="id"
                    onSubmit={createPost}
                  />
                )
              }
            </Mutation>
          )}
        </Query>
      </DialogForm>

      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <Circular />
          if (error) return <ErrorMessage />

          const { posts, post } = data
          if (detail) return <Posts.Detail {...post} />
          const handleItem = data => {
            history.push(`/posts/${data.id}`)
          }
          const handleAction = data => {
            history.push(`/posts/${data.id}/posts`)
          }
          const Action = ({ data }: { data: object }) => (
            <>
              <IconButton
                size="small"
                onClick={handleAction.bind(Action, data)}
              >
                <Tooltip title={`Delete: ${data.title}`}>
                  <Delete />
                </Tooltip>
              </IconButton>
              <IconButton
                size="small"
                onClick={handleAction.bind(Action, data)}
              >
                <Tooltip title={`Edit: ${data.title}`}>
                  <Edit />
                </Tooltip>
              </IconButton>
            </>
          )
          const header = 'Posts'
          return (
            <List
              header={header}
              data={posts}
              primary="title"
              secondary="body"
              extra="author.name"
              onItemClick={handleItem}
              Action={Action}
            />
          )
        }}
      </Query>
    </>
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

type PostDetail = {
  name: string,
  postname: string,
}

Posts.Detail = function Detail(post: PostDetail) {
  const classes = useStyles()
  const blackList = ['id', '__typename', 'comments', 'author']
  return (
    <Card className={classes.card}>
      <CardContent>
        {Object.keys(post)
          .filter(key => !blackList.includes(key))
          .map(key => (
            <Typography
              key={key}
              color={key !== 'title' ? 'textSecondary' : 'textPrimary'}
              gutterBottom
            >
              {post[key]}
            </Typography>
          ))}
        <Typography color="textPrimary" gutterBottom>
          Post by: {post.author.name}
        </Typography>
      </CardContent>
      <Comments comments={post.comments} />
      <CardActions>
        <Button size="small" onClick={() => history.push(`/posts`)}>
          Back to Post list.
        </Button>
      </CardActions>
    </Card>
  )
}
