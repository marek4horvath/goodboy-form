'use client';

import React from 'react';
import { FacebookFilled, InstagramOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
    const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
            <a href="#" target="_blank" rel="noopener noreferrer" >
                <img src="/images/logo.png" alt="Logo" className={styles.logo}/>
            </a>
        </div>

        <div className={styles.center}>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" >
                <FacebookFilled />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined />
            </a>
            <a href="#">{t('footer.menu.contact')}</a>
            <a href="#">{t('footer.menu.project')}</a>
        </div>

      </div>
    </footer>
  );
};
