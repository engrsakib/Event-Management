import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { EnhancedUsersLoader } from "../../../components/public/enhanced-users-loader"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 9

const Earning = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // TanStack Query with baseUrl fallback to local json  
  const { data, isLoading, error } = useQuery({
    queryKey: ["earnings"],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_ADMIN_URL;
      

      if (!baseUrl) {
        const response = await fetch(`${baseUrl}/api/earnings`)
        if (!response.ok) {
          throw new Error("Failed to fetch earnings from API")
        }
        return response.json()
      }

      // Fetch local JSON file from public folder 
      const response = await fetch("/earning.json")
      if (!response.ok) {
        throw new Error("Failed to fetch earnings from local file")
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <EnhancedUsersLoader />
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-red-600 font-medium">Error loading earnings data: {error.message}</div>
      </div>
    )
  }

  const earnings = data?.earnings || []
  const totalEarning = earnings.reduce((sum, record) => sum + record.amount, 0)

  // Pagination
  const totalPages = Math.ceil(earnings.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEarnings = earnings.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className=" overflow-y-hidden p-4">
      <div className="max-w-6xl mx-auto">
        {/* Total Earning Header  */}
        <div className="mb-4">
          <div className="inline-flex items-center [background-image:linear-gradient(to_right,#D80000,#720000)] text-white px-4 py-2 rounded-md shadow-sm">
            <span className="text-sm font-medium mr-3">💰 Total Earning</span>
            <span className="text-lg font-bold">${totalEarning.toFixed(2)}</span>
          </div>
        </div>

        {/* Earning Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-red-700 text-white px-6 py-3">
            <h2 className="text-lg font-semibold m-0">Earning</h2>
          </div>

          {/* Table   */}
          {/* add */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">SI NO.</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Ac Number</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Time & Date</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentEarnings.map((record, index) => (
                  <TableRow key={`${record.id}-${index}`} record={record} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center px-6 py-4 bg-gray-50">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded border-none cursor-pointer transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              {renderPageNumbers().map((page, index) => (
                <PageButton key={index} page={page} currentPage={currentPage} onClick={handlePageChange} />
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1.5 text-sm font-medium rounded border-none cursor-pointer transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Next  →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableRow = ({ record }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <tr
      className={`border-b border-gray-100 transition-colors duration-200 ${
        isHovered ? "bg-gray-50" : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-3 text-sm text-gray-600">#{record.id}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{record.email}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{record.accountNumber}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{record.timeDate}</td>
      <td className="px-6 py-3 text-sm text-gray-600">${record.amount.toFixed(2)}</td>
    </tr>
  )
}

const PageButton = ({ page, currentPage, onClick }) => {
  const getButtonClasses = () => {
    const baseClasses =
      "px-3 py-1.5 text-sm font-medium rounded border-none cursor-pointer transition-all duration-200"

    if (page === currentPage) {
      return `${baseClasses} bg-red-600 text-white`
    } else if (page === "...") {
      return `${baseClasses} bg-transparent text-gray-400 cursor-default border-none`
    } else {
      return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50`
    }
  }

  return (
    <button
      onClick={() => typeof page === "number" && onClick(page)}
      disabled={page === "..."}
      className={getButtonClasses()}
    >
      {page}
    </button>
  )
}

export default Earning
