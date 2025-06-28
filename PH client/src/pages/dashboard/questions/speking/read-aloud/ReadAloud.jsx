/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchWithAuth from "../../../../../utils/fetchWithAuth";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { ChevronLeft, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert for confirmation
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export default function ReadAloud() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_ADMIN_URL || "";

  const navigate = useNavigate();

  // Fetch data using react-query (updated to v5 syntax)
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["fetchData", currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${baseUrl}/test/speaking/read_aloud?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      if (data?.questions) {
        setTotalPages(Math.ceil((data.questionsCount) / itemsPerPage)); // Dynamically set total pages based on data
        return data.questions;
      } else {
        throw new Error("Data not found");
      }
    },
    keepPreviousData: true,
    onError: (error) => {
      console.error("React Query Error:", error);
    },
    onSuccess: (data) => {
      console.log("React Query Success:", data); // Debugging success data
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      fetchWithAuth(`${baseUrl}/admin/delete-question/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
      refetch(); // Re-fetch data after successful delete
    },
    onError: () => {
      Swal.fire("Error", "There was an error deleting the item.", "error");
    },
  });

  // Edit redirection
  const handleEdit = (item) => {
    navigate(`/question/read-aloud/${item._id}`, {
      state: {
        from: location.pathname, // Current page URL
        api: "/test/speaking/read_aloud", // API URL
        uniquePart: item._id, // Pass the item to edit
      },
    });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(item._id);
      }
    });
  };

  const handleClick = () => {
    navigate("/question/read-aloud/add", {
      state: {
        from: location.pathname, // Current page URL
        api: "/test/speaking/read_aloud", // API URL
      },
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    // Loop through pages and create buttons
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm border ${
            currentPage === i
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="max-w-full max-h-screen mx-auto bg-white">
      {/* Header */}
      <div className="bg-red-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
         <button onClick={() => navigate("/question")} className="flex items-center gap-2">
           <ChevronLeft className="w-5 h-5" />
          <h1 className="text-lg font-medium">Speaking (Read Aloud)</h1>
         </button>
        </div>
        
          <Button
            onClick={handleClick}
            variant="solid"
            size="sm"
            className="bg-red-800 hover:bg-red-900 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Question
          </Button>
        
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-700"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            {error?.message || "An error occurred"}
          </div>
        ) : (
          <div className="space-y-3">
            {data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-700 font-medium">
                      {item._id.slice(-6)}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-700">{item.heading}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(item)}
                        className="cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <div className="text-center py-8">No data available</div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-red-700 text-white border-red-700 hover:bg-red-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
          >
            Previous
          </Button>

          <div className="flex gap-1">{renderPageNumbers()}</div>

          <Input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const page = Number.parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="w-16 h-8 text-center text-sm"
            min="1"
            max={totalPages}
          />

          <span className="text-sm text-gray-600">{itemsPerPage}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-red-700 text-white border-red-700 hover:bg-red-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
