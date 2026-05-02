import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { authService } from '@/apis/auth';

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password, 
      });

      toast.success('Register successful');
      navigate('/login');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Register failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={{ fontSize: 28 }}>📝</div>
          <Title level={3}>Create Account</Title>
          <Text type="secondary">Register to continue</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          {/* NAME */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Enter your name' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full name"
            />
          </Form.Item>

          {/* EMAIL */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text>
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
  },
  card: {
    width: 360,
  },
  header: {
    textAlign: 'center',
    marginBottom: 16,
  },
};