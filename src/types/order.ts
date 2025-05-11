// Interface for each item in the orderedItem array
export interface OrderedItem {
    id: string;
    name: string;
    cartQuantity: number;
    price: string | number;
    image: string;
    size: string;
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
    date: Date; // Always use Date type (ISO string or Date object)
    total: number;
    status: "received" | "pending" | "shipped" | "delivered" | "cancelled" | "failed";
    payment:Payment
}

export interface Payment {
    phone: string;
    transId: string;
}
