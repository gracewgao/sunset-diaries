const API_URL =
  "https://szkvjn0so9.execute-api.us-east-1.amazonaws.com/sunsets/all";

interface DynamoDBAttribute<T> {
  S?: string; // string type in DynamoDB
  N?: string; // number type in DynamoDB (represented as a string)
  M?: Record<string, DynamoDBAttribute<any>>; // map type
}

interface ApiSunsetItem {
  sunset_caption: DynamoDBAttribute<string>;
  sunset_id: DynamoDBAttribute<string>;
  sunset_location_coords: DynamoDBAttribute<
    Record<string, DynamoDBAttribute<any>>
  >;
  sunset_location_name: DynamoDBAttribute<string>;
  sunset_timestamp: DynamoDBAttribute<string>;
  sunset_url: DynamoDBAttribute<string>;
  user_name: DynamoDBAttribute<string>;
}

export interface ApiResponse {
  items: ApiSunsetItem[];
}

export interface Location {
  lat: number;
  lng: number;
}

// friendly interface for sunset item
export interface SunsetItem {
  sunsetCaption: string;
  sunsetId: string
  sunsetLocationCoords: Location;
  sunsetLocationName: string;
  sunsetTimestamp: number;
  sunsetUrl: string;
  userName: string;
}

export const invokeLambda = async (payload?: object): Promise<SunsetItem[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    try {
      const sunsets: SunsetItem[] = result.items.map((item) => ({
        sunsetCaption: item.sunset_caption.S ?? "",
        sunsetId: item.sunset_id.S!!,
        sunsetLocationCoords: {
          lat: parseFloat(item.sunset_location_coords.M!!.lat.N!!),
          lng: parseFloat(item.sunset_location_coords.M!!.lng.N!!),
        },
        sunsetLocationName: item.sunset_location_name.S ?? "",
        sunsetTimestamp: parseInt(item.sunset_timestamp.N!!, 10),
        sunsetUrl: item.sunset_url.S ?? "",
        userName: item.user_name.S ?? "",
      }));
      return sunsets;
    } catch (error) {
      console.error("Error parsing response:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error invoking Lambda:", error);
    throw error;
  }
};
