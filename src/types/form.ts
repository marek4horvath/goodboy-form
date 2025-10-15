
export interface PriceOption {
  value: number;
  label: string;
}

export interface FormData {
  donationType: string;
  shelter?: string;
  price?: PriceOption;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
}
