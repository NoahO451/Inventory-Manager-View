import { createFileRoute } from "@tanstack/react-router"; 

export const Route = createFileRoute("/app/inventory")({
  component: Inventory,
});

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
    return (
      <>
              <h1>Welcome to inventory</h1>
      </>
    )
}