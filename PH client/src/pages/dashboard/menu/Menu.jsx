
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Logo from '/logo.png'
// Import icons from a React icon library like react-icons
// For this example, I'll use comments to indicate where icons would be

function Menu() {
  const location = useLocation()
  const [expanded, setExpanded] = useState({
    mockTest: false,
    settings: false,
  })

  
  const toggleExpand = (menu) => {
    setExpanded((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const isActive = (path) => location.pathname === path


  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.location.href = "/auth/admin/login" // Redirect to login page
  }

  return (
    <div className="w-64 h-full flex flex-col bg-[#8B0000] text-white sticky top-0">
      {/* Logo */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-3 flex items-center">
          <div className="w-6 h-6 bg-[#8B0000] rounded-full mr-2 flex justify-center items-center"></div>
          <img src={Logo} alt="logo" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link
          to="/"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* Home Icon */}
          <i className="mr-3">🏠</i>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/users"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/users") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* Users Icon */}
          <i className="mr-3">👥</i>
          <span>Users</span>
        </Link>

        <Link
          to="/question"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/question") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* Question Icon */}
          <i className="mr-3">❓</i>
          <span>Question</span>
        </Link>

        <div>
          <button
            onClick={() => toggleExpand("mockTest")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-md ${
              isActive("/mock-test") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
            }`}
          >
            <div className="flex items-center">
              {/* File Icon */}
              <i className="mr-3">📄</i>
              <span>Mock Test</span>
            </div>
            {/* Right Arrow Icon */}
            <i>▶</i>
          </button>
          {expanded.mockTest && (
            <div className="pl-12 space-y-1 mt-1">
              <Link to="/mock-test/create" className="block py-2 hover:text-gray-300">
                Create Test
              </Link>
              <Link to="/mock-test/history" className="block py-2 hover:text-gray-300">
                Test History
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/earning"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/earning") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* Dollar Icon */}
          <i className="mr-3">💰</i>
          <span>Earning</span>
        </Link>

        <Link
          to="/subscription"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/subscription") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* Crown Icon */}
          <i className="mr-3">👑</i>
          <span>Subscription</span>
        </Link>

        <Link
          to="/faq"
          className={`flex items-center px-4 py-3 rounded-md ${
            isActive("/faq") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
          }`}
        >
          {/* FAQ Icon */}
          <i className="mr-3">❔</i>
          <span>FAQ</span>
        </Link>

        <div>
          <button
            onClick={() => toggleExpand("settings")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-md ${
              isActive("/settings") ? "bg-[#6B0000]" : "hover:bg-[#6B0000]"
            }`}
          >
            <div className="flex items-center">
              {/* Settings Icon */}
              <i className="mr-3">⚙️</i>
              <span>Settings</span>
            </div>
            {/* Right Arrow Icon */}
            <i>▶</i>
          </button>
          {expanded.settings && (
            <div className="pl-12 space-y-1 mt-1">
              <Link to="/settings/profile" className="block py-2 hover:text-gray-300">
                Profile
              </Link>
              <Link to="/settings/terms" className="block py-2 hover:text-gray-300">
                Terms & Service
              </Link>
              <Link to="/settings/privacy" className="block py-2 hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link to="/settings/about" className="block py-2 hover:text-gray-300">
                About Us
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button onClick={handleLogOut} className="w-full flex items-center px-4 py-3 bg-[#6B0000] rounded-md hover:bg-[#5B0000]">
          {/* Logout Icon */}
          <i className="mr-3">🚪</i>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default Menu
