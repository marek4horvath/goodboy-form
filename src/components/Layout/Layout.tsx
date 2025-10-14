'use client';

import React from 'react';
import { Layout } from 'antd';
import styles from './Layout.module.scss';

const { Content } = Layout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          {children}

        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          <img src="/images/dog-right-panel.jpg" alt="Dog Illustration" />
        </div>
      </Content>
    </Layout>
  );
};
