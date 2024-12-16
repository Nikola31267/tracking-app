import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function NoVisitsTable() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="relative">
          <Table className="opacity-40">
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(4)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">--/--/----</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell>-----------------</TableCell>
                  <TableCell className="font-medium">--/--/----</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <p className="text-black text-2xl font-semibold">
              No visits to show
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
