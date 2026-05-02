import { Routes, Route } from 'react-router-dom';


import Login from '@/modules/auth/pages/Login';
import Register from '@/modules/auth/pages/Register';
import ForgotPassword from '@/modules/auth/pages/ForgotPassword';
import ResetPassword from '@/modules/auth/pages/ResetPassword';


import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';




import DoctorAppointments from '@/modules/doctor/pages/DoctorAppointments';


import AdminDashboard from '@/modules/admin/pages/AdminDashboard';
import Homepage from '@/modules/pages/homepage';
import ListReminder from '@/modules/reminder/ListReminder';
import ServiceRoutes from '../modules/services.jsx';
import AppointmentRoutes from '@/modules/appointment';
import UserRoutes from '@/modules/user';
const AppRouter = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= PRIVATE ================= */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT */}
        <Route path="/pages/homepage" element={<Homepage />} />

        {/* USER */}
        {/* <Route path="/doctors" element={<Doctors />} /> */}
        {/* <Route path="/records" element={<MedicalRecords />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/reminders" element={<ListReminder />} />
        <Route path="/services/*" element={<ServiceRoutes />} />\
        <Route path="/appointments/*" element={<AppointmentRoutes />} />

        {/* DOCTOR */}
        {/* <Route
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        /> */}

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/reminders" element={<ListReminder />} />
        <Route path="/services/*" element={<ServiceRoutes />} />\
        <Route path="/appointments/*" element={<AppointmentRoutes />} />
        <Route path="/users/*" element={<UserRoutes/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;