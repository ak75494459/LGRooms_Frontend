import { useGetPublicRooms } from "@/api/PublicRoomApi";
import PaginationSelector from "@/components/PaginationSelector";
import PublicRoomCard from "@/components/PublicRoomCard";
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type PublicRoomPageState = {
  page: number;
};

const PublicRoomPage = () => {
  const [pageState, setPageState] = useState<PublicRoomPageState>({
    page: 1,
  });

  const { results, isLoading } = useGetPublicRooms(pageState);

  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: searchForm) => {
    navigate({ pathname: `/search/${searchFormValues.searchQuery}` });
  };

  const setPage = (page: number) => {
    setPageState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <>
      <SearchBar
        onSubmit={handleSearchSubmit}
        placeHolder="Search by location"
      />
      <PublicRoomCard publicRooms={results?.data ?? []} isLoading={isLoading} />
      <PaginationSelector
        page={results?.pagination?.page ?? 1}  // ✅ Safe access with default value
        pages={results?.pagination?.pages ?? 1} // ✅ Safe access with default value
        onPageChange={setPage}
      />
    </>
  );
};

export default PublicRoomPage;
