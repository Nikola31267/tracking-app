import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

const PaymentsTable = ({ payments }) => {
  const aggregatedPayments = Object.values(
    payments.reduce((acc, payment) => {
      const { productName, value, timestamp } = payment;

      if (!acc[productName]) {
        acc[productName] = {
          productName,
          totalRevenue: 0,
          mostRecentTimestamp: timestamp,
        };
      }
      acc[productName].totalRevenue += value;
      if (
        new Date(timestamp) > new Date(acc[productName].mostRecentTimestamp)
      ) {
        acc[productName].mostRecentTimestamp = timestamp;
      }

      return acc;
    }, {})
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-2 text-xl font-bold">Payments</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue Made
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Most Recent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aggregatedPayments.map(
              ({ productName, totalRevenue, mostRecentTimestamp }) => (
                <tr
                  key={productName}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${totalRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(mostRecentTimestamp).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
