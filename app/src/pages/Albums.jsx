import React from 'react'
import { Query } from 'react-apollo'
import { GET_ALBUMS, GET_ALBUMS_USER , GET_ALBUM } from 'services/Query'
import List from 'components/Lists'
import IconButton from '@material-ui/core/IconButton'
import Circular from 'components/Circular'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import InfoIcon from '@material-ui/icons/Info'
import history from 'pages/history'

import ErrorMessage from 'components/Error'

type Props = {
  detail?: boolean,
  match?: object,
}

export default function Albums({ detail, match }: Props) {
const query =
    (detail || match.path.endsWith('albums')) && match.params.id
      ? (detail ? GET_ALBUM : GET_ALBUMS_USER)(match.params.id)
      : GET_ALBUMS

  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <Circular />
        if (error) return <ErrorMessage />

        const { albums, album } = data

        if (detail) return <Albums.Detail {...album} />
        const handleItem = data => {
          history.push(`/albums/${data.id}`)
        }
        const header = 'Albums'
        return (
          <List
            header={header}
            data={albums}
            primary="title"
            secondary="author.name"
            onItemClick={handleItem}
          />
        )
      }}
    </Query>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

type AlbumProps = {
  title: string,
  photos: array,
  author: object,
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

Albums.Detail = function Detail({ title, photos, author }: AlbumProps) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [selectPhoto, setSelectPhoto] = React.useState({})

  function handleClickOpen(photo) {
    setSelectPhoto(photo)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const ViewPhoto = ({ id, title, url }) => (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <img src={url} alt={title} />
    </Dialog>
  )
  return (
    <div className={classes.root}>
      <ViewPhoto {...selectPhoto} />
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{title} </ListSubheader>
        </GridListTile>
        {photos.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.thumbnailUrl} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>By: {author.name}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                  onClick={handleClickOpen.bind(Albums.Detail, tile)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
