'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Segmented, Select, Form, Input } from 'antd';
import styles from './StepOneForm.module.scss';
import { FormDataStepOne } from '@/types/form';
import { DONATION_TYPES, PRICE_OPTIONS } from '@/utils/appConstants';
import { fetchShelters } from '@/api/sheltersApi';
import { Shelter } from '@/types/shelters/contribute';

interface StepOneFormProps {
  formDataStepOne: FormDataStepOne;
  setFormDataStepOne: React.Dispatch<React.SetStateAction<FormDataStepOne>>;
}

export const StepOneForm: React.FC<StepOneFormProps> = ({ formDataStepOne, setFormDataStepOne}) => {
    const { t } = useTranslation('common');
    const [priceValue, setPriceValue] = useState<number | undefined>(formDataStepOne.price?.value);
    const [shelters, setShelters] = useState<Shelter[]>([]);

    useEffect(() => {
      if (formDataStepOne.price?.value) {
        setPriceValue(formDataStepOne.price.value);
      }
    }, [formDataStepOne.price]);

    useEffect(() => {
      const loadShelters = async () => {
        try {
          const data = await fetchShelters();
          setShelters(data);
        } catch (err) {
          console.error(err);
        }
      };
      loadShelters();
    }, [t]);

    const donationOptions = [
      { value: DONATION_TYPES.GENERAL, label: t('steps.content.stepOne.segmented.methodContribute.methodOne') },
      { value: DONATION_TYPES.SHELTER, label: t('steps.content.stepOne.segmented.methodContribute.methodTwo') },
    ];

    const handleSegmentClick = (val: number) => {
      setPriceValue(val);
      setFormDataStepOne({ ...formDataStepOne, price: { value: val, label: `${val}€` } });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) {
        setPriceValue(val);
        setFormDataStepOne({ ...formDataStepOne, price: { value: val, label: `${val}€` } });
      } else {
        setPriceValue(undefined);
        setFormDataStepOne({ ...formDataStepOne, price: undefined });
      }
    };

    const handleShelterChange = (val: number | undefined) => {
      const selected: Shelter | undefined = shelters.find(s => s.id === val);
      setFormDataStepOne({
        ...formDataStepOne,
        shelterId: val,
        shelter: selected ? selected.name : undefined,
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1>{t('steps.content.stepOne.title1')}</h1>

      <div className={styles.segmentedContainer}>
        <Segmented
          options={donationOptions}
          block
          value={formDataStepOne.donationType}
          onChange={(val) => setFormDataStepOne({ ...formDataStepOne, donationType: val })}
        />
      </div>

      <div className={styles.selectContainer}>
        <p>{t('steps.content.stepOne.sublable')}</p>

        <Form layout="vertical" initialValues={{ shelter: formDataStepOne.shelter || undefined }}>
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
              placeholder={t('steps.content.stepOne.shelterPlaceholder')}
              allowClear
              value={formDataStepOne.shelterId}
              onChange={(val: number | undefined) => handleShelterChange(val)}
            >

              {shelters.map((shelter) => (
                <Select.Option key={shelter.id} value={shelter.id}>
                  {shelter.name}
                </Select.Option>
              ))}
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
