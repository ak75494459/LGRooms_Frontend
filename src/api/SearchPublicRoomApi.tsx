import { SearchState } from "@/pages/SearchPage";
import { PublicRoomSearchResponse } from "@/types";
import { useQuery } from "react-query";
import { useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchPublicRoom = (
  searchState?: SearchState,
  location?: string
) => {
  const createSearchRequest = useCallback(async (): Promise<PublicRoomSearchResponse> => {
    if (!location) {
      throw new Error("Location is required for the search");
    }

    const params = new URLSearchParams();

    if (searchState?.searchQuery) {
      params.set("searchQuery", searchState.searchQuery);
    }
    if (searchState?.page !== undefined) {
      params.set("page", searchState.page.toString());
    }
    if (searchState?.sortOption) {
      params.set("sortOption", searchState.sortOption);
    }

    const url = `${API_BASE_URL}/api/public/rooms/search/${location}?${params.toString()}`;
    console.log("🔍 Fetching from API:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to get rooms: ${response.statusText}`);
    }

    return response.json();
  }, [location, searchState]);

  const { data: results, isLoading } = useQuery(
    ["searchPublicRooms", location, searchState?.page, searchState?.searchQuery, searchState?.sortOption], // ✅ Ensure `sortOption` is included
    createSearchRequest,
    {
      enabled: !!location,
      keepPreviousData: false,
      staleTime: 0,
    }
  );

  return {
    results,
    isLoading,
  };
};
