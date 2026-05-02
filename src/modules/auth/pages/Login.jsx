import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authenticationContext';
import { authService } from '@/apis/auth';

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user) navigate('/');
  // }, [user]);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await authService.login(
        values.email,
        values.password
      );

      login(res.data);

      toast.success('Login successful');

      const role = res.data?.user?.role;
      if (role === 'admin') navigate('/pages/homepage');
      else if (role === 'doctor') navigate('/doctor/appointments');
      else navigate('/doctors');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card style={{ width: 360 }}>
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 28 }}>❤️</div>
          <Title level={3}>Healthcare Booking</Title>
          <Text type="secondary">Login to your account</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Enter email' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          {/* FORGOT PASSWORD */}
          <div style={{ textAlign: 'right', marginBottom: 12 }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>
        </Form>

        {/* REGISTER */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text>
            Don’t have an account?{' '}
            <Link to="/register">Register</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}