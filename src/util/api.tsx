const API_URL = 'https://szkvjn0so9.execute-api.us-east-1.amazonaws.com/getAllSunsets';


interface DynamoDBAttribute<T> {
    S?: string; // String type in DynamoDB
    N?: string; // Number type in DynamoDB (represented as a string)
    M?: Record<string, DynamoDBAttribute<any>>; // Map type
  }
  

export interface SunsetItem {
sunset_caption: DynamoDBAttribute<string>;
sunset_id: DynamoDBAttribute<string>;
sunset_location_coords: DynamoDBAttribute<Record<string, DynamoDBAttribute<any>>>;
sunset_location_name: DynamoDBAttribute<string>;
sunset_url: DynamoDBAttribute<string>;
user_name: DynamoDBAttribute<string>;
}

export interface ApiResponse {
  items: SunsetItem[];
}

export const invokeLambda = async (payload?: object): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    throw error;
  }
};
