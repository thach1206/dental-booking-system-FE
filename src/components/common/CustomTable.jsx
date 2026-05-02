import { Table } from 'antd';
import { useState } from 'react';

const CustomTable = ({ columns, data, loading = false }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleChange = (paginationConfig) => {
    setPagination(paginationConfig);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
      onChange={handleChange}
      bordered
    />
  );
};

export default CustomTable;