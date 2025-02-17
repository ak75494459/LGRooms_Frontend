import { PublicRoomPageState } from "@/pages/PublicRoomPage";
import { PublicRoom, PublicRoomSearchResponse } from "@/types";
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

export const useGetPublicRooms = (pageState?: PublicRoomPageState) => {
  const getPublicRoomsRequest = async (): Promise<PublicRoomSearchResponse> => {
    // ✅ Await token retrieval

    const params = new URLSearchParams();
    if (pageState?.page !== undefined) {
      params.set("page", pageState.page.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/api/public/rooms?${params.toString()}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch public rooms");
    }

    return response.json();
  };

  const {
    data: results = { data: [], pagination: { total: 0, page: 1, pages: 1 } }, // ✅ Default values
    isLoading,
    error,
  } = useQuery(["fetchPublicRooms", pageState?.page], getPublicRoomsRequest, {
    keepPreviousData: true, // ✅ Keeps previous data while loading new data
    staleTime: 5000, // ✅ Data is considered fresh for 5 seconds
  });

  if (error) {
    toast.error(error.toString());
  }

  return {
    results,
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
