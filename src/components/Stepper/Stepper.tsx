'use client';

import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './Stepper.module.scss';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'; 
import { StepOneForm } from '@/components/Forms/StepOneForm';
import { Footer } from '@/components/Footers/Footer';

const { Step } = Steps;

export const Stepper: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation('common');

  const [formData, setFormData] = useState<any>({
    donationType: '',
    shelter: '',
    amount: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const steps = [
    { title: t('steps.title.stepTitle1'), content: <StepOneForm formData={formData} setFormData={setFormData} /> },
    { title: t('steps.title.stepTitle2'), content: <div>{t('step2_title')} content</div> },
    { title: t('steps.title.stepTitle3'), content: <div>{t('step3_title')} content</div> },
  ];

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  return (
    <div className={styles.stepperContainer}>
      <Steps
        current={current}
        direction="horizontal"
        size="default"
        items={steps.map((item, index) => ({
          title: item.title,
          icon: index === current ? (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#4F46E5',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {index + 1}
            </div>
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '1px solid #d9d9d9',
                color: '#d9d9d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {index + 1}
            </div>
          ),
        }))}
      />

      <div className={styles.stepContent}>
        {steps[current].content}
      </div>

      <div className={styles.stepButtons}>
        {current > 0 ? 
          <Button onClick={prev} className={styles.btnBack}> <ArrowLeftOutlined /> {t('back')}</Button> : <div></div>}
        {current < steps.length - 1 ? (
          <Button onClick={next} className={styles.btnNext}>
            {t('next')} <ArrowRightOutlined />
          </Button>
        ) : (
          <Button className={styles.btnSubmit} onClick={() => alert('Odoslané!')}>
            {t('submit')}
          </Button>
        )}
      </div>
        <Footer />
    </div>
  );
};
