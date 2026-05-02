import { Layout, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/authenticationContext';

const { Header } = Layout;

export default function AppHeader() {
  const { user, logout } = useAuth();

  const items = [
    { key: 'profile', label: 'Profile' },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Header style={styles.header}>
      <div style={styles.logo}>💙 Healthcare Booking</div>

      <Dropdown menu={{ items }}>
        <div style={styles.user}>
          <Avatar
            style={{ backgroundColor: '#1890ff' }}
            icon={<UserOutlined />}
          />
          <span>{user?.email}</span>
        </div>
      </Dropdown>
    </Header>
  );
}

const styles = {
  header: {
    background: '#fff',
    borderBottom: '1px solid #e6f4ff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  logo: {
    fontWeight: 600,
    fontSize: 18,
    color: '#1890ff',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  },
};