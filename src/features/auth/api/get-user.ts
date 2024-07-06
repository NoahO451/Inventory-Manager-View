import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/query-config';
import { GetUserResponse } from '@/types/api-types';
import { api } from '@/lib/api-client';
import axios from 'axios';

function getUser(userUuid:string): Promise<GetUserResponse> { 
    console.log('trying to getUser with...')
    console.log(userUuid); 
    return api.get(`/api/users/${userUuid}`)
}

function getUserQueryOptions(userUuid:string) {
    return queryOptions({   
        queryKey: ['users', userUuid],
        queryFn: () => getUser(userUuid)
    })
}

type UseGetUserOptions = {
    userUuid: string; 
    queryConfig?: QueryConfig<typeof getUserQueryOptions>;
}

export const useGetUser = ({
    userUuid,
    queryConfig,
  }: UseGetUserOptions) => {
    return useQuery({
      ...getUserQueryOptions(userUuid),
      ...queryConfig,
    });
  };