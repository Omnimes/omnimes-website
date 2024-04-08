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
export const ComponentOfferTable = ({ columns,  rows, aria }: Props) => {
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

// <TableRow key="0">
//   <TableCell>Tony Reichert {base}</TableCell>
//   <TableCell>CEO {currency}</TableCell>
//   <TableCell>Active</TableCell>
//   <TableCell>Active</TableCell>
//   <TableCell>Active</TableCell>
// </TableRow>
// <TableRow key="1">
//   <TableCell>Tony Reichert</TableCell>
//   <TableCell>CEO</TableCell>
//   <TableCell>CEO</TableCell>
//   <TableCell>CEO</TableCell>
//   <TableCell>Active</TableCell>
// </TableRow>
// <TableRow key="2">
//   <TableCell>Zoey Lang</TableCell>
//   <TableCell>Technical Lead</TableCell>
//   <TableCell>Technical Lead</TableCell>
//   <TableCell>Technical Lead</TableCell>
//   <TableCell>Paused</TableCell>
// </TableRow>
// <TableRow key="3">
//   <TableCell>Jane Fisher</TableCell>
//   <TableCell>Senior Developer</TableCell>
//   <TableCell>Senior Developer</TableCell>
//   <TableCell>Senior Developer</TableCell>
//   <TableCell>Active</TableCell>
// </TableRow>
// <TableRow key="4">
//   <TableCell>William Howard</TableCell>
//   <TableCell>Community Manager</TableCell>
//   <TableCell>Community Manager</TableCell>
//   <TableCell>Community Manager</TableCell>
//   <TableCell>Vacation</TableCell>
// </TableRow>
