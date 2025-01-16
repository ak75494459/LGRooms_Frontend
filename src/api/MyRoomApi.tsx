import { Room } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRooms = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRoomsRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/rooms`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("failed to get rooms");
    }
    return response.json();
  };

  const { data: rooms, isLoading } = useQuery(
    "fetchMyRooms",
    getMyRoomsRequest
  );

  return { rooms, isLoading };
};

export const useCreateMyRoom = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRoomRequest = async (roomFormData: FormData): Promise<Room> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: roomFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to create room");
    }

    return response.json();
  };

  const {
    mutate: createRoom,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRoomRequest, {
    onSuccess: () => {
      toast.success("Room created!");
    },
    onError: (err: any) => {
      const errorMessage = err?.message || "Unable to create room";
      toast.error(errorMessage);
    },
  });

  return { createRoom, isLoading, isSuccess, error };
};

export const useDeleteRoom = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const removeRoom = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/rooms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove room with id: ${id}`);
    }

    // Handle cases where the server might not return a body (204 No Content)
    try {
      return await response.json();
    } catch {
      return null; // If there's no content, return null
    }
  };

  const {
    mutateAsync: deleteRoom,
    isLoading,
    isError,
    error,
  } = useMutation(removeRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchMyRooms"]);
      toast.success("Room Deleted");
    },
    onError: (error: any) => {
      console.error("Error deleting room:", error.message);
      toast.error("error occured");
    },
  });

  return { deleteRoom, isLoading, isError, error };
};
