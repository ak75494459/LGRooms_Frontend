import { useSearchPublicRoom } from "@/api/SearchPublicRoomApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDrowdown from "@/components/SortOptionDrowdown";
import { useState } from "react";

import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  sortOption: string;
};

const SearchPage = () => {
  const { location } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    sortOption: "bestMatch",
  });

  const { results, isLoading } = useSearchPublicRoom(searchState, location);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }

  // ✅ Ensure empty results are handled properly
  if (!location || !results?.data || results.data.length === 0) {
    return <span>No result found</span>;
  }

  return (
    <div>
      <div className="text-xl font-bold flex flex-col gap-3 items-center justify-between lg:items-center md:flex-row mx-5">
        <SearchResultInfo
          total={results?.pagination.total}
          location={location}
        />
        <SortOptionDrowdown
          sortOption={searchState.sortOption}
          onChange={(value) => setSortOption(value)}
        />
      </div>
      <SearchResultCard publicRooms={results.data} />
      <PaginationSelector
        page={results.pagination.page}
        pages={results.pagination.pages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SearchPage;
