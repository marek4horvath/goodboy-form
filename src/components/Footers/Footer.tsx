'use client';

import React from 'react';
import { FacebookFilled, InstagramOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import clsx from 'clsx';

interface FooterProps {
  className?: string;
  contentClassName?: string;
  showFacebook?: boolean;
  showInstagram?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  className,
  contentClassName,
  showFacebook = true,
  showInstagram = true,
}) => {
  const { t } = useTranslation('common');

  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={clsx(styles.footerContent, `${contentClassName}`)}>
        <div className={styles.left}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/logo.png"
              alt="Logo"
              preview={false}
              className={styles.logo}
            />
          </a>
        </div>

        <div className={styles.center}>
          {showFacebook && (
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled />
            </a>
          )}
          {showInstagram && (
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
          )}
          <a href="/contact">{t('footer.menu.contact')}</a>
          <a href="/about-project">{t('footer.menu.project')}</a>
        </div>

      </div>
    </footer>
  );
};
