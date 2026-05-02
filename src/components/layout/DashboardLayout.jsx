import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';
import AppSidebar from './Sidebar';

const { Content } = Layout;

export default function DashboardLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />

      <Layout>
        <AppHeader />

        <Content style={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

const styles = {
  content: {
    margin: 16,
    padding: 20,
    background: '#fff',
    borderRadius: 12,
  },
};