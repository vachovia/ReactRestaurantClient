export interface orderDetailsDto {
  menuItemId?: number;
  quantity?: number;
  itemName?: string;
  price?: number;
}

export interface orderModel {
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  orderTotal?: number;
  stripePaymentIntentID?: string;
  status?: string;
  totalItems?: number;
  orderDetailsDtos?: orderDetailsDto[];
}