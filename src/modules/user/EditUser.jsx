import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Card,
    message,
    Select,
    Popconfirm,
} from 'antd';

import { userService } from '../../apis/users';
import { userActions } from '../../store/userSlice';

const EditUser = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');

    const isEdit = !!id && mode !== 'delete';
    const isDelete = mode === 'delete';

    const [loading, setLoading] = useState(false);

    // 🟢 Load user
    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                const res = await userService.getUserById(id);
                form.setFieldsValue(res.data);
            } catch {
                message.error('Failed to load user');
            }
        };

        fetchUser();
    }, [id, form]);

    // 🟢 Create / Update
    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (isEdit) {
                const res = await userService.updateUser(id, values);
                dispatch(userActions.updateUser(res.data));
                message.success('Updated successfully');
            } else {
                const res = await userService.createUser(values);
                dispatch(userActions.addUser(res.data));
                message.success('Created successfully');
            }

            navigate('/users');
        } catch {
            message.error('Action failed');
        } finally {
            setLoading(false);
        }
    };

    // 🔴 Delete
    const handleDelete = async () => {
        setLoading(true);
        try {
            await userService.deleteUser(id);
            dispatch(userActions.deleteUser(Number(id)));
            message.success('Deleted successfully');
            navigate('/users');
        } catch {
            message.error('Delete failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title={
                isDelete
                    ? 'Delete User'
                    : isEdit
                    ? 'Edit User'
                    : 'Create User'
            }
        >
            {isDelete ? (
                <div>
                    <p>Are you sure you want to delete this user?</p>

                    <Popconfirm
                        title="Confirm delete?"
                        onConfirm={handleDelete}
                    >
                        <Button danger loading={loading}>
                            Delete
                        </Button>
                    </Popconfirm>

                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => navigate('/users')}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* password chỉ dùng khi create */}
                    {!isEdit && (
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true }]}
                    >
                        <Select
                            options={[
                                { label: 'Admin', value: 'admin' },
                                { label: 'Doctor', value: 'doctor' },
                                { label: 'User', value: 'user' },
                                { label: 'Operator', value: 'operator' },
                            ]}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {isEdit ? 'Update' : 'Create'}
                    </Button>

                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => navigate('/users')}
                    >
                        Cancel
                    </Button>
                </Form>
            )}
        </Card>
    );
};

export default EditUser;