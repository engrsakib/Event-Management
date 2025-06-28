/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent } from "../../../components/ui/card";
import { Edit } from "lucide-react";
import { useGetLoggedInUser } from "../../../lib/logIn/useGetLoggedInUser";
import dummyPhoto from '/user.svg'

export default function PersonalInformation() {
  const { data: user, isLoading, isError, error } = useGetLoggedInUser();
  // Default data structure - will be replaced by your API data

  if (isLoading) {
    return;
  }
  if (isError) {
    return new Error(error.message || "Failed to fetch user data");
  }

  const [userInfo, setUserInfo] = useState({
    name: user?.user?.name || "Rakibul",
    email: user?.user?.email || "silvan346@gmail.com",
    phone: user?.user?.phone || "3000597212",
    countryCode: user?.user?.countryCode || "+1242",
    role: user?.user?.role || "Admin",
    profileImage:
      user?.user?.photoUrl || dummyPhoto,
    displayName: user?.user?.name || "Silvan",
  });

  const handleEditProfile = () => {
    // Handle edit profile action
    console.log("Edit Profile clicked");
  };

  const handleChangePassword = () => {
    // Handle change password action
    console.log("Change Password clicked");
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-800 text-white p-6">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  {/* Profile Image */}
                  <div className="relative mx-auto w-32 h-32">
                    <img
                      src={userInfo.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-red-800"
                    />
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {userInfo.name}
                    </h2>
                    <p className="text-gray-600">{userInfo.role}</p>
                  </div>

                  {/* Edit Profile Button */}
                  <Button
                    onClick={handleEditProfile}
                    className="bg-red-800 hover:bg-red-900 text-white w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Information Form Section */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <CardContent className="space-y-6">
                  {/* Change Password Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleChangePassword}
                      className="bg-red-800 hover:bg-red-900 text-white"
                    >
                      Change Password
                    </Button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                        
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        readOnly
                        type="text"
                        value={userInfo.displayName}
                        onChange={(e) =>
                          handleInputChange("displayName", e.target.value)
                        }
                        className="bg-gray-100 border-gray-300"
                        
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        readOnly
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="bg-gray-100 border-gray-300"
                      />
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          <span className="text-lg mr-2">🇺🇸</span>
                          <span className="text-sm text-gray-600">
                            {userInfo.countryCode}
                          </span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          value={userInfo.phone}
                          readOnly
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="bg-gray-100 border-gray-300 rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
