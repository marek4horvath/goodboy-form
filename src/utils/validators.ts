import { FormDataStepOne, FormDataStepTwo } from '../types/form';
import { TFunction } from 'i18next';
import { DONATION_TYPES } from '@/utils/appConstants';

export const validateStepOne = (formData: FormDataStepOne, t: TFunction): { valid: boolean; error?: string } => {

    if (!formData.donationType) {
        return { valid: false, error: t('steps.validation.selectDonationType') };
    }


    if (formData.donationType === DONATION_TYPES.GENERAL && !formData.shelter) {
        return { valid: false, error: t('steps.validation.selectShelter') };
    }


    if (!formData.price || formData.price.value <= 0) {
        return { valid: false, error: t('steps.validation.selectPrice') };
    }


    return { valid: true };
};

export const validateStepTwo = (formData: FormDataStepTwo, t: TFunction): { valid: boolean; error?: string } => {

    if (!formData.lastName || formData.lastName.length < 2 || formData.lastName.length > 30) {
        return { valid: false, error: t('steps.validation.surnameRequired') };
    }

    if (!formData.email) {
        return { valid: false, error: t('steps.validation.emailRequired') };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return { valid: false, error: t('steps.validation.emailRequired') };
    }

    if (!formData.phone) {
        return { valid: false, error: t('steps.validation.phoneNumberRequired') };
    }

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        return { valid: false, error: t('steps.validation.phoneNumber') };
    }

    if (!formData.consent) {
        return { valid: false, error: t('steps.validation.consentRequired') };
    }

    return { valid: true };
};
