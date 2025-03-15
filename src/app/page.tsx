import { ShopStats } from "@/components/ShopStats";

export default function Home() {
  return (
    <main className="min-h-screen pt-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
            相席カウンター
          </span>
        </h1>
        <ShopStats />
      </div>
    </main>
  );
}
