import { PublicRoom } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreatePublicRoom = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createPublicRoomRequest = async (
    publicRoomFormData: FormData
  ): Promise<PublicRoom> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/public/rooms`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: publicRoomFormData,
    });

    if (!response.ok) {
      let errorMessage = "Failed to create room";
      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
      } catch {
        // If response is not JSON, fallback to generic error
      }
      throw new Error(errorMessage);
    }

    return response.json();
  };

  const {
    mutate: createPublicRoom,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createPublicRoomRequest, {
    onSuccess: () => {
      toast.success("Room created!");
      // Optionally, invalidate related queries to refetch data
      // queryClient.invalidateQueries(["publicRooms"]);
    },
    onError: (err: any) => {
      const errorMessage = err?.message || "Unable to create room";
      toast.error(errorMessage);
    },
  });

  return { createPublicRoom, isLoading, isSuccess, error };
};

export const useGetPublicRooms = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getPublicRoomsRequest = async () => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/public/rooms`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch public room");
    }
    return response.json();
  };

  const {
    data: publicRooms,
    isLoading,
    error,
  } = useQuery("fetchPublicRooms", getPublicRoomsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    publicRooms,
    isLoading,
  };
};

export const useGetPublicRoom = () => {
  const { id } = useParams<{ id: string }>();

  const getPublicRoomRequest = async (context: {
    queryKey: [string, string];
  }): Promise<PublicRoom> => {
    const [, roomId] = context.queryKey;

    const response = await fetch(`${API_BASE_URL}/api/public/rooms/${roomId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch public room");
    }
    return response.json();
  };

  const {
    data: publicRoom,
    isLoading,
    isError,
  } = useQuery(
    ["fetchPublicRoom", id] as [string, string],
    getPublicRoomRequest,
    {
      enabled: !!id, // Ensure the query only runs if id is provided
    }
  );

  if (isError) {
    toast.error("Error in getting public room");
  }

  return { publicRoom, isLoading };
};
