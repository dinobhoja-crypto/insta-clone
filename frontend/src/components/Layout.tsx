import { Home, PlusSquare, User } from "lucide-react";
import { ReactNode, useState } from "react";
import CreateModal from "./CreateModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[240px] lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="px-6 py-8 text-2xl font-semibold">InstaClone</div>
        <nav className="flex flex-1 flex-col gap-2 px-4">
          <a
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <Home className="h-5 w-5" />
            Home
          </a>
          <button
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusSquare className="h-5 w-5" />
            Create
          </button>
          <a
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <User className="h-5 w-5" />
            Profile
          </a>
        </nav>
      </div>

      <main className="flex min-h-screen justify-center px-4 pb-20 pt-8 lg:pl-[240px]">
        <div className="w-full max-w-[470px]">{children}</div>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white lg:hidden">
        <div className="mx-auto flex max-w-[470px] items-center justify-between px-8 py-3">
          <button className="flex flex-col items-center text-xs text-gray-900" type="button">
            <Home className="h-5 w-5" />
            Home
          </button>
          <button
            className="flex flex-col items-center text-xs text-gray-900"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            <PlusSquare className="h-5 w-5" />
            Create
          </button>
          <button className="flex flex-col items-center text-xs text-gray-900" type="button">
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
