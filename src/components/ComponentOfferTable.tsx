'use client'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
type Props = {
  columns: {
    key: string
    label: string
  }[]
  rows: {
      key: string;
      machine: string;
      period3: string;
      period6: string;
      period9: string;
      period12: string;
    }[],
  aria: string;
}
export const ComponentOfferTable = ({ columns, rows, aria }: Props) => {
  return (
    <Table aria-labelledby={aria} classNames={{ th: 'text-primary-600 font-black', base: "text-left" }}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (    
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}