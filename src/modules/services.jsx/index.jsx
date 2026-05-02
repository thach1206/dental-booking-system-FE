import { Routes, Route } from 'react-router-dom';
import ListService from './ListService';
import EditService from './EditService';

const ServiceRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListService />} />
            <Route path="edit" element={<EditService />} />
            <Route path="edit/:id" element={<EditService />} />
        </Routes>
    );
};

export default ServiceRoutes;