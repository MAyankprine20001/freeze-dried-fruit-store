import React, { useState } from "react";
import {
  Store, CreditCard, Truck, Mail, Bell, Shield, Database,
  Save, RefreshCw, Eye, Key, ToggleLeft, ToggleRight, CheckCircle
} from "lucide-react";
import { toast } from "react-toastify";

const tabs = [
  { label: "General", sub: "Store details", icon: Store },
  { label: "Payment", sub: "Payment methods", icon: CreditCard },
  { label: "Shipping", sub: "Shipping settings", icon: Truck },
  { label: "Email", sub: "Email templates", icon: Mail },
  { label: "Notifications", sub: "SMS & Email alerts", icon: Bell },
  { label: "Security", sub: "Security settings", icon: Shield },
  { label: "Backup", sub: "Backup & Restore", icon: Database },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button type="button" onClick={onChange}>
    {value ? <ToggleRight className="w-7 h-7 text-[#D4A017]" /> : <ToggleLeft className="w-7 h-7 text-gray-300" />}
  </button>
);

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [settings, setSettings] = useState({
    storeName: "The Dry Factory",
    storeEmail: "support@thedryfactory.com",
    storePhone: "+91 12345 67890",
    storeAddress: "123, Dry Fruits Street, Mumbai, Maharashtra - 400001, India",
    timezone: "Asia/Kolkata (IST)",
    currency: "INR (₹) - Indian Rupee",
    currencyPosition: "Left (₹99.00)",
    language: "English",
    dateFormat: "DD MM, YYYY (28 Apr, 2026)",
    timeFormat: "12 Hours (10:30 AM)",
    enableTax: true,
    taxRate: 18,
    enableCoupons: true,
    minOrderAmount: 499,
    enableCOD: true,
    maintenanceMode: false,
    maintenanceMessage: "We are under maintenance.\nWe'll be back soon!",
    ordersPerPage: 20,
    enableDarkMode: false,
    sidebarMiniView: false,
    activityLogs: true,
  });

  const save = () => toast.success("Settings saved successfully!");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">Manage all configurations and preferences.</p>
      </div>

      {/* Tab Bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === tab.label
                ? "bg-[#D4A017] text-[#111827] shadow-sm"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight">{tab.label}</p>
              <p className={`text-[9px] ${activeTab === tab.label ? "text-[#111827]/60" : "text-gray-400"}`}>{tab.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Store Information */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={1} color="bg-blue-500" />
            <h3 className="text-sm font-bold text-gray-800">Store Information</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Update your store details and contact information.</p>
          <div className="space-y-3">
            {[
              { label: "Store Name", key: "storeName" },
              { label: "Store Email", key: "storeEmail" },
              { label: "Store Phone", key: "storePhone" },
            ].map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs font-bold text-gray-600">{field.label}</label>
                <input
                  type="text"
                  value={settings[field.key as keyof typeof settings] as string}
                  onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none"
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Store Address</label>
              <textarea
                rows={2}
                value={settings.storeAddress}
                onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Timezone</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                <option>Asia/Kolkata (IST)</option>
                <option>UTC</option>
              </select>
            </div>
            <button onClick={save} className="w-full py-2 bg-[#D4A017] text-[#111827] rounded-lg text-sm font-bold hover:bg-[#c49015] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Currency & Language */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={2} color="bg-green-500" />
            <h3 className="text-sm font-bold text-gray-800">Currency & Language</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Manage currency and default language.</p>
          <div className="space-y-3">
            {[
              { label: "Currency", options: ["INR (₹) - Indian Rupee", "USD ($) - US Dollar"] },
              { label: "Currency Position", options: ["Left (₹99.00)", "Right (99.00₹)"] },
              { label: "Language", options: ["English", "Hindi"] },
              { label: "Date Format", options: ["DD MM, YYYY (28 Apr, 2026)", "MM/DD/YYYY", "YYYY-MM-DD"] },
              { label: "Time Format", options: ["12 Hours (10:30 AM)", "24 Hours (22:30)"] },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-xs font-bold text-gray-600">{field.label}</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                  {field.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={save} className="w-full py-2 bg-[#D4A017] text-[#111827] rounded-lg text-sm font-bold hover:bg-[#c49015] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={3} color="bg-purple-500" />
            <h3 className="text-sm font-bold text-gray-800">Business Settings</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Configure business related preferences.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Enable Tax (GST)</p>
                <p className="text-xs text-gray-400">Enable or disable tax for orders</p>
              </div>
              <Toggle value={settings.enableTax} onChange={() => setSettings({ ...settings, enableTax: !settings.enableTax })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Tax Rate (%)</label>
              <input type="number" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Enable Coupons</p>
                <p className="text-xs text-gray-400">Allow customers to use coupons</p>
              </div>
              <Toggle value={settings.enableCoupons} onChange={() => setSettings({ ...settings, enableCoupons: !settings.enableCoupons })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Minimum Order Amount (₹)</label>
              <input type="number" value={settings.minOrderAmount} onChange={(e) => setSettings({ ...settings, minOrderAmount: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-gray-800">Enable COD</p>
                <p className="text-xs text-gray-400">Allow Cash on Delivery option</p>
              </div>
              <Toggle value={settings.enableCOD} onChange={() => setSettings({ ...settings, enableCOD: !settings.enableCOD })} />
            </div>
            <button onClick={save} className="w-full py-2 bg-[#D4A017] text-[#111827] rounded-lg text-sm font-bold hover:bg-[#c49015] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={4} color="bg-orange-500" />
            <h3 className="text-sm font-bold text-gray-800">Maintenance Mode</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Enable maintenance mode (site will not be visible to users).</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Maintenance Mode</p>
                <p className="text-xs text-gray-400">Disable your store temporarily</p>
              </div>
              <Toggle value={settings.maintenanceMode} onChange={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Maintenance Message</label>
              <textarea
                rows={3}
                value={settings.maintenanceMessage}
                onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none resize-none"
              />
            </div>
            <button onClick={save} className="w-full py-2 bg-[#D4A017] text-[#111827] rounded-lg text-sm font-bold hover:bg-[#c49015] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Admin Preferences */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={5} color="bg-indigo-500" />
            <h3 className="text-sm font-bold text-gray-800">Admin Preferences</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Configure admin panel preferences.</p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Orders Per Page</label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Enable Dark Mode</p>
                <p className="text-xs text-gray-400">Switch between light and dark mode</p>
              </div>
              <Toggle value={settings.enableDarkMode} onChange={() => setSettings({ ...settings, enableDarkMode: !settings.enableDarkMode })} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Sidebar Mini View</p>
                <p className="text-xs text-gray-400">Collapse sidebar by default</p>
              </div>
              <Toggle value={settings.sidebarMiniView} onChange={() => setSettings({ ...settings, sidebarMiniView: !settings.sidebarMiniView })} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-gray-800">Activity Logs</p>
                <p className="text-xs text-gray-400">Enable admin activity logs</p>
              </div>
              <Toggle value={settings.activityLogs} onChange={() => setSettings({ ...settings, activityLogs: !settings.activityLogs })} />
            </div>
            <button onClick={save} className="w-full py-2 bg-[#D4A017] text-[#111827] rounded-lg text-sm font-bold hover:bg-[#c49015] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={6} color="bg-gray-600" />
            <h3 className="text-sm font-bold text-gray-800">System Information</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">View your system and application info.</p>
          <div className="space-y-2">
            {[
              { label: "Website Version", value: "v2.3.0" },
              { label: "Database Version", value: "MySQL 8.0.32" },
              { label: "PHP Version", value: "8.2.10" },
              { label: "Server", value: "Apache 2.4.58" },
              { label: "Last Updated", value: "May 04, 2026 10:30 AM" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className="text-xs font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> Check for Updates
          </button>
        </div>

        {/* Backup & Restore */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={7} color="bg-red-500" />
            <h3 className="text-sm font-bold text-gray-800">Backup & Restore</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">Backup your data regularly to prevent data loss.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-bold text-gray-800">Backup Now</p>
                <p className="text-xs text-gray-500">Create a manual backup</p>
              </div>
              <button onClick={() => toast.success("Backup started!")} className="ml-auto px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#1f2937]">
                Create Backup
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-bold text-gray-800">Last Backup</p>
                <p className="text-xs text-gray-500">May 04, 2026 02:30 AM</p>
                <p className="text-xs text-gray-400">Size: 125.6 MB</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-bold text-gray-800">Auto Backup</p>
                <p className="text-xs text-gray-500">Automatically backup your data</p>
                <span className="text-[10px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded">Enabled</span>
              </div>
              <button className="ml-auto px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-white">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
