'use client';

import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { validateStepOne, validateStepTwo } from '@/utils/validators';
import { FormDataStepOne, FormDataStepTwo } from '@/types/form';
import styles from './Stepper.module.scss';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'; 
import { StepOneForm } from '@/components/Forms/StepOneForm';
import { StepTwoForm } from '@/components/Forms/StepTwoForm';
import { StepThreeReview } from '@/components/Forms/StepThreeReview';
import { Footer } from '@/components/Footers/Footer';
import { contributeToShelter } from '@/api/sheltersApi';
import { ShelterContributionRequest } from '@/types/shelters/contribute';

export const Stepper: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation('common');

  const [formDataStepOne, setFormDataStepOne] = useState<any>({
    donationType: '',
    shelter: '',
    shelterId: undefined,
    price: 0,
  });

  const [formDataStepTwo, setFormDataStepTwo] = useState<any>({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      prefixValue: '+421',
      consent: false,
  });

  const [consentStepThree, setConsentStepThree] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const steps = [
    { title: t('steps.title.stepTitle1'), content: <StepOneForm formDataStepOne={formDataStepOne} setFormDataStepOne={setFormDataStepOne} /> },
    { title: t('steps.title.stepTitle2'), content: <StepTwoForm formDataStepTwo={formDataStepTwo} setFormDataStepTwo={setFormDataStepTwo} /> },
    { title: t('steps.title.stepTitle3'), content: <StepThreeReview formDataStepOne={formDataStepOne} formDataStepTwo={formDataStepTwo} consentStepThree={consentStepThree} setConsentStepThree={setConsentStepThree}  /> },
  ];


  const next = () => {
    const { valid, error } = validateStepOne(formDataStepOne as FormDataStepOne, t);

    if (!valid) {
      messageApi.error(error, 3);
      return;
    }
    
    if (current === 1) {
      const { valid, error } = validateStepTwo(formDataStepTwo as FormDataStepTwo, t);
      if (!valid) {
        messageApi.error(error, 3);
        return;
      }
    }
    
    setCurrent(prev => prev + 1);
  };

  const prev = () => setCurrent((prev) => prev - 1);

  const submit = async () => {

    const payload: ShelterContributionRequest = {
      contributors: [
        {
          firstName: formDataStepTwo.firstName,
          lastName: formDataStepTwo.lastName,
          email: formDataStepTwo.email,
          phone: `${formDataStepTwo.countryCode} ${formDataStepTwo.phone}`,
        },
      ],
      shelterID: formDataStepOne.shelterId,
      value: formDataStepOne.price?.value ?? 0,
    };

    try {
      const response = await contributeToShelter(payload);

     if (response.messages && response.messages[0]?.type === 'SUCCESS') {
        messageApi.success(t('submitSucc'));

         setFormDataStepOne({
          donationType: '',
          shelter: '',
          shelterId: undefined,
          price: 0,
        });

        setFormDataStepTwo({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          countryCode: '+421',
          consent: false,
        });


        setCurrent(0);

      } else {
        messageApi.error(response.messages[0].message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.stepperContainer}>
      {contextHolder}

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
          <Button onClick={prev} className={styles.btnBack}> 
            <ArrowLeftOutlined /> {t('back')}
          </Button> : <div></div>}

        {current < steps.length - 1 ? (
          <Button onClick={next} className={styles.btnNext}>
            {t('next')} <ArrowRightOutlined />
          </Button>
        ) : (
          <Button className={styles.btnSubmit} disabled={!consentStepThree} onClick={submit}>
            {t('submit')}
          </Button>
        )}
      </div>

      <Footer />
    </div>
  );
};
