import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function NoPaymentsTable() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="relative">
          <Table className="opacity-40">
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Most Recent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(4)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">--------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell className="font-medium">--------</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="absolute inset-0 flex items-center justify-center bg-background/10">
            <p className="text-black text-xl font-semibold">
              No payments to show
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
