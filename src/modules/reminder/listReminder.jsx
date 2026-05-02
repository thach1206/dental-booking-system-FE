import { useEffect, useState, useCallback, use } from 'react';
import { useTranslation } from 'react-i18next';
import { reminderService } from '../../apis/reminders';
import { useDispatch, useSelector } from 'react-redux';
import { reminderActions } from '../../store/reminderSlice';
import CustomTable from '@/components/common/CustomTable';
const ListReminder = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    console.log(useSelector(state => state));
    const reminders = useSelector(state => state.reminder.reminders);
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                console.log('running here');
                const res = await reminderService.getAllReminders();
                console.log('dataa', res);
                console.log('STATUS:', res.status); // 👈 sẽ chạy nếu success
                console.log('DATA:', res.data);
                dispatch(reminderActions.setReminders(res.data));
                console.log(reminders, 'reminders');
            } catch (err) {
                console.error('Failed to fetch reminders', err);
            }
        };
        fetchReminders();
    }, []);
    useEffect(() => {
        console.log('UPDATED reminders:', reminders);
    }, [reminders]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Appointment ID',
            dataIndex: 'appointmentId',
        },
        {
            title: 'Time',
            dataIndex: 'reminderTime',
            render: (time) => new Date(time).toLocaleString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Service',
            dataIndex: ['appointment', 'service', 'name'],
        },
        {
            title: 'User',
            dataIndex: ['appointment', 'user', 'name'],
        },
        {
            title: 'Doctor',
            dataIndex: ['appointment', 'doctor', 'name'],
        },
    ];
    return (
        <div>
            <h2>Reminders</h2>

            <CustomTable
                columns={columns}
                data={reminders}
            />
        </div>
    );
};

export default ListReminder;