import { Home, PlusSquare, User } from "lucide-react";
import { ReactNode, useState } from "react";
import CreateModal from "./CreateModal";

interface LayoutProps {
  children: ReactNode;
  activeTab: "home" | "profile";
  onNavigate: (tab: "home" | "profile") => void;
}

const Layout = ({ children, activeTab, onNavigate }: LayoutProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const navItemClass = (isActive: boolean) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
      isActive
        ? "bg-gray-50 text-[#262626]"
        : "text-[#262626] hover:bg-gray-50 hover:translate-x-[1px]"
    }`;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626]">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[244px] lg:flex-col lg:border-r lg:border-[#dbdbdb] lg:bg-white">
        <div className="px-6 py-8 text-2xl font-semibold tracking-tight">InstaClone</div>
        <nav className="flex flex-1 flex-col gap-2 px-4">
          <a
            className={navItemClass(activeTab === "home")}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("home");
            }}
          >
            <Home className="h-5 w-5" />
            Home
          </a>
          <button
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#262626] transition-all hover:bg-gray-50 hover:translate-x-[1px]"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusSquare className="h-5 w-5" />
            Create
          </button>
          <a
            className={navItemClass(activeTab === "profile")}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("profile");
            }}
          >
            <User className="h-5 w-5" />
            Profile
          </a>
        </nav>
      </div>

      <main className="flex min-h-screen justify-center px-4 pb-20 pt-8 lg:pl-[244px]">
        <div className="w-full max-w-[470px]">{children}</div>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-[#dbdbdb] bg-white lg:hidden">
        <div className="mx-auto flex max-w-[470px] items-center justify-between px-8 py-3">
          <button
            className="flex flex-col items-center text-xs text-[#262626] transition-transform hover:scale-105"
            type="button"
            onClick={() => onNavigate("home")}
          >
            <Home className="h-5 w-5" />
            Home
          </button>
          <button
            className="flex flex-col items-center text-xs text-[#262626] transition-transform hover:scale-105"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusSquare className="h-5 w-5" />
            Create
          </button>
          <button
            className="flex flex-col items-center text-xs text-[#262626] transition-transform hover:scale-105"
            type="button"
            onClick={() => onNavigate("profile")}
          >
            <User className="h-5 w-5" />
            Profile
          </button>
        </div>
      </div>

      <CreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
};

export default Layout;
