import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/query-config';
import { GetUserResponse } from '@/types/api-types';
import { api } from '@/lib/api-client';

function getUser(userUuid: string): Promise<GetUserResponse> {
  return api.get(`/api/users/${userUuid}`);
}

function getUserQueryOptions(userUuid: string) {
  return queryOptions({
    queryKey: ['users', userUuid],
    queryFn: () => getUser(userUuid),
  });
}

/**
 * Options for get user
 * Only call get user if we authenticatedc, have a jwt, and don't have userdata
 */
type UseGetUserOptions = {
  userUuid: string;
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
  isAuthenticated: boolean;
  cookieSet: boolean; 
  userData: boolean;
};

export const useGetUser = ({
  userUuid,
  queryConfig,
  isAuthenticated,
  cookieSet,
  userData
}: UseGetUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(userUuid),
    ...queryConfig,
    // staleTime: 120000, // default is 5 minutes
    // cacheTime: 120000,
    enabled: isAuthenticated && cookieSet && !userData, // Enable query based on isAuthenticated and cookieSet
  });
};
