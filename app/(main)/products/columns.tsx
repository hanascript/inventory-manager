"use client"

import { Product } from '@prisma/client'
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
]
