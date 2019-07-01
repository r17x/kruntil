import { lazy } from 'react'

export const Users = lazy(() => import('pages/Users'))
export const Posts = lazy(() => import('pages/Posts'))
export const Albums = lazy(() => import('pages/Albums'))
