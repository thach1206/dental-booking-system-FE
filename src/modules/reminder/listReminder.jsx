import { useEffect, useState, useCallback, use } from 'react';
import { useTranslation } from 'react-i18next';
import { reminderService } from '../../apis/reminders';
import { useDispatch, useSelector } from 'react-redux';
import { reminderActions } from '../../store/reminderSlice';
import CustomTable from '@/components/common/CustomTable';
const ListReminder = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const reminders = useSelector(state => state.reminder.reminders);
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const res = await reminderService.getAllReminders();
                dispatch(reminderActions.setReminders(res.data));
            } catch (err) {
                console.error('Failed to fetch reminders', err);
            }
        };
        fetchReminders();
    }, []);
    useEffect(() => {
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