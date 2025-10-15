'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactPage.module.scss';
import { Footer } from '@/components/Footers/Footer';
import ContactSection from "./ContactSection"
import { Image, Layout } from 'antd';

const ContactPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
   <Layout className={styles.layout}>
      <div className={styles.container}>
        <a href="/" className={styles.backLink}>← { t('back') }</a>
        <h1>{ t('contact.title') }</h1>
        <ContactSection />
        <div className={styles.imageWrapper}>
            <Image src="/images/dog-banner.jpg" alt="banner" className={styles.banner} preview={false} />
        </div>
      </div>
      <Footer className={styles.footer} contentClassName={styles.footerContent} showFacebook={false} showInstagram={false} />
    </Layout>
  )

}
export default ContactPage;
