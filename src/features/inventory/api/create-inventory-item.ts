import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/query-config';
import { getAllInventoryItemsOptions } from '@/features/auth/api/get-inventory-items';

export interface AddInventoryItemRequest {
    name: string;
    description: string | null;
    sKU: string | null;
    cost: number | null;
    serialNumber: string | null;
    purchaseDate: string | null;
    supplier: string | null;
    brand: string | null;
    model: string | null;
    quantity: number;
    reorderQuantity: number | null;
    location: string | null;
    expirationDate: string | null;
    category: number | null;
    customPackageUuid: string ;
    itemWeightG: number | null;
    isListed: boolean;
    isLot: boolean;
    notes: string | null;
    businessUuid: string;
    userUuid: string;
}

export const createInventoryItem = ({
  data,
}: {
  data: AddInventoryItemRequest;
}): Promise<string> => {
  return api.post(`api/inventory-items`, data);
};

type UseCreateInventoryItemOptions = {
  mutationConfig?: MutationConfig<typeof createInventoryItem>;
};

export const useCreateInventoryItem = ({
  mutationConfig,
}: UseCreateInventoryItemOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllInventoryItemsOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createInventoryItem,
  });
};

// export const createDiscussionInputSchema = z.object({
//   title: z.string().min(1, 'Required'),
//   body: z.string().min(1, 'Required'),
// });

// export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;

// export const createDiscussion = ({
//   data,
// }: {
//   data: CreateDiscussionInput;
// }): Promise<Discussion> => {
//   return api.post(`/discussions`, data);
// };

// type UseCreateDiscussionOptions = {
//   mutationConfig?: MutationConfig<typeof createDiscussion>;
// };

// export const useCreateDiscussion = ({
//   mutationConfig,
// }: UseCreateDiscussionOptions = {}) => {
//   const queryClient = useQueryClient();

//   const { onSuccess, ...restConfig } = mutationConfig || {};

//   return useMutation({
//     onSuccess: (...args) => {
//       queryClient.invalidateQueries({
//         queryKey: getDiscussionsQueryOptions().queryKey,
//       });
//       onSuccess?.(...args);
//     },
//     ...restConfig,
//     mutationFn: createDiscussion,
//   });
// };
