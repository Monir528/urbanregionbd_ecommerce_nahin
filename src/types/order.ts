// Interface for each item in the orderedItem array
export interface OrderedItem {
    id: string;
    name: string;
    image: string;
    price: string; // Note: price is a string in the JSON, but you might want to convert it to a number in your app
    cartQuantity: number;
}

// Interface for the main order object
export interface Order {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    division: string;
    orderedItem: OrderedItem[];
    date: string; // You might want to use Date type if you parse the string in your app
    total: number;
    status: "received" | "pending" | "shipped" | "delivered" | "cancelled" | "failed";
    payment:Payment
}

export interface Payment {
    phone: string;
    transId: string;
}
