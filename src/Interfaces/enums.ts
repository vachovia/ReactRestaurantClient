export enum SD_Roles {
  ADMIN = "Admin",
  USER = "User",
}

export enum SD_Status {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  BEING_COOKED = "Being Cooked",
  READY_FOR_PICKUP = "Ready for Pickup",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum SD_Categories {
  APPETIZER = "Appetizer",
  ENTREE = "Entrée",
  DESSERT = "Dessert",
  BEVERAGES = "Beverages",
}

export enum SD_SortTypes {
  PRICE_LOW_HIGH = "Price Low - High",
  PRICE_HIGH_LOW = "Price High - Low",
  NAME_A_Z = "Name A - Z",
  NAME_Z_A = "Name Z - A",
}

export interface StatusColor {
  color: string;
  value: SD_Status | string;
}
