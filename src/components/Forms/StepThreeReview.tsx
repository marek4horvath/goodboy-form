'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Divider, Form, Checkbox } from 'antd';
import { FormDataStepOne, FormDataStepTwo } from '@/types/form';
import styles from './StepThreeReview.module.scss';

interface StepThreeReviewProps {
  formDataStepOne: FormDataStepOne;
  formDataStepTwo: FormDataStepTwo;
  consentStepThree: boolean;
  setConsentStepThree: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StepThreeReview: React.FC<StepThreeReviewProps> = ({ formDataStepOne, formDataStepTwo, consentStepThree, setConsentStepThree }) => {
    const { t } = useTranslation('common');
    const [form] = Form.useForm();

    const donationTypeTextMap: Record<string, string> = {
        general: t('steps.content.stepOne.segmented.methodContribute.methodOne'),
        shelter: t('steps.content.stepOne.segmented.methodContribute.methodTwo'),
    };
  
    const renderRow = (label: string, value: string | number | undefined) => (
        <Typography.Paragraph className={styles.reviewRow}>
        <span className={styles.label}>{label}:</span>
        <span className={styles.value}><strong>{value || '-'}</strong></span>
        </Typography.Paragraph>
    );


  return (
    <div className={styles.reviewContainer}>
        <h1>{t('steps.content.stepThree.title')}</h1>

        {renderRow(
            t('steps.content.stepThree.formAssistance'), 
            formDataStepOne.donationType ? donationTypeTextMap[formDataStepOne.donationType] : '-'
        )}

        {formDataStepOne.shelter && 
            renderRow(t('steps.content.stepThree.shelter'), formDataStepOne.shelter)
        }

        {renderRow(t('steps.content.stepThree.amountContribution'), formDataStepOne.price?.label)}

        <Divider />

        {renderRow(
            t('steps.content.stepThree.nameSurname'),
            `${formDataStepTwo.firstName || ''} ${formDataStepTwo.lastName || ''}`.trim()
        )}
        {renderRow(t('steps.content.stepThree.email'), formDataStepTwo.email)}
        {renderRow(
            t('steps.content.stepThree.phoneNumber'),
            `${formDataStepTwo.countryCode || formDataStepTwo.countryCode || ''} ${formDataStepTwo.phone || ''}`.trim()
        )}

        <Divider />
        <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            variant="filled"
        >
            <Form.Item
                name="consent"
                valuePropName="checked"
                rules={[
                    {
                    validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error(t('steps.content.stepTwo.form.message.consentRequired'))),
                    },
                ]}
            >
                <Checkbox
                    checked={consentStepThree}
                    onChange={(e) => setConsentStepThree(e.target.checked)}
                >
                    {t('steps.content.stepThree.consent')}
                </Checkbox>

            </Form.Item>
        </Form>
    </div>
  );
};
