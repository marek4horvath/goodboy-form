"use client"

import ProjectSection from "./ProjectSection"
import { Footer } from '@/components/Footers/Footer';
import styles from "./ProjektePage.module.scss"
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ProjectPage() {
  const { t } = useTranslation('common');

  return (
    <Layout className={styles.layout}>
        <div className={styles.container}>
            <a href="/" className={styles.backLink}>← { t('back') }</a>
            <h1>{ t('aboutProject.title') }</h1>
            <p className={styles.intro}>{ t('aboutProject.intro') }</p>

            <ProjectSection />

            <p className={styles.outro}>{ t('aboutProject.outro') }</p>
        </div>

        <Footer className={styles.footer} contentClassName={styles.footerContent}  showFacebook={false} showInstagram={false}/>
    </Layout>
  )
}
