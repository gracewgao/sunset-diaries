import { API_URL } from "../constants/constants";
import he from "he";

const GET_SUNSETS_URL = `${API_URL}/sunsets/all`;

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
  approved: DynamoDBAttribute<string>;
  upload_timestamp: DynamoDBAttribute<string>;
}

export interface ApiResponse {
  items: ApiSunsetItem[];
}

export interface Location {
  lat: number;
  lng: number;
}

export enum Status {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
};

// friendly interface for sunset item
export interface SunsetItem {
  sunsetCaption: string;
  sunsetId: string;
  sunsetLocationCoords: Location;
  sunsetLocationName: string;
  sunsetTimestamp: number;
  sunsetUrl: string;
  userName: string;
  approved: string;
  uploadTimestamp: number;
  index: number;
}

export const getDisplaySunsets = async (payload?: object): Promise<SunsetItem[]> => {
  try {
    const response = await fetch(GET_SUNSETS_URL, {
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
        sunsetCaption: he.decode(item.sunset_caption.S ?? ""),
        sunsetId: item.sunset_id.S!!,
        sunsetLocationCoords: {
          lat: parseFloat(item.sunset_location_coords.M!!.lat.N!!),
          lng: parseFloat(item.sunset_location_coords.M!!.lng.N!!),
        },
        sunsetLocationName: he.decode(item.sunset_location_name.S ?? ""),
        sunsetTimestamp: parseInt(item.sunset_timestamp.N!!, 10),
        sunsetUrl: item.sunset_url.S ?? "",
        userName: he.decode(item.user_name.S ?? ""),
        approved: item.approved.S ?? "",
        uploadTimestamp: parseInt(item.upload_timestamp.N!!, 10),
        index: -1, // assign after sorting
      }));
      sunsets.sort(
        (a, b) => a.sunsetLocationCoords.lng - b.sunsetLocationCoords.lng
      );
      sunsets.forEach((item, index) => {
        item.index = index;
      });
      return sunsets;
    } catch (error) {
      console.error("error parsing response:", error);
      throw error;
    }
  } catch (error) {
    console.error("error invoking Lambda:", error);
    throw error;
  }
};

export const getAdminSunsets = async (accessCode: string): Promise<SunsetItem[]> => {
  try {
    const response = await fetch(GET_SUNSETS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Code": accessCode,
      },
    });

    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    try {
      const sunsets: SunsetItem[] = result.items.map((item) => ({
        sunsetCaption: he.decode(item.sunset_caption.S ?? ""),
        sunsetId: item.sunset_id.S!!,
        sunsetLocationCoords: {
          lat: parseFloat(item.sunset_location_coords.M!!.lat.N!!),
          lng: parseFloat(item.sunset_location_coords.M!!.lng.N!!),
        },
        sunsetLocationName: he.decode(item.sunset_location_name.S ?? ""),
        sunsetTimestamp: parseInt(item.sunset_timestamp.N!!, 10),
        sunsetUrl: item.sunset_url.S ?? "",
        userName: he.decode(item.user_name.S ?? ""),
        index: -1, // assign after sorting
        approved: item.approved.S ?? "",
        uploadTimestamp: parseInt(item.upload_timestamp.N!!, 10),
      }));
      sunsets.sort(
        (a, b) => a.uploadTimestamp - b.uploadTimestamp
      );
      sunsets.forEach((item, index) => {
        item.index = index + 1;
      });
      return sunsets;
    } catch (error) {
      console.error("error parsing response:", error);
      throw error;
    }
  } catch (error) {
    console.error("error invoking Lambda:", error);
    throw error;
  }
};
