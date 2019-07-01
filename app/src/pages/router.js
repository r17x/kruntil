import React, { Suspense } from 'react'
import { Router, Route } from 'react-router-dom'
import { Users, Posts, Albums } from 'pages'
import history from 'pages/history'
import Circular from 'components/Circular'

export default function Routers() {
  return (
    <Router history={history}>
      <Suspense fallback={<Circular />}>
        <Route key="dashboard" path="/" component={Users} exact />

        <Route key="users" path="/users" component={Users} exact />
        <Route
          key="user"
          path="/users/:id"
          component={props => <Users detail {...props} />}
          exact
        />
        <Route
          key="user-posts"
          path="/users/:id/posts"
          component={Posts}
          exact
        />
        <Route
          key="user-albums"
          path="/users/:id/albums"
          component={Albums}
          exact
        />
        <Route key="posts" path="/posts" component={Posts} exact />
        <Route
          key="post"
          path="/posts/:id"
          component={props => <Posts {...props} detail />}
          exact
        />

        <Route key="albums" path="/albums" component={Albums} exact />
        <Route
          key="album"
          path="/albums/:id"
          component={props => <Albums detail {...props} />}
          exact
        />
      </Suspense>
    </Router>
  )
}
