
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
          <div className="container-wide py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
