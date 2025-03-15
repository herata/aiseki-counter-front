type ShopStats = {
  timestamp: string;
  male: string;
  female: string;
};

type StatsResponse = {
  shop: string;
  date: string;
  data: ShopStats[];
};

export const fetchShopStats = async (shop: string, date: string): Promise<StatsResponse> => {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error('API endpoint not configured');
  }

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ shop, date }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('指定された日付のデータが見つかりませんでした');
      }
      
      const errorText = await response.text();
      let errorMessage: string;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || '不明なエラーが発生しました';
      } catch {
        errorMessage = 'データの取得に失敗しました';
      }
      
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }

    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('予期せぬエラーが発生しました');
  }
};