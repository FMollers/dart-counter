import { Navbar } from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <Navbar />
      <div className="hidden h-full inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default HomeLayout;
