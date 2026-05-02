import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Form,
    Select,
    Button,
    Card,
    message,
    DatePicker,
    Popconfirm,
} from 'antd';
import dayjs from 'dayjs';

import { appointmentService } from '../../apis/appointments';
import { serviceService } from '../../apis/services';
import { doctorService } from '../../apis/doctors';
import { userService } from '../../apis/users';

import { appointmentActions } from '../../store/appointmentSlice';

const EditAppointment = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');

    const isEdit = !!id && mode !== 'delete';
    const isDelete = mode === 'delete';

    const [loading, setLoading] = useState(false);

    // dropdown data
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);

    // 🟢 Load dropdown data
    useEffect(() => {
        const fetchDropdown = async () => {
            try {
                const [sRes, dRes, uRes] = await Promise.all([
                    serviceService.getAllServices(),
                    doctorService.getAllDoctors(),
                    userService.getAllUsers(),
                ]);

                setServices(sRes.data);
                setDoctors(dRes.data);
                setUsers(uRes.data);
            } catch (err) {
                message.error('Failed to load dropdown data');
            }
        };

        fetchDropdown();
    }, []);

    // 🟢 Load appointment khi edit/delete
    useEffect(() => {
        const fetchAppointment = async () => {
            if (!id) return;

            try {
                const res = await appointmentService.getById(id);

                form.setFieldsValue({
                    ...res.data,
                    dateTime: res.data.dateTime
                        ? dayjs(res.data.dateTime)
                        : null,
                });
            } catch {
                message.error('Failed to load appointment');
            }
        };

        fetchAppointment();
    }, [id, form]);

    // 🟢 Submit create/update
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                dateTime: values.dateTime
                    ? values.dateTime.toISOString()
                    : null,
            };

            if (isEdit) {
                const res = await appointmentService.updateAppointment(id, payload);
                dispatch(appointmentActions.update(res.data));
                message.success('Updated successfully');
            } else {
                const res = await appointmentService.createAppointment(payload);
                dispatch(appointmentActions.add(res.data));
                message.success('Created successfully');
            }

            navigate('/appointments');
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
            await appointmentService.delete(id);
            dispatch(appointmentActions.remove(Number(id)));
            message.success('Deleted successfully');
            navigate('/appointments');
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
                    ? 'Delete Appointment'
                    : isEdit
                    ? 'Edit Appointment'
                    : 'Create Appointment'
            }
        >
            {/* 🔴 DELETE MODE */}
            {isDelete ? (
                <div>
                    <p>Are you sure you want to delete this appointment?</p>

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
                        onClick={() => navigate('/appointments')}
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
                    {/* Date */}
                    <Form.Item
                        name="dateTime"
                        label="Appointment Time"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>

                    {/* Service */}
                    <Form.Item
                        name="serviceId"
                        label="Service"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select service">
                            {services.map((s) => (
                                <Select.Option key={s.id} value={s.id}>
                                    {s.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Doctor */}
                    <Form.Item
                        name="doctorId"
                        label="Doctor"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select doctor">
                            {doctors.map((d) => (
                                <Select.Option key={d.id} value={d.id}>
                                    {d.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* User */}
                    <Form.Item
                        name="userId"
                        label="User"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select user">
                            {users.map((u) => (
                                <Select.Option key={u.id} value={u.id}>
                                    {u.name}
                                </Select.Option>
                            ))}
                        </Select>
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
                        onClick={() => navigate('/appointments')}
                    >
                        Cancel
                    </Button>
                </Form>
            )}
        </Card>
    );
};

export default EditAppointment;