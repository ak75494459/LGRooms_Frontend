import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetNotification = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient(); // React Query client for cache invalidation

  const getMyNotification = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/notification`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  };

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchNotification"],
    queryFn: getMyNotification,
    staleTime: 0, // Ensure every query is fresh
    cacheTime: 0, // Ensure cache is immediately cleared
    refetchOnMount: true,
  });

  // Function to manually invalidate cache
  const forceRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["fetchNotification"] });
  };

  return { notifications, isLoading, isError, error, refetch, forceRefetch };
};

export const useClearNotification = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const clearNotification = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/notification`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("❌ Failed to clear notifications");
    }

    try {
      return await response.json(); // Return response JSON if available
    } catch {
      return null; // Return null if response is empty
    }
  };

  const {
    mutateAsync: deleteNotification,
    isLoading,
    isError,
  } = useMutation(clearNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchNotification"] });
    },
  });

  return { deleteNotification, isLoading, isError };
};

export const useUpdateNotification = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const updateNotification = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/notification`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("❌ Failed to clear notifications");
    }
  };
  const {
    mutateAsync: markNotificationsAsRead,
    isLoading,
    isError,
  } = useMutation(updateNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchNotification"] });
    },
  });
  return { markNotificationsAsRead, isLoading, isError };
};
