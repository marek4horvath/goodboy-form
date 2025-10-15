
export interface PriceOption {
  value: number;
  label: string;
}

export interface FormDataStepOne {
  donationType: string;
  shelter?: string;
  shelterId?: number;
  price?: PriceOption;
}

export interface FormDataStepTwo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryCode?: string; 
  consent?: boolean;
}
