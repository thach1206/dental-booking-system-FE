import { Form, Input, Button, Card, Typography } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/apis/auth';
import { showErrorNotification } from '../../../components/ui/Notification';
import { t } from 'i18next';

const { Title } = Typography;

export default function ResetPassword() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = params.get('token');

    const onFinish = async (values) => {
        try {
            await authService.resetPassword({
                token,
                password: values.password,
            });

            toast.success('Password updated');
            navigate('/login');
        } catch (err) {
            showErrorNotification(
                err?.message ||
                t('errors.failed_to_fetch', {
                    value: t('common.device', { count: 2 }),
                })
            );
            console.log('error',err?.message);
            // console.log('err', err?.response?.data?.message);
            // if (err?.response?.data?.message === 'New password must be different from old password')
            //     toast.error('New password must be different from old password');
            // else
            //     toast.error('Token invalid or expired');
        }
    };

    if (!token) {
        return <div>Invalid reset link</div>;
    }

    return (
        <div style={styles.container}>
            <Card style={{ width: 360 }}>
                <Title level={3} style={{ textAlign: 'center' }}>
                    Reset Password
                </Title>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Enter password' }]}
                    >
                        <Input.Password placeholder="New password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Confirm password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Reset Password
                    </Button>
                </Form>
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
};