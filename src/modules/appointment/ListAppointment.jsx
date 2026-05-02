import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomTable from '@/components/common/CustomTable';
import { appointmentService } from '../../apis/appointments';
import { appointmentActions } from '../../store/appointmentSlice';

const ListAppointment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appointments = useSelector(
        (state) => state.appointment.appointments
    );

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await appointmentService.getAllAppointments();
                dispatch(appointmentActions.setAppointments(res.data));
            } catch (err) {
                console.error('Failed to fetch appointments', err);
            }
        };

        fetchAppointments();
    }, [dispatch]);

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        {
            title: 'Date',
            dataIndex: 'dateTime',
            render: (val) => new Date(val).toLocaleString(),
        },
        {
            title: 'Service',
            dataIndex: ['service', 'name'],
        },
        {
            title: 'User',
            dataIndex: ['user', 'name'],
        },
        {
            title: 'Doctor',
            dataIndex: ['doctor', 'name'],
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => navigate(`edit/${record.id}`)}>
                        Edit
                    </button>
                    <button
                        onClick={() =>
                            navigate(`edit/${record.id}?mode=delete`)
                        }
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Appointments</h2>

            <button onClick={() => navigate('edit')}>
                + Add Appointment
            </button>

            <CustomTable columns={columns} data={appointments} />
        </div>
    );
};

export default ListAppointment;