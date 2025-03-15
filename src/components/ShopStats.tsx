"use client";

import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Building2, CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { fetchShopStats } from "@/lib/api";
import { prefectures, getShopsByPrefecture, getBrandName } from "@/lib/shops";
import { useState, useMemo } from "react";

type ChartData = {
  time: string;
  male: number;
  female: number;
  total: number;
};

const getInitialDate = () => {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour < 18) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }
  
  return now;
};

export function ShopStats() {
  const [selectedPrefecture, setSelectedPrefecture] = useState(prefectures[0]);
  const [selectedShop, setSelectedShop] = useState("");
  const [date, setDate] = useState<Date>(getInitialDate());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const availableShops = useMemo(() => 
    getShopsByPrefecture(selectedPrefecture), [selectedPrefecture]
  );

  const handlePrefectureChange = (newPrefecture: string) => {
    setSelectedPrefecture(newPrefecture);
    const shops = getShopsByPrefecture(newPrefecture);
    if (shops.length > 0) {
      setSelectedShop(shops[0].id);
    }
  };

  useState(() => {
    if (availableShops.length > 0 && !selectedShop) {
      setSelectedShop(availableShops[0].id);
    }
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["shopStats", selectedShop, format(date, "yyyy-MM-dd")],
    queryFn: () => fetchShopStats(selectedShop, format(date, "yyyy-MM-dd")),
    enabled: !!selectedShop,
  });

  const formatDataForChart = (statsData: ReturnType<typeof fetchShopStats> extends Promise<infer T> ? T : never): ChartData[] => {
    if (!statsData?.data) return [];
    return statsData.data.map((item) => ({
      time: new Date(Number.parseInt(item.timestamp) * 1000).toLocaleTimeString('ja-JP', { 
        hour: '2-digit',
        minute: '2-digit'
      }),
      male: Number.parseInt(item.male),
      female: Number.parseInt(item.female),
      total: Number.parseInt(item.male) + Number.parseInt(item.female),
    }));
  };

  const getCurrentStats = () => {
    if (!data?.data || data.data.length === 0) return null;
    const latest = data.data[data.data.length - 1];
    return {
      male: Number.parseInt(latest.male),
      female: Number.parseInt(latest.female),
    };
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setIsCalendarOpen(false);
    }
  };

  const currentStats = getCurrentStats();
  const currentShop = availableShops.find(shop => shop.id === selectedShop);

  return (
    <div className="px-1 sm:px-4">
      <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/50 shadow-xl rounded-lg overflow-hidden py-0">
        <div className="flex flex-col gap-4 p-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gray-50/80 rounded-xl p-4 w-full max-w-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <Select value={selectedPrefecture} onValueChange={handlePrefectureChange}>
                    <SelectTrigger className="w-[200px] bg-white shadow-sm border-gray-200 h-10">
                      <Building2 className="m-3 h-4 w-4 text-gray-500 flex-shrink-0" />
                      <SelectValue placeholder="都道府県を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((prefecture) => (
                        <SelectItem key={prefecture} value={prefecture}>
                          {prefecture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedShop} onValueChange={setSelectedShop}>
                    <SelectTrigger className="w-[200px] bg-white shadow-sm border-gray-200 h-10">
                      <Building2 className="m-3 h-4 w-4 text-gray-500 flex-shrink-0" />
                      <SelectValue placeholder="店舗を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableShops.map((shop) => (
                        <SelectItem key={shop.id} value={shop.id}>
                          {`${shop.name} ${getBrandName(shop.brand)}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[200px] bg-white shadow-sm border-gray-200 font-normal h-10",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0" />
                      {date ? format(date, "PPP", { locale: ja }) : "日付を選択"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                      locale={ja}
                      className="bg-white rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {currentStats && currentShop && (
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-blue-600 mb-1">男性</span>
                    <span className="text-4xl font-bold text-blue-700">{currentStats.male}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-pink-600 mb-1">女性</span>
                    <span className="text-4xl font-bold text-pink-700">{currentStats.female}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full h-[400px]">
            {isLoading && (
              <div className="flex flex-col justify-center items-center h-full gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <div className="text-lg text-gray-500">データを読み込み中...</div>
              </div>
            )}
            {error && (
              <div className="flex flex-col justify-center items-center h-full gap-4">
                <div className="text-lg text-red-500">
                  <p className="font-semibold">エラーが発生しました</p>
                  <p className="text-base mt-2">{(error as Error).message}</p>
                </div>
              </div>
            )}
            {data && (
              <ResponsiveContainer width="100%" height="100%" className="-ml-4 sm:-ml-0">
                <LineChart data={formatDataForChart(data)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }} 
                  />
                  <Legend 
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{
                      paddingTop: "8px",
                      paddingRight: "12px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="male" 
                    stroke="#3b82f6" 
                    name="男性" 
                    strokeWidth={2} 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="female" 
                    stroke="#ec4899" 
                    name="女性" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#6366f1" 
                    name="合計" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}