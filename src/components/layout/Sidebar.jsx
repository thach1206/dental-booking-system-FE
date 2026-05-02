import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/authenticationContext';
import { MENU_CONFIG } from '@/constants/menu';

const { Sider } = Layout;

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.role || 'user';
  const menuItems = MENU_CONFIG[role] || [];

  return (
    <Sider width={230} style={styles.sider}>
      <div style={styles.logo}>🏥 Healthcare</div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={(e) => navigate(e.key)}
        style={styles.menu}
      />
    </Sider>
  );
}

const styles = {
  sider: {
    background: '#ffffff',
    borderRight: '1px solid #e6f4ff',
  },
  logo: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: '#1890ff',
    borderBottom: '1px solid #e6f4ff',
  },
  menu: {
    background: '#ffffff',
    borderRight: 'none',
  },
};