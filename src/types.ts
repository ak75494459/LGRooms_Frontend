export type User = {
  _id: string;
  email: string;
  name: string;
  number: string;
  addressLine1: string;
};

export type Room = {
  _id: string;
  pgName: string;
  imageUrl: string[];
  location: string;
  rent: number;
  contactNumber: number;
  description: string;
  lastUpdated: string;
};

export type PublicRoom = {
  _id: string;
  imageUrl: string[];
  rent: number;
  description: string;
};

export type MessageType = {
  _id: string;
  sender: any;
  content: string;
  readBy: any;
  chat: any;
};
