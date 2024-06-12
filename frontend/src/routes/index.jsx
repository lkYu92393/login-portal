import * as React from 'react'
import { useRoutes, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../lib/auth'

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

const AppRoutes = () => {
    const { isLoggedIn, verifySession } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (isLoggedIn) {
            verifySession()
        }
    }, [])

    const commonRoutes = [
        { path: '/test', element: <div>Nothing to see here</div>},
    ]

    const routes = isLoggedIn ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes])

    return element

    // if (!isLoggedIn) {
    //     routes.push(<Route key='login' path="/" element={<LoginPage />} />)
    //     routes.push(<Route key='unauth' path="*" element={<Navigate to="/" replace />} />)
    // } else {
    //     routes.push(<Route key='home' path="/home" element={<HomePage />} />)
    //     routes.push(<Route key='timetable' path='/timetable' element={<FCT />} />)
    //     routes.push(<Route key='auth' path="*" element={<Navigate to="/home" replace />} />)
    // }

    // return (
    //     <Routes>
    //         {routes}
    //     </Routes>
    // );
};

export default AppRoutes;