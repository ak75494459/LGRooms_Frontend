import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAccessChat = () => {
  const { getAccessTokenSilently } = useAuth0();
  const accessChat = async (targetId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId }),
    });

    if (!response.ok) {
      throw new Error("failed to access chat");
    }
  };
  const {
    mutateAsync: createChat,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(accessChat);

  if (isError) {
    toast.error("error in access chat");
  }

  return { createChat, isLoading, isSuccess };
};

export const useFetchChat = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchChat = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/chat`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat");
      }

      return await response.json();
    } catch (error: any) {
      console.error("Error fetching chats:", error.message);
      throw error;
    }
  };

  const {
    data: chats,
    isLoading,
    isError,
    refetch,
  } = useQuery("fetchChat", fetchChat, {
    onError: (error: any) => {
      toast.error(error.message || "Unable to fetch chats");
    },
  });

  return { chats, isLoading, isError, refetch };
};
