import { useQuery } from '@tanstack/react-query';
import { getStats } from '@/lib/api';

export const useStats = () => useQuery(['donation-stats'], () => getStats().then(res => res.data));
