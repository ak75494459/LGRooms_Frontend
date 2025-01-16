
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetPublicRoom = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getPublicRoomRequest = async () => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/public/rooms`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch public room");
    }
    return response.json();
  };

  const {
    data: publicRoom,
    isLoading,
    error,
  } = useQuery("fetchPublicRoom", getPublicRoomRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    publicRoom,
    isLoading,
  };
};
