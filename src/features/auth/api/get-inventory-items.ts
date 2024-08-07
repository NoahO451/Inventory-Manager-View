import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/query-config';
import { api } from '@/lib/api-client';

export interface GetInventoryItemsResponse {
    inventoryItemUuid: string;
    name: string;
    description?: string;
    sku?: string;
    cost?: number;
    serialNumber?: string;
    purchaseDate?: Date;
    supplier?: string;
    brand?: string;
    model?: string;
    quantity: number;
    reorderQuantity?: number;
    location?: string;
    experationDate?: Date;
    category?: number;
    customPackageUuid?: string;
    itemWeightG?: number;
    isListed: boolean;
    isLot: boolean;
    notes?: string;
}

function getAllInventoryItems(userUuid?: string, businessUuid?: string): Promise<GetInventoryItemsResponse[]> {
    return api.get(`api/inventory-items/user/${userUuid}/business/${businessUuid}`);
}

function getAllInventoryItemsOptions(userUuid?: string, businessUuid?: string) {
    return queryOptions({
        queryKey: ['user', userUuid, 'business', businessUuid],
        queryFn: () => getAllInventoryItems(userUuid, businessUuid),
    });
}

/**
 * Options for get user
 * Only call get user if we authenticatedc, have a jwt, and don't have userdata
 */
type UseGetAllInventoryOptions = {
    userUuid?: string;
    businessUuid?: string;
    queryConfig?: QueryConfig<typeof getAllInventoryItemsOptions>;
};

export const useGetAllInventoryItems = ({
    userUuid,
    businessUuid,
    queryConfig,
}: UseGetAllInventoryOptions) => {
    return useQuery({
        ...getAllInventoryItemsOptions(userUuid, businessUuid),
        ...queryConfig,
        // staleTime: 120000, // default is 5 minutes
        // cacheTime: 120000,
    });
};