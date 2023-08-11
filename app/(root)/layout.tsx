import { Footer } from '@/components/ui/footer';
import { Navbar } from '@/components/ui/navbar';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
