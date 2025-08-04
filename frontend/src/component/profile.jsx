import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  CogIcon,
  EyeIcon,
  MapPinIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  ChevronRightIcon,
  StarIcon,
  GiftIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Profile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/Login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/Login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost:8000/api/user/logout", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      if (setIsAuthenticated) setIsAuthenticated(false);
      navigate("/");
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute inset-0"></div>
          </div>
          <div className="text-xl font-medium text-gray-700">
            Loading your profile...
          </div>
          <div className="text-sm text-gray-500">
            Please wait while we fetch your data
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QuestionMarkCircleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/Login")}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-xl">No user data found</div>
      </div>
    );
  }

  const accountMenuItems = [
    {
      icon: ShoppingBagIcon,
      title: "Order History",
      description: "View past orders & track current",
      path: "/orders",
      badge: "3 Active",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: HeartIcon,
      title: "Wishlist",
      description: "Your saved eyewear favorites",
      path: "/wishlist",
      badge: "5 Items",
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
    {
      icon: EyeIcon,
      title: "Prescription",
      description: "Manage your vision details",
      path: "/prescription",
      badge: "Updated",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: MapPinIcon,
      title: "Addresses",
      description: "Delivery & billing addresses",
      path: "/addresses",
      badge: null,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      icon: CreditCardIcon,
      title: "Payment Methods",
      description: "Cards & payment options",
      path: "/payment-methods",
      badge: null,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      icon: BellIcon,
      title: "Notifications",
      description: "Email & SMS preferences",
      path: "/notifications",
      badge: null,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
  ];

  const quickActions = [
    {
      icon: EyeIcon,
      title: "Virtual Try-On",
      description: "Experience AR technology",
      subtext: "Try any frame instantly",
      path: "/virtual-try-on",
      gradient: "from-blue-600 via-blue-700 to-indigo-700",
      iconColor: "text-blue-100",
    },
    {
      icon: StarIcon,
      title: "Style Quiz",
      description: "Discover your perfect style",
      subtext: "Personalized recommendations",
      path: "/style-quiz",
      gradient: "from-purple-600 via-purple-700 to-pink-700",
      iconColor: "text-purple-100",
    },
    {
      icon: GiftIcon,
      title: "Exclusive Offers",
      description: "Member-only deals",
      subtext: "Save up to 40% today",
      path: "/offers",
      gradient: "from-emerald-600 via-green-700 to-teal-700",
      iconColor: "text-emerald-100",
    },
  ];

  const supportOptions = [
    {
      icon: QuestionMarkCircleIcon,
      title: "Help Center",
      description: "FAQs & guides",
      path: "/help",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Chat with our experts",
      path: "/chat",
    },
    {
      icon: PhoneIcon,
      title: "Call Support",
      description: "Speak to our team",
      action: () => window.open("tel:+1234567890"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 rotate-180" />
              <span className="font-medium">Back to Lensify</span>
            </button>
            <div className="text-sm text-gray-500">
              Welcome back, {user.firstname}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 h-24 relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute -bottom-12 left-8">
              <div className="relative group">
                <img
                  src={
                    user.avtar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl"
                />
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
                >
                  <PencilSquareIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 mb-6">{user.email}</p>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-sm">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow">
                    <div className="text-lg font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-500 font-medium">
                      Orders
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow">
                    <div className="text-lg font-bold text-purple-600">5</div>
                    <div className="text-xs text-gray-500 font-medium">
                      Wishlist
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-lg font-bold text-white">Premium</div>
                    <div className="text-xs text-white opacity-90 font-medium">
                      Member
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-medium"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Recommended for you
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className={`relative overflow-hidden p-6 bg-gradient-to-br ${action.gradient} text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <action.icon
                          className={`w-10 h-10 ${action.iconColor}`}
                        />
                        <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                      <p className="text-sm opacity-90 mb-1">
                        {action.description}
                      </p>
                      <p className="text-xs opacity-75 font-medium">
                        {action.subtext}
                      </p>
                    </div>

                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-5 rounded-full -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-700"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Account Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountMenuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={`relative p-4 border-2 ${item.color} rounded-xl hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Support & Help
              </h3>
              <div className="space-y-3">
                {supportOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      option.action ? option.action() : navigate(option.path)
                    }
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition text-left group"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition">
                      <option.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {option.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Settings
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <CogIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Preferences
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => navigate("/privacy")}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Privacy & Security
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sign Out</h3>
                  <p className="text-sm text-gray-600">
                    Logout from your account
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium shadow-sm"
              >
                Sign Out Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
