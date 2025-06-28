import { useState, useEffect } from "react"

export default function Subscription() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [editingPlan, setEditingPlan] = useState(null)
  const [editForm, setEditForm] = useState({ days: "", price: "" })

  // useEffect দিয়ে ডাটা ফেচ করা
  useEffect(() => {
    // Mock data - এরে অফ অবজেক্ট
    const mockPlansData = [
      {
        id: 1,
        name: "Premium Plan",
        days: 10,
        price: 20,
        recommended: false,
      },
      {
        id: 2,
        name: "Premium Plan",
        days: 30,
        price: 50,
        recommended: false,
      },
      {
        id: 3,
        name: "Premium Plan",
        days: 60,
        price: 80,
        recommended: true,
      },
      {
        id: 4,
        name: "Premium Plan",
        days: 90,
        price: 140,
        recommended: false,
      },
    ];

    const fetchSubscriptionPlans = async () => {
      try {
        // যদি base URL থাকত তাহলে এভাবে fetch করতাম
        // const baseUrl = process.env.REACT_APP_BASE_URL
        // const response = await fetch(`${baseUrl}/api/subscription-plans`)
        // const data = await response.json()

        
        setTimeout(() => {
          setSubscriptionPlans(mockPlansData)
        }, 500) 
      } catch (error) {
        console.error("Error fetching subscription plans:", error)
        setSubscriptionPlans(mockPlansData) // Fallback to mock data
      }
    }

    fetchSubscriptionPlans()
  }, [])

  // Edit button click handler
  const handleEditClick = (plan) => {
    setEditingPlan(plan.id)
    setEditForm({
      days: plan.days.toString(),
      price: plan.price.toString(),
    })
  }

  // Save edited plan
  const handleSaveEdit = (planId) => {
    const updatedPlans = subscriptionPlans.map((plan) =>
      plan.id === planId
        ? {
            ...plan,
            days: Number.parseInt(editForm.days),
            price: Number.parseInt(editForm.price),
          }
        : plan,
    )
    setSubscriptionPlans(updatedPlans)
    setEditingPlan(null)
    setEditForm({ days: "", price: "" })
  }

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingPlan(null)
    setEditForm({ days: "", price: "" })
  }

  if (subscriptionPlans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-red-700 text-white px-6 py-4">
          <h1 className="text-xl font-semibold">Subscription</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">Subscription</h1>
      </div>

      {/* Subscription Plans */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-red-700 w-full text-white px-4 py-1 text-sm font-medium rounded">Recommended</div>
                </div>
              )}

              {/* Plan Card */}
              <div className="bg-red-50 rounded-lg p-6 text-center border border-red-100 shadow-sm">
                {/* Plan Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{plan.name}</h3>

                {/* Days */}
                <div className="mb-4">
                  {editingPlan === plan.id ? (
                    <input
                      type="number"
                      value={editForm.days}
                      onChange={(e) => setEditForm({ ...editForm, days: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-center w-24 text-lg font-bold"
                      placeholder="Days"
                    />
                  ) : (
                    <div className="border-2 border-gray-400 rounded-full px-4 py-2 inline-block">
                      <span className="text-lg font-bold text-gray-700">{plan.days} DAYS</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  {editingPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800 mr-1">$</span>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 text-center w-20 text-2xl font-bold"
                        placeholder="Price"
                      />
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-gray-800">${plan.price}</div>
                  )}
                </div>

                {/* Edit Button */}
                <div>
                  {editingPlan === plan.id ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleSaveEdit(plan.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(plan)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
