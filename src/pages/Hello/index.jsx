import React, { memo, useEffect } from 'react';
import useStore from './store';
import styles from './index.less';
import { Button, Input, Table } from 'antd';

export default memo(function Hello(props) {
  const data = useStore((state) => state.data);
  const actions = useStore((state) => state.actions);

  useEffect(() => {
    actions.fetchData();
  }, []);

  return (
    <div className={styles.hello}>
      <div className="filter">
        <Input.Search style={{ width: 200 }} />
        <Button>搜索</Button>
      </div>
      <Table
        style={{ marginTop: 16 }}
        bordered
        size="small"
        pagination={false}
        rowKey="id"
        dataSource={data}
      >
        <Table.Column title="名称" dataIndex="name" />
        <Table.Column title="描述" dataIndex="description" />
        <Table.Column title="创建时间" dataIndex="createTime" />
        <Table.Column title="更新时间" dataIndex="updateTime" />
        <Table.Column title="描述" dataIndex="description" />
      </Table>
    </div>
  );
});
