import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAllMessages = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  // Query function
  const fetchAllMessages = async (context: { queryKey: [string, string] }) => {
    const [, chatId] = context.queryKey; // Extract the id from queryKey
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/message/${chatId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to access chat");
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error fetching chats:", error.message);
      throw error;
    }
  };

  // React Query hook
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery(
    ["allMessages", id] as [string, string], // Cast the queryKey to the expected tuple type
    fetchAllMessages,
    {
      enabled: !!id, // Ensure the query only runs if id is provided
    }
  );

  // Handle error
  if (isError) {
    toast.error("Failed to load messages");
  }

  return { messages, isLoading };
};

export const useSendMessage = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Mutation function
  const sendMessage = async ({
    content,
    chatId,
  }: {
    content: string;
    chatId: string;
  }) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, chatId }),
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return response.json();
  };

  // React Query mutation hook
  const { mutateAsync: sendMessages, isLoading } = useMutation(sendMessage, {
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  return { sendMessages, isLoading };
};
