import { AuthRoutes } from '../features/auth'
import { Navigate } from 'react-router-dom'

export const publicRoutes = [
    {
      path: '/auth/*',
      element: <AuthRoutes />,
    },
    {
      path: '*',
      element: <Navigate to='/auth/login' />
    }
  ];