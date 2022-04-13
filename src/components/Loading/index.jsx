import React from 'react';
import styles from './index.less';
import { Skeleton } from 'antd';

export default function Loading(props) {
  return (
    <Skeleton
      className={styles.contentSkeleton}
      active
      loading={true}
      paragraph={{
        rows: 11,
      }}
    />
  );
}
