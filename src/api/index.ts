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


export const placeOrder = async (
  customerId: string,
  restaurantId: string,
  cartItems: { menu_item_id: string; quantity: number; price: number }[]
): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customerId,
        restaurant_id: restaurantId,
        menu_items: cartItems,
      }),
    });

    if (!response.ok) throw new Error('Failed to place order');

    return await response.json();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const getUnbilledOrders = async (
  customerId: string,
  restaurantId: string
): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/orders/unbilled`, {
      method: 'POST', // Using POST now
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customerId,
        restaurant_id: restaurantId,
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch unbilled orders');

    return await response.json();
  } catch (error) {
    console.error('Error fetching unbilled orders:', error);
    throw error;
  }
};

export const getBills = async (customerId: string): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/bills/${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch bills');

    return await response.json();
  } catch (error) {
    console.error('Error fetching bill details:', error);
    throw error;
  }
};

