'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Checkbox } from 'antd';
import styles from './StepTwoForm.module.scss';
import { FormDataStepTwo } from '@/types/form';
import { COUNTRY_OPTIONS } from '@/utils/appConstants';

interface StepTwoFormProps {
  formDataStepTwo: FormDataStepTwo;
  setFormDataStepTwo: React.Dispatch<React.SetStateAction<FormDataStepTwo>>;
}

export const StepTwoForm: React.FC<StepTwoFormProps>  = ({ formDataStepTwo, setFormDataStepTwo}) => {
    const { t } = useTranslation('common');
    const [form] = Form.useForm();

    const countryOptions = COUNTRY_OPTIONS;

    const [prefixValue, setPrefixValue] = useState('+421');
    const [phoneValue, setPhoneValue] = useState('');

     useEffect(() => {
        form.setFieldsValue(formDataStepTwo);
    }, [formDataStepTwo, form]);

    const handleValuesChange = (changed: any, allValues: any) => {
        setFormDataStepTwo(allValues);
    };

    const handleCountryChange = (newPrefix: string) => {
        setPrefixValue(newPrefix);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(e.target.value);
    };

    return (
        <div className={styles.formContainer}>
        <h1>{t('steps.content.stepTwo.title')}</h1>

        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange} 
            autoComplete="off"
            variant="filled"
        >
            <p>{t('steps.content.stepTwo.form.title')}</p>

            <div className={styles.nameRow}>
                <Form.Item
                    label={t('steps.content.stepTwo.form.lable.name')}
                    name="firstName"
                    rules={[
                    { min: 2, max: 20, message: t('steps.content.stepTwo.form.message.name') },
                    ]}
                    className={styles.half}
                >
                    <Input placeholder={t('steps.content.stepTwo.form.placeholder.name')} />
                </Form.Item>

                <Form.Item
                    label={t('steps.content.stepTwo.form.lable.surname')}
                    name="lastName"
                    rules={[
                    { required: true, message: t('steps.content.stepTwo.form.message.surnameRequired') },
                    { min: 2, max: 30, message: t('steps.content.stepTwo.form.message.surname') },
                    ]}
                    className={styles.half}
                >
                    <Input placeholder={t('steps.content.stepTwo.form.placeholder.surname')} />
                </Form.Item>
            </div>


            <Form.Item
                label={t('steps.content.stepTwo.form.lable.email')}
                name="email"
                rules={[
                    { required: true, message: t('steps.content.stepTwo.form.message.emailRequired') },
                    { type: 'email', message: t('steps.content.stepTwo.form.message.email') },
                ]}
                >
                <Input placeholder={t('steps.content.stepTwo.form.placeholder.email')} />
            </Form.Item>

            <Form.Item label={t('steps.content.stepTwo.form.lable.phoneNumber')}>
                <div className={styles.phoneRow} style={{ display: 'flex', gap: 8 }}>
                
                    <Form.Item
                        name="countryCode"
                        noStyle
                        initialValue={prefixValue}
                    >
                        <Select
                            onChange={handleCountryChange}
                            className={styles.countrySelect}
                            style={{ width: 70 }}
                        >
                            {countryOptions.map(opt => (
                            <Select.Option key={opt.value} value={opt.value}>
                                {opt.label}
                            </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: t('steps.content.stepTwo.form.message.phoneNumberRequired') },
                            {
                            pattern: /^\d{9}$/,
                            message: t('steps.content.stepTwo.form.message.phoneNumber'),
                            },
                        ]}
                        style={{ flex: 1, margin: 0 }}
                    >
                        <Input
                            type="tel"
                            placeholder={t('steps.content.stepTwo.form.placeholder.phoneNumber')} 
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            prefix={prefixValue}
                        />
                    </Form.Item>

                </div>
            </Form.Item>


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
                <Checkbox>
                    {t('steps.content.stepTwo.form.lable.consent')}
                </Checkbox>
            </Form.Item>

        </Form>
        </div>
    );
};
