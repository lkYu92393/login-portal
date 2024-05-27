import { Route, Routes } from 'react-router-dom'

import { Management } from './Management';
import { UserProfile } from './UserProfile';

const UserRoute = () => {
    return (
        <Routes>
            <Route path="management" element={<Management />} />
            <Route path="profile" element={<UserProfile />} />
        </Routes>
    );
};

export { UserRoute }