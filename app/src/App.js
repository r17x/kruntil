import React from 'react'

// Component
import Drawer from 'components/Drawer'

// Pages Router
import AppRouter from 'pages/router'

// Services & Data
import { ApolloProvider } from 'react-apollo'
import client from 'services/graph'

import history from 'pages/history'

import UserIcon from '@material-ui/icons/SupervisorAccount'
import PostIcon from '@material-ui/icons/ListAlt'
import AlbumsIcon from '@material-ui/icons/PhotoAlbum'

const menuList = {
  users: {
    name: 'Users',
    icon: <UserIcon />,
  },

  posts: {
    name: 'Posts',
    icon: <PostIcon />,
  },

  albums: {
    name: 'Albums',
    icon: <AlbumsIcon />,
  },
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Drawer
        title={process.env.REACT_APP_DESCRIPTION}
        menuList={menuList}
        onClickMenu={to => history.push(`/${to}`)}
      >
        <AppRouter />
      </Drawer>
    </ApolloProvider>
  )
}
