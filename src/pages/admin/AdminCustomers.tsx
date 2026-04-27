import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Mail, Phone, MapPin, ShoppingBag,
  CheckCircle, XCircle, ChevronLeft, ChevronRight,
  TrendingUp, IndianRupee, UserCheck
} from "lucide-react";
import { getAllCustomers, type Customer } from "../../api/auth.api";
import { toast } from "react-toastify";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchCustomers(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const fetchCustomers = async (pageNumber: number, search: string) => {
    setLoading(true);
    try {
      const response = await getAllCustomers(pageNumber, 20, search);
      if (response.success) {
        setCustomers(response.data);
        setTotalPages(response.pages || 1);
        setTotalCustomers(response.total || 0);
      } else {
        toast.error("Failed to load customers");
      }
    } catch (err) {
      toast.error("An error occurred while fetching customers.");
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = useMemo(
    () => customers.reduce((sum, c) => sum + c.totalSpent, 0),
    [customers]
  );
  const verifiedCount = useMemo(
    () => customers.filter((c) => c.isEmailVerified).length,
    [customers]
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-1">Customers</h1>
          <p className="text-[#6c757d] text-sm">
            Manage {totalCustomers} registered customers.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-sm font-medium text-[#6c757d] mb-1">Total Customers</p>
          <h3 className="text-2xl font-bold text-[#1a1a1a]">{totalCustomers}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-[#6c757d] mb-1">Verified Emails</p>
          <h3 className="text-2xl font-bold text-[#1a1a1a]">{verifiedCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-amber-600" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +8%
            </span>
          </div>
          <p className="text-sm font-medium text-[#6c757d] mb-1">Revenue (Page)</p>
          <h3 className="text-2xl font-bold text-[#1a1a1a]">₹{totalSpent.toLocaleString()}</h3>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#eef0f2] rounded-2xl shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-[#eef0f2] flex items-center gap-3 bg-[#fcfdfd]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#adb5bd] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-[#eef0f2] rounded-lg text-sm focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none w-full transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fcfdfd] border-b border-[#eef0f2] text-[#6c757d]">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Verified</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold text-right">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f2]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-[#6c757d] font-medium">Loading customers...</p>
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#adb5bd]" />
                    </div>
                    <p className="text-[#1a1a1a] font-bold text-lg mb-1">No customers found</p>
                    <p className="text-[#6c757d]">Try adjusting your search.</p>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <React.Fragment key={customer._id}>
                    <tr
                      onClick={() =>
                        setExpandedCustomer(
                          expandedCustomer === customer._id ? null : customer._id
                        )
                      }
                      className={`hover:bg-[#f8f9fa] transition-colors cursor-pointer ${
                        expandedCustomer === customer._id ? "bg-[#f8f9fa]" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {getInitials(customer.fullName)}
                          </div>
                          <p className="font-bold text-[#1a1a1a]">{customer.fullName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6c757d]">{customer.email}</td>
                      <td className="px-6 py-4">
                        {customer.isEmailVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#E8F5E9] text-[#2E7D32]">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#FFF3E0] text-[#E65100]">
                            <XCircle className="w-3 h-3" /> Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-[#adb5bd]" />
                          <span className="font-semibold text-[#1a1a1a]">{customer.orderCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#1a1a1a]">
                        ₹{customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-[#6c757d]">
                        {new Date(customer.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>

                    {/* Expanded row */}
                    <AnimatePresence>
                      {expandedCustomer === customer._id && (
                        <tr>
                          <td colSpan={6} className="p-0 border-b-0">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-[#fafbfc] border-y border-[#eef0f2] overflow-hidden"
                            >
                              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Contact */}
                                <div className="bg-white border border-[#eef0f2] rounded-xl p-5 shadow-sm">
                                  <p className="text-xs font-bold text-[#b8860b] uppercase tracking-wider mb-3">
                                    Contact Info
                                  </p>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-[#495057]">
                                      <Mail className="w-4 h-4 text-[#adb5bd]" />
                                      <span>{customer.email}</span>
                                    </div>
                                    {customer.address?.phone && (
                                      <div className="flex items-center gap-2 text-sm text-[#495057]">
                                        <Phone className="w-4 h-4 text-[#adb5bd]" />
                                        <span>{customer.address.phone}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Address */}
                                <div className="bg-white border border-[#eef0f2] rounded-xl p-5 shadow-sm">
                                  <p className="text-xs font-bold text-[#b8860b] uppercase tracking-wider mb-3">
                                    Address
                                  </p>
                                  {customer.address?.addressLine1 ? (
                                    <div className="flex items-start gap-2 text-sm text-[#495057]">
                                      <MapPin className="w-4 h-4 text-[#adb5bd] mt-0.5 flex-shrink-0" />
                                      <p className="leading-relaxed">
                                        {customer.address.addressLine1}
                                        {customer.address.addressLine2 && (
                                          <>, {customer.address.addressLine2}</>
                                        )}
                                        <br />
                                        {customer.address.city}, {customer.address.state}{" "}
                                        {customer.address.pincode}
                                      </p>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-[#adb5bd]">No address on file</p>
                                  )}
                                </div>

                                {/* Stats */}
                                <div className="bg-white border border-[#eef0f2] rounded-xl p-5 shadow-sm">
                                  <p className="text-xs font-bold text-[#b8860b] uppercase tracking-wider mb-3">
                                    Purchase Stats
                                  </p>
                                  <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#6c757d]">Orders placed</span>
                                      <span className="font-bold text-[#1a1a1a]">{customer.orderCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#6c757d]">Total spent</span>
                                      <span className="font-bold text-[#1a1a1a]">
                                        ₹{customer.totalSpent.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#6c757d]">Avg. order value</span>
                                      <span className="font-bold text-[#1a1a1a]">
                                        {customer.orderCount > 0
                                          ? `₹${Math.round(customer.totalSpent / customer.orderCount).toLocaleString()}`
                                          : "—"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#eef0f2] flex items-center justify-between bg-[#fcfdfd]">
            <span className="text-sm text-[#6c757d]">
              Showing{" "}
              <span className="font-bold text-[#1a1a1a]">{customers.length}</span> of{" "}
              {totalCustomers} customers
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-[#eef0f2] bg-white rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-[#eef0f2] bg-white rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
