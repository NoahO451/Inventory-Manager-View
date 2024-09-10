import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Checkbox } from "@/components/ui/shadcn/checkbox/checkbox";
import { Button } from "@/components/ui/shadcn/button/button";
import { FaCheckCircle, FaEdit, FaSort, FaSortDown, FaSortUp, FaTimesCircle, FaTrash } from "react-icons/fa";

// This type is used to define the shape of our data that goes into the table.
export type InventoryItemTableData = {
  id: string;
  item: string;
  quantity: number;
  cost: number;
  category: string;
  notes: string;
  location: string;
  purchaseDate: string;
  listed: boolean;
};

export const columns: ColumnDef<InventoryItemTableData>[] = [
  {
    id: "rowNumber",
    header: "#",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Item
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Quantity
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Cost
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cost);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Notes
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
},
  {
    accessorKey: "location",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Location
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
},
  {
    accessorKey: "purchaseDate",
    header: ({ column }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Purchase Date
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <FaSortUp />
          ) : (
            <FaSortDown />
          )
        ) : (
          <FaSort />
        )}
      </div>
    ),
  },
  {
    accessorKey: "listed",
    header: "Listed",
    cell: ({ row }) => {
      const listed = row.getValue<boolean>("listed");
      return listed ? (
        <FaCheckCircle color="green" aria-label="Listed" />
      ) : (
        <FaTimesCircle color="red" aria-label="Not Listed" />
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <FaEdit
          onClick={() => null /* handleEdit(row.original) */}
          style={{ cursor: "pointer" }}
          aria-label="Edit"
        />
        <FaTrash
          onClick={() => null /* handleDelete(row.original) */}
          style={{ cursor: "pointer", color: "red" }}
          aria-label="Delete"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border bg-white border-none">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
