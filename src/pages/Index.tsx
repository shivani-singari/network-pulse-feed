
import { Feed } from "@/components/Feed";
import { Navbar } from "@/components/Navbar";
import { ProfileSidebar, SuggestionsSidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="hidden md:block md:col-span-3">
            <ProfileSidebar />
          </aside>
          <div className="col-span-1 md:col-span-6">
            <Feed />
          </div>
          <aside className="hidden lg:block lg:col-span-3">
            <SuggestionsSidebar />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
