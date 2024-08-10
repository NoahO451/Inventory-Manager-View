import { Spinner } from "@/components/ui/shadcn/spinner";
import { useGetAllInventoryItems } from "@/features/auth/api/get-inventory-items";
import useUserStore from "@/hooks/useUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/inventory")({
  beforeLoad: ({ context }: any) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Inventory,
})

/**
 * Make a "get-inventory-items" api hook to call the GetAllInventoryItems end point
 * Import and call the hook here to get all inventory items for the user/business
 * 
 * For each item returned from the API, show them in a simple list with all of their
 * relevant information available. Don't concern yourself with styling anything yet. 
 * 
 * Additional: 
 * - You'll need to get the user's current UUID. Use the custom hook we have called useUserStore. 
 *   Useage can be found in the Zustand documentation or by referencing manage-account.tsx and/or
 *   app-provider.tsx. 
 * 
 * - Refer to get-user.ts to see an example of how we get the user with a custom hook. 
 */

function Inventory() {
  const businessUuid = "2b708a94-19d6-402b-b9c4-e2fef0e3f5aa"; //change this to the second business Uuid once I make it 
  const userStore = useUserStore();
  const userUuid = userStore.uuid;
  const getAllInventoryItemsQuery = useGetAllInventoryItems({ userUuid, businessUuid })

  const inventoryItems = getAllInventoryItemsQuery.data?.map(items => {
    return (
      <ul className="p-4">{items.inventoryItemUuid}
        <li>{items.name}</li>
        <li>{items.description}</li>
        <li>{items.sku}</li>
        <li>{items.cost}</li>
        <li>{items.serialNumber}</li>
        <li>{items.purchaseDate?.toLocaleString()}</li>
        <li>{items.supplier}</li>
        <li>{items.brand}</li>
        <li>{items.model}</li>
        <li>{items.quantity}</li>
        <li>{items.reorderQuantity}</li>
        <li>{items.location}</li>
        <li>{items.experationDate?.toLocaleString()}</li>
        <li>{items.category}</li>
        <li>{items.customPackageUuid}</li>
        <li>{items.itemWeightG}</li>
        <li>{items.isListed}</li>
        <li>{items.isLot}</li>
        <li>{items.notes}</li>
      </ul>
    )
  }
  )

  if (!getAllInventoryItemsQuery.isLoading && getAllInventoryItemsQuery.data) {
    return (
      <div className="p-4">
        <h1>Welcome to inventory</h1>
        <div className="flex">{inventoryItems}</div>
      </div>
    )
  };

  if (!getAllInventoryItemsQuery.isLoading && !getAllInventoryItemsQuery.data) {
    return (
      <div className="p-4">
        <h1>Welcome to inventory</h1>
        <div>
          <p>It looks like you don't have any inventory items. Would you like to make one?</p>
        </div>
      </div>
    )
  };

  if (getAllInventoryItemsQuery.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }
}