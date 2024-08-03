import { Table } from "antd";
import "./index.css";

export function TableMain({size, columnsName, loading, dataSource, totalPages, pageSize }) {
  


  return (
    <div className="TableMain">
      <Table
        size={size}
        loading={loading}
        columns={columnsName}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          total: totalPages
        }}
        bordered={true}
      ></Table>
    </div>
  );
}
