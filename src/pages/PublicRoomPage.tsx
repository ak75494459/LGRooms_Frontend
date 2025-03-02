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
  const [pageState, setPageState] = useState<PublicRoomPageState>({ page: 1 });
  const { results, isLoading } = useGetPublicRooms(pageState);
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: searchForm) => {
    navigate({ pathname: `/search/${searchFormValues.searchQuery}` });
  };

  const setPage = (page: number) => {
    setPageState((prevState) => ({ ...prevState, page }));
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className="flex flex-row">
            <div
              className="absolute w-[20rem] z-50 top-[6rem] font-bold"
              style={{
                animation: "cartMove 20s linear infinite",
                whiteSpace: "nowrap", // Prevents text from breaking lines
              }}
            >
              We will help in shifting
            </div>
          </div>
          {results?.pagination?.page === 1 && (
            <div
              className="h-[25rem] w-full border flex items-center justify-center p-4 
                       animate-[bgChange_6s_infinite_alternate] rounded-[1rem] relative"
              style={{ animation: "bgChange 4s infinite alternate" }}
            >
              {/* Floating Image */}

              {/* Centered Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="max-w-[20rem] w-full rounded-lg transition-all duration-300 z-50"
                style={{
                  animation: "videoMove 4s ease-out 1 forwards",
                }}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Search Bar */}
          <SearchBar
            onSubmit={handleSearchSubmit}
            placeHolder="Search by location"
            page={results?.pagination?.page ?? 1}
          />

          {/* Public Rooms List */}
          <div className={results?.pagination?.page !== 1 ? "mt-[8rem]" : ""}>
            <PublicRoomCard
              publicRooms={results?.data ?? []}
              isLoading={isLoading}
            />
          </div>

          {/* Pagination */}
          <PaginationSelector
            page={results?.pagination?.page ?? 1}
            pages={results?.pagination?.pages ?? 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}

      {/* Background Animation Keyframes */}
      <style>
        {`
   @keyframes bgChange {

  0% { background-image: linear-gradient(to right, #ff9966, #ff5e62); } /* Vibrant */

  100% { background-image: linear-gradient(to right, #e0c3fc, #8ec5fc); } /* Soft */
}


    @keyframes videoMove {
      0% { transform: scale(1); }
      50% { transform: scale(1.5); }
      100% { transform: scale(1); }
    }
   @keyframes cartMove {
  0% { transform: translateX(-100%); } /* Start off-screen */
  100% { transform: translateX(98vw); } /* Move fully to the right */
}
  `}
      </style>
    </>
  );
};

export default PublicRoomPage;
