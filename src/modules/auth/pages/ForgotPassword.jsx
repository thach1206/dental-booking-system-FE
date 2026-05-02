import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { authService } from '@/apis/auth';

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      await authService.forgotPassword(values.email);

      setSubmitted(true); // 👉 đổi UI
      toast.success('Check your email to reset password');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>
          <div style={{ fontSize: 28 }}>🔑</div>
          <Title level={3}>Forgot Password</Title>

          {!submitted ? (
            <Text type="secondary">
              Enter your email to receive reset link
            </Text>
          ) : (
            <Text type="secondary">
              If email exists, we sent a reset link 📩
            </Text>
          )}
        </div>

        {!submitted ? (
          <Form layout="vertical" onFinish={onFinish}>
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

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Send Reset Link
            </Button>
          </Form>
        ) : (
          <Button block onClick={() => setSubmitted(false)}>
            Send again
          </Button>
        )}

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/login">Back to login</Link>
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