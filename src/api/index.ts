const baseUrl = 'https://chatpata-ai-backend-production.up.railway.app';

// Fetch all restaurants
export const fetchAllRestaurants = async (): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/restaurants`);
    if (!response.ok) throw new Error('Failed to fetch restaurants');
    return await response.json();
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

// Fetch menu items for a specific restaurant
export const fetchMenuByRestaurant = async (restaurantId: string): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/menu-items/${restaurantId}`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};