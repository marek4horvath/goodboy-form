'use client';


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Segmented, Select, Form , Input} from 'antd';
import styles from './StepOneForm.module.scss';

interface StepOneFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const StepOneForm: React.FC<StepOneFormProps> = ({ formData, setFormData }) => {
    const { t } = useTranslation('common');
    const [priceValue, setPriceValue] = useState<number | undefined>(undefined);

    const options = [
        t('steps.content.stepOne.segmented.methodContribute.methodOne'),
        t('steps.content.stepOne.segmented.methodContribute.methodTwo')
    ];

    const price = [
        { value: 5, label: '5€' },
        { value: 10, label: '10€' },
        { value: 20, label: '20€' },
        { value: 30, label: '30€' },
        { value: 50, label: '50€' },
        { value: 100, label: '100€' },
    ];

    const handleSegmentClick = (val: number) => {
        setPriceValue(val);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) {
            setPriceValue(val);
        } else {
            setPriceValue(undefined);
        }
    };


  return (
    <div className={styles.formContainer}>
      <h1>{t('steps.content.stepOne.title1')}</h1>

      <div className={styles.segmentedContainer}>
        <Segmented
          options={options}
          block
          value={formData.donationType}
          onChange={(val) => setFormData({ ...formData, donationType: val })}
        />
      </div>

        <div className={styles.selectContainer}>
            <p>{t("steps.content.stepOne.sublable")}</p>
             <Form.Item
                layout="vertical"
                label={
                    <span className="label">
                        {t('steps.content.stepOne.lable')}
                        <span style={{ color: '#6B7280', marginLeft: '4px' }}>
                            {`(${t('optional')})`}
                        </span>
                    </span>
                }
                name="vertical" 
            >
                <Select
                    style={{ width: '100%', height: 50 }}
                    placeholder={t('steps.content.stepOne.shelterPlaceholder') + t("optional")}
                    allowClear
                    value={formData.shelter || undefined}
                    onChange={(val) => setFormData({ ...formData, shelter: val })}
                >
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="bella">Bella</Select.Option>
                    <Select.Option value="max">Max</Select.Option>
                </Select>
            </Form.Item>

            <div className={styles.priceContainer}>
                <p>{t('steps.content.stepOne.priceTitle')}</p>

                <Input
                    value={priceValue ?? 0}
                    onChange={handleInputChange}
                    className={styles.priceInput}
                    suffix={<span className={styles.suffix}>€</span>}
                />

                <Segmented
                    options={price}
                    block
                    value={formData.price?.value}
                    onChange={handleSegmentClick}
                />
            </div>
        </div>
    </div>
  );
};
