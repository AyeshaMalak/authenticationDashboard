import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Clock,
  LogOut,
  Home,
  Activity,
  CheckCircle2,
  FolderOpen,
  Bell,
  Settings,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../redux/authSlice";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-blue-700">Dashboard</h1>
              </div>
              <button
                className="lg:hidden p-1 hover:bg-slate-100 rounded-md"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-2">
              <SidebarButton icon={<User size={20} />} label="Profile" />
              <SidebarButton icon={<Activity size={20} />} label="Stats" />
              <SidebarButton icon={<FolderOpen size={20} />} label="Projects" />
              <SidebarButton icon={<Settings size={20} />} label="Settings" />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
              Hello, {user.name.split(" ")[0]}! 👋
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Check your tasks, projects, and latest stats.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </header>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<CheckCircle2 className="text-blue-600" />} value="24" label="Active Tasks" badge="+12%" />
          <StatCard icon={<FolderOpen className="text-cyan-600" />} value="5" label="Projects" badge="+5%" />
          <StatCard icon={<TrendingUp className="text-green-600" />} value="98%" label="Success Rate" badge="+2%" />
          <StatCard icon={<Bell className="text-red-600" />} value="2" label="Alerts" badge="New" />
        </div>

        {/* Profile + quick stats */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <ProfileCard user={user} />
          <QuickStats />
        </div>

        <footer className="mt-auto text-center text-xs sm:text-sm text-slate-500 border-t border-slate-200 py-4">
          © {new Date().getFullYear()} <span className="font-semibold text-slate-700">YourApp</span> — All rights reserved.
        </footer>
      </main>
    </div>
  );
}

// Sidebar button
function SidebarButton({ icon, label }) {
  return (
    <button className="flex items-center gap-3 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition w-full">
      {icon} {label}
    </button>
  );
}

// Stat Card
function StatCard({ icon, value, label, badge }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        {badge && <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{badge}</span>}
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  );
}

// Profile Card
function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{user.name}</h3>
          <p className="text-xs text-slate-500">Your profile overview</p>
        </div>
      </div>
      <div className="space-y-3">
        <InfoRow icon={<Mail className="text-cyan-600" />} label="Email" value={user.email} />
        <InfoRow icon={<Clock className="text-blue-600" />} label="Member Since" value="Joined recently" />
      </div>
    </div>
  );
}

// Quick Stats
function QuickStats() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 grid grid-cols-2 gap-4 hover:shadow-lg transition">
      <StatCard icon={<CheckCircle2 className="text-blue-600" />} value="24" label="Tasks" />
      <StatCard icon={<FolderOpen className="text-cyan-600" />} value="5" label="Projects" />
      <StatCard icon={<TrendingUp className="text-green-600" />} value="98%" label="Success" />
      <StatCard icon={<Bell className="text-red-600" />} value="2" label="Alerts" />
    </div>
  );
}

// Info Row
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
      <div className="w-9 h-9 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
