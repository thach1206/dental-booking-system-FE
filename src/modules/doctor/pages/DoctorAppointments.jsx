import { Table, Typography } from 'antd';

const { Title } = Typography;

export default function DoctorAppointments() {
  return (
    <div>
      <Title level={3}>Doctor Appointments</Title>

      <Table
        columns={[
          { title: 'Patient', dataIndex: 'patient' },
          { title: 'Time', dataIndex: 'time' },
        ]}
        dataSource={[
          { key: 1, patient: 'John', time: '10:00' },
        ]}
      />
    </div>
  );
}