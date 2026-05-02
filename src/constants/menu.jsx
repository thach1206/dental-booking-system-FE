import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

export const MENU_CONFIG = {
  admin: [
    {
      key: '/admin/dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: '/users',
      label: 'Users',
      icon: <UserOutlined />,
    },
    {
      key: '/doctors',
      label: 'Doctors',
      icon: <UserOutlined />,
    },
    {
      key: '/appointments',
      label: 'Appointments',
      icon: <CalendarOutlined />,
    },
    {
      key: '/records',
      label: 'Medical Records',
      icon: <FileTextOutlined />,
    },
    {
      key: '/services',
      label: 'Services',
      icon: <FileTextOutlined />,
    },
    {
      key: '/reminders',
      label: 'Reminders',
      icon: <FileTextOutlined />,
    }

  ],

  doctor: [
    {
      key: '/doctor/appointments',
      label: 'Appointments',
      icon: <CalendarOutlined />,
    },
    {
      key: '/doctor/records',
      label: 'Medical Records',
      icon: <FileTextOutlined />,
    },
  ],

  user: [
    {
      key: '/doctors',
      label: 'Book Appointment',
      icon: <UserOutlined />,
    },
    {
      key: '/appointments',
      label: 'My Appointments',
      icon: <CalendarOutlined />,
    },
    {
      key: '/records',
      label: 'Medical Records',
      icon: <FileTextOutlined />,
    },
  ],
};