import { Routes, Route } from 'react-router-dom';
import ListAppointment from './ListAppointment';
import EditAppointment from './EditAppointment';

const AppointmentRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListAppointment />} />
            <Route path="edit" element={<EditAppointment />} />
            <Route path="edit/:id" element={<EditAppointment />} />
        </Routes>
    );
};

export default AppointmentRoutes;