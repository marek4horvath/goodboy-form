'use client';

import React from 'react';
import { Layout, Image } from 'antd';
import styles from './Layout.module.scss';

const { Content } = Layout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>

        <div className={styles.leftColumn}>
          {children}
        </div>

        <div className={styles.rightColumn}>
          <Image src="/images/dog-right-panel.jpg" alt="Dog Illustration" />
        </div>
      </Content>
    </Layout>
  );
};
