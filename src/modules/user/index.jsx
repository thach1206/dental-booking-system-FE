import { Routes, Route } from 'react-router-dom';
import ListUser from './ListUser';
import EditUser from './EditUser';

const UserRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListUser />} />
            <Route path="edit" element={<EditUser />} />
            <Route path="edit/:id" element={<EditUser />} />
        </Routes>
    );
};

export default UserRoutes;