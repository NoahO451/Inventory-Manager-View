import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { useGetAllInventoryItems } from "@/features/auth/api/get-inventory-items";
import { useCreateInventoryItem } from "@/features/inventory/api/create-inventory-item";
import { DataTable, InventoryItemTableData, columns } from "@/features/inventory/components/inventory-table/intentory-data-table";
import useUserStore from "@/hooks/useUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/app/inventory")({
  beforeLoad: async ({ context }: any) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Inventory,
})

/*
*
* Move the get-inventory-items.ts hook from feature/auth/api into feature/inventory/api folder
* 
* Goal: Now that we have the data coming down from the API for a user's inventory items, we 
* need to move and filter the data into a table to display it nicely. 
* 
* 1. There will be too much information returned from the API since, for example, we don't need
*    experationDate or supplier in the table. That info will show up in a modal or page later on. 
*    As such, take the data you do have from the API, and place it into a new type called 
*    "InventoryItemTableData." This is located in features/inventory/components/inventory-table. 
*    This type represents the information we'll display in the table. As such, it will be 
*    missing a lot of the properties from the GetInventoryItemsResponse you created. Try using 
*    Array.map to accomplish this. 
* 2. Next, you will create an async function that returns a Promise<InventoryItemTableData[]> 
* 3. This function will make the get all inventory items call you made in your hook to obtain 
*    all inventory items for a user. 
* 4. Call this function in a useEffect in the Inventory() function. 
* 
* https://ui.shadcn.com/docs/components/data-table#render-the-table
*/

function Inventory() {
  // Use useState to set the data you get back from your API call (╯°□°）╯︵ ┻━┻
  const [data, setData] = useState<InventoryItemTableData[]>([]);

  // Delete test data when ready
  const testData = [
    {
      id: "728ed52f",
      item: "Space Invaders (Nintendo 64, 1997)",
      quantity: 3,
    },
    {
      id: "91b7c2a4",
      item: "Super Mario 64 (Nintendo 64, 1996)",
      quantity: 5,
    },
  ];

  useEffect(() => {
    // Fetch data comes here. 
    // setData to your actual InventoryItemTableData response data 
    // if needed. 
    setData(testData);
  }, []);

// Add loading here, change the boolean if needed
//   if (getAllInventoryItemsQuery.isLoading) {
//     return (
//       <div className="flex h-screen w-screen items-center justify-center">
//         <Spinner size="xl" />
//       </div>
//     );
//   }
// }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}