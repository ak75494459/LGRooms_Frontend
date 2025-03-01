import { useGetPublicRooms } from "@/api/PublicRoomApi";
import PaginationSelector from "@/components/PaginationSelector";
import PublicRoomCard from "@/components/PublicRoomCard";
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";

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
      {!isLoading ? (
        <>
          {results.pagination.page === 1 ? (
            <div className="h-[25rem] w-full bg-gradient-to-r from-stone-900 via-gray-500 to-brown-300 border flex items-center  rounded  justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-[20rem] rounded "
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : null}

          <SearchBar
            onSubmit={handleSearchSubmit}
            placeHolder="Search by location"
            page={results.pagination.page}
          />

          {results.pagination.page !== 1 ? (
            <div className="mt-[8rem]">
              <PublicRoomCard
                publicRooms={results?.data ?? []}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <PublicRoomCard
              publicRooms={results?.data ?? []}
              isLoading={isLoading}
            />
          )}
          <PaginationSelector
            page={results?.pagination?.page ?? 1} // ✅ Safe access with default value
            pages={results?.pagination?.pages ?? 1} // ✅ Safe access with default value
            onPageChange={setPage}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PublicRoomPage;
