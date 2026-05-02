import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Button, Card, message, Popconfirm } from 'antd';

import { serviceService } from '../../apis/services';
import { serviceActions } from '../../store/serviceSlice';

const EditService = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode'); // delete | null

    const isEdit = !!id && mode !== 'delete';
    const isDelete = mode === 'delete';

    const [loading, setLoading] = useState(false);

    // 🟢 Load data khi edit hoặc delete
    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;

            try {
                const res = await serviceService.getServiceById(id);
                form.setFieldsValue(res.data);
            } catch (err) {
                message.error('Failed to load service');
            }
        };

        fetchService();
    }, [id, form]);

    // 🟢 Submit create / update
    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (isEdit) {
                const res = await serviceService.updateService(id, values);
                dispatch(serviceActions.updateService(res.data));
                message.success('Updated successfully');
            } else {
                const res = await serviceService.createService(values);
                dispatch(serviceActions.addService(res.data));
                message.success('Created successfully');
            }

            navigate('/services');
        } catch (err) {
            message.error('Action failed');
        } finally {
            setLoading(false);
        }
    };

    // 🔴 Delete
    const handleDelete = async () => {
        setLoading(true);
        try {
            await serviceService.deleteService(id);
            dispatch(serviceActions.deleteService(Number(id)));
            message.success('Deleted successfully');
            navigate('/services');
        } catch (err) {
            message.error('Delete failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title={
                isDelete
                    ? 'Delete Service'
                    : isEdit
                    ? 'Edit Service'
                    : 'Create Service'
            }
        >
            {/* 🔴 DELETE MODE */}
            {isDelete ? (
                <div>
                    <p>Are you sure you want to delete this service?</p>

                    <Popconfirm
                        title="Confirm delete?"
                        onConfirm={handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger loading={loading}>
                            Delete
                        </Button>
                    </Popconfirm>

                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => navigate('/services')}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                /* 🟢 CREATE + EDIT */
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Service Name"
                        name="name"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={4} />
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
                        onClick={() => navigate('/services')}
                    >
                        Cancel
                    </Button>
                </Form>
            )}
        </Card>
    );
};

export default EditService;