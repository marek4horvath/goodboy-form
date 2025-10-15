export interface Contributor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShelterContributionRequest {
  contributors: Contributor[];
  shelterID: number;
  value: number;
}

export interface Shelter {
  id: number;
  name: string;
}

export interface ShelterResults {
  contributors: number;
  contribution: number;
}


export interface ShelterContributionResponse {
  messages: {
    type: 'SUCCESS' | 'ERROR';
    message: string;
  }[];
}
