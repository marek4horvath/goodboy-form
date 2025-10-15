import { FormData } from '../types/form';
import { TFunction } from 'i18next';
import { DONATION_TYPES } from '@/utils/appConstants';

export const validateStepOne = (formData: FormData, t: TFunction): { valid: boolean; error?: string } => {

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
