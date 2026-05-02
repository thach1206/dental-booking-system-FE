import { Card, Row, Col, Typography } from 'antd';

const { Title } = Typography;

export default function AdminDashboard() {
  return (
    <div>
      <Title level={3}>Dashboard</Title>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <h3>Total Users</h3>
            <p>120</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <h3>Appointments</h3>
            <p>45</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <h3>Revenue</h3>
            <p>$2000</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}