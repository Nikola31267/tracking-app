import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const PLATFORM_LOGOS = {
  Windows:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Windows_logo_-_2012.svg/1200px-Windows_logo_-_2012.svg.png",
  "Mac OS X":
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  Linux: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  Android:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Android_logo_2019.svg/1200px-Android_logo_2019.svg.png",
  iOS: "https://upload.wikimedia.org/wikipedia/commons/c/ca/IOS_logo.svg",
  ChromeOS:
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chrome_OS_logo.png",
  WindowsPhone:
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Windows_Phone_logo.png",
};

const VisitTable = ({
  paginatedVisits,
  currentPage,
  totalPages,
  handlePageChange,
  isModalOpen,
  specificVisit,
  closeModal,
  fetchSpecificVisit,
  deleteVisit,
  toggleTableDropdown,
  openDropdownId,
  tableDropdownRef,
  isDialogOpen,
  setIsDialogOpen,
  visitToDelete,
  handleDeleteVisit,
}) => {
  return (
    <div className="container mx-auto py-10">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Browser
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referrer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVisits.map((visit, index) => (
              <tr
                key={visit._id || index}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => fetchSpecificVisit(visit._id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {PLATFORM_LOGOS[visit.platform] && (
                    <Image
                      src={PLATFORM_LOGOS[visit.platform]}
                      alt={visit.platform}
                      width={20}
                      height={20}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.ip || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.device || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.browser || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.platform || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.referrer || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.country || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visit?.page || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(visit?.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <MoreHorizontal
                    className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTableDropdown(visit._id);
                    }}
                  />
                  {openDropdownId === visit._id && (
                    <div
                      className="absolute bg-white shadow-md rounded-md -ml-2 z-10"
                      ref={tableDropdownRef}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="flex items-center gap-1 px-4 py-2 text-sm text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteVisit(visit._id);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                        Delete Record
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={`cursor-pointer ${
                    currentPage === index + 1 ? "" : ""
                  }`}
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {isModalOpen && specificVisit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Specific Visit Details</h2>
            <p>
              <strong>IP Address:</strong> {specificVisit.ip}
            </p>
            <p>
              <strong>Device:</strong> {specificVisit.device}
            </p>
            <p>
              <strong>Browser:</strong> {specificVisit.browser}
            </p>
            <p>
              <strong>Platform:</strong> {specificVisit.platform}
            </p>
            <p>
              <strong>Referrer:</strong> {specificVisit.referrer}
            </p>
            <p>
              <strong>Page:</strong> {specificVisit.page || "N/A"}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(specificVisit.timestamp).toLocaleString()}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this record?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              record and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteVisit}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VisitTable;
