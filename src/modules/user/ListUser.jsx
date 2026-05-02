import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomTable from '@/components/common/CustomTable';
import { userService } from '../../apis/users';
import { userActions } from '../../store/userSlice';

const ListUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await userService.getAllUsers();
                
                dispatch(userActions.setUsers(res.data.data));
            } catch (err) {
                console.error('Failed to fetch users', err);
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleAdd = () => {
        navigate('/users/edit');
    };

    const handleEdit = (record) => {
        navigate(`/users/edit/${record.id}`);
    };

    const handleDelete = (record) => {
        navigate(`/users/edit/${record.id}?mode=delete`);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Role', dataIndex: 'role' },
        {
            title: 'Actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(record)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(record)}>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Users</h2>

            <button onClick={handleAdd} style={{ marginBottom: 10 }}>
                + Add User
            </button>

            <CustomTable columns={columns} data={users} />
        </div>
    );
};

export default ListUser;