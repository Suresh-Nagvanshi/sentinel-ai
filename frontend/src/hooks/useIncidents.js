import { useQuery } from '@tanstack/react-query';
import { incidentService } from '../services/incidentService';

export const useIncidents = (params = {}) => {
  return useQuery({
    queryKey: ['incidents', params],
    queryFn: () => incidentService.getIncidents(params),
  });
};
