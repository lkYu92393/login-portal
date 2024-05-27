import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import { MainLayout } from '../components/Layout'

// import { TimetableRoutes } from '../features/timetable'

import { Timetable } from '../features/timetable/'
import { UserRoute } from '../features/user'

const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

export const protectedRoutes = [
    {
        path: '/App',
        element: <App />,
        children: [
            { path: '', element: <Timetable /> },
            { path: 'user/*', element: <UserRoute />},
            { path: '*', element: <Navigate to="." /> },
        ],
    },
    {
        path: '*',
        element: <Navigate to='/App' replace />
    }
];