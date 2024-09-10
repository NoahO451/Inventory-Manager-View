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

  const businessUuid = "2b708a94-19d6-402b-b9c4-e2fef0e3f5aa"; //change this to the second business Uuid once I make it 
  const userStore = useUserStore();
  const userUuid = userStore.uuid;

  // Delete test data when ready
  const testData = [
    {
      id: "728ed52f",
      item: "Space Invaders (Nintendo 64, 1997)",
      quantity: 3,
      cost: 5,
      category: "Games",
      notes: "",
      location: "Warehouse 1-5",
      purchaseDate: "11/05/1996",
      listed: true
    },
    {
      id: "91b7c2a4",
      item: "Super Mario 64 (Nintendo 64, 1996)",
      quantity: 5,
      cost: 5,
      category: "Games",
      notes: "This is a note to test how the table handles it.",
      location: "A1",
      purchaseDate: "11/05/1996",
      listed: true
    },
    {
      id: "3f9c8d7a",
      item: "The Legend of Zelda: Ocarina of Time (Nintendo 64, 1998)",
      quantity: 2,
      cost: 7,
      category: "Games",
      notes: "",
      location: "B2",
      purchaseDate: "03/15/1998",
      listed: false
    },
    {
      id: "5b1d2e9c",
      item: "GoldenEye 007 (Nintendo 64, 1997)",
      quantity: 4,
      cost: 6,
      category: "Games",
      notes: "Highly popular shooter game.",
      location: "C3",
      purchaseDate: "08/25/1997",
      listed: true
    },
    {
      id: "9f2b6e1c",
      item: "Banjo-Kazooie (Nintendo 64, 1998)",
      quantity: 3,
      cost: 5,
      category: "Games",
      notes: "",
      location: "D4",
      purchaseDate: "06/29/1998",
      listed: true
    },
    {
      id: "6d4a3f8b",
      item: "Mario Kart 64 (Nintendo 64, 1997)",
      quantity: 6,
      cost: 8,
      category: "Games",
      notes: "Complete with original box.",
      location: "E5",
      purchaseDate: "02/10/1997",
      listed: true
    },
    {
      id: "2e7b5f9a",
      item: "Donkey Kong 64 (Nintendo 64, 1999)",
      quantity: 2,
      cost: 9,
      category: "Games",
      notes: "",
      location: "F6",
      purchaseDate: "11/22/1999",
      listed: false
    },
    {
      id: "8c1f4d3e",
      item: "Star Fox 64 (Nintendo 64, 1997)",
      quantity: 5,
      cost: 6,
      category: "Games",
      notes: "Includes rumble pack.",
      location: "G7",
      purchaseDate: "07/01/1997",
      listed: true
    },
    {
      id: "7a9e2f3c",
      item: "Perfect Dark (Nintendo 64, 2000)",
      quantity: 3,
      cost: 7,
      category: "Games",
      notes: "",
      location: "H8",
      purchaseDate: "05/22/2000",
      listed: true
    },
    {
      id: "4b8d9c7f",
      item: "Paper Mario (Nintendo 64, 2000)",
      quantity: 4,
      cost: 8,
      category: "Games",
      notes: "",
      location: "I9",
      purchaseDate: "08/11/2000",
      listed: true
    },
    {
      id: "1e6a2d5c",
      item: "Kirby 64: The Crystal Shards (Nintendo 64, 2000)",
      quantity: 2,
      cost: 6,
      category: "Games",
      notes: "Light wear on the cartridge.",
      location: "J10",
      purchaseDate: "06/26/2000",
      listed: false
    },
    {
      id: "5d2c7a9f",
      item: "Yoshi's Story (Nintendo 64, 1997)",
      quantity: 4,
      cost: 5,
      category: "Games",
      notes: "",
      location: "K11",
      purchaseDate: "12/21/1997",
      listed: true
    }
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