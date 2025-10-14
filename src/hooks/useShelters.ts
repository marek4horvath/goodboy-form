import { useQuery } from '@tanstack/react-query';
import { getShelters } from '@/lib/api';

export const useShelters = () => useQuery(['shelters'], () => getShelters().then(res => res.data));
