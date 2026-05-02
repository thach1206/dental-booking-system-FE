import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomTable from '@/components/common/CustomTable';
import { serviceService  } from '../../apis/services';
import { serviceActions } from '../../store/serviceSlice';

const ListService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const services = useSelector(state => state.service.services);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await serviceService.getAllServices();
                dispatch(serviceActions.setServices(res.data));
            } catch (err) {
                console.error('Failed to fetch services', err);
            }
        };

        fetchServices();
    }, [dispatch]);

    const handleAdd = () => {
        navigate('/services/edit'); // create new
    };

    const handleEdit = (record) => {
        navigate(`/services/edit/${record.id}`);
    };

    const handleDelete = (record) => {
        navigate(`/services/edit/${record.id}?mode=delete`);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Service Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
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
            <h2>Services</h2>

            <button onClick={handleAdd} style={{ marginBottom: '10px' }}>
                + Add Service
            </button>

            <CustomTable
                columns={columns}
                data={services}
            />
        </div>
    );
};

export default ListService;