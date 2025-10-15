'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Segmented, Select, Form, Input } from 'antd';
import styles from './StepOneForm.module.scss';
import { FormData } from '@/types/form';
import { DONATION_TYPES, PRICE_OPTIONS } from '@/utils/appConstants';

interface StepOneFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const StepOneForm: React.FC<StepOneFormProps> = ({ formData, setFormData }) => {
  const { t } = useTranslation('common');
  const [priceValue, setPriceValue] = useState<number | undefined>(formData.price?.value);

  useEffect(() => {
    if (formData.price?.value) {
      setPriceValue(formData.price.value);
    }
  }, [formData.price]);

  const donationOptions = [
    { value: DONATION_TYPES.GENERAL, label: t('steps.content.stepOne.segmented.methodContribute.methodOne') },
    { value: DONATION_TYPES.SHELTER, label: t('steps.content.stepOne.segmented.methodContribute.methodTwo') },
  ];

  const handleSegmentClick = (val: number) => {
    setPriceValue(val);
    setFormData({ ...formData, price: { value: val, label: `${val}€` } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setPriceValue(val);
      setFormData({ ...formData, price: { value: val, label: `${val}€` } });
    } else {
      setPriceValue(undefined);
      setFormData({ ...formData, price: undefined });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{t('steps.content.stepOne.title1')}</h1>

      <div className={styles.segmentedContainer}>
        <Segmented
          options={donationOptions}
          block
          value={formData.donationType}
          onChange={(val) => setFormData({ ...formData, donationType: val })}
        />
      </div>

      <div className={styles.selectContainer}>
        <p>{t('steps.content.stepOne.sublable')}</p>

        <Form layout="vertical" initialValues={{ shelter: formData.shelter }}>
          <Form.Item
            label={
              <span className="label">
                {t('steps.content.stepOne.lable')}
                <span style={{ color: '#6B7280', marginLeft: '4px' }}>({t('optional')})</span>
              </span>
            }
            name="shelter"
          >
            <Select
              style={{ width: '100%', height: 50 }}
              placeholder={`${t('steps.content.stepOne.shelterPlaceholder')} (${t('optional')})`}
              allowClear
              value={formData.shelter}
              onChange={(val) => setFormData({ ...formData, shelter: val })}
            >
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="bella">Bella</Select.Option>
              <Select.Option value="max">Max</Select.Option>
            </Select>
          </Form.Item>
        </Form>

        <div className={styles.priceContainer}>
          <p>{t('steps.content.stepOne.priceTitle')}</p>

          <Input
            min={0}
            value={priceValue ?? 0}
            onChange={handleInputChange}
            className={styles.priceInput}
            suffix={<span className={styles.suffix}>€</span>}
            variant="filled"
          />

          <Segmented
            options={PRICE_OPTIONS.map(p => ({ value: p.value, label: p.label }))}
            block
            value={priceValue}
            onChange={handleSegmentClick}
          />
        </div>
      </div>
    </div>
  );
};
