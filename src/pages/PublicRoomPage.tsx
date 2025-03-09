import { useGetPublicRooms } from "@/api/PublicRoomApi";
import PaginationSelector from "@/components/PaginationSelector";
import PublicRoomCard from "@/components/PublicRoomCard";
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import shift from "../assets/shift.png";
import clean from "../assets/clean.png";

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
          {results?.pagination?.page === 1 && (
            <div
              className="h-[25rem] w-full border flex items-center justify-between  max-md:justify-center p-4 
                     rounded-[1rem] relative "
              style={{
                animation: "bgChange 6s ease-in-out infinite alternate",
              }}
            >
              <div className="w-[5rem] backdrop-blur-sm rounded-[20rem] bg-white/10 h-[20%] absolute top-0 left-0 m-2"></div>
              <div className="w-[5rem] backdrop-blur-sm rounded-[20rem] bg-white/10 h-[20%] absolute bottom-0 left-0 m-2"></div>
              <div className="w-[5rem] backdrop-blur-sm rounded-[20rem] bg-white/10 h-[20%] absolute top-0 right-0 m-2"></div>
              <div className="w-[5rem] backdrop-blur-sm rounded-[20rem] bg-white/10 h-[20%] absolute bottom-0 right-0 m-2"></div>
              <div className="hidden md:block ml-1">
                <img
                  src={shift}
                  alt="Shifting Help"
                  className="mx-auto animate-bounce"
                />
                <h1 className="text-black text-xl font-extrabold animate-textMove">
                  We help in shifting
                </h1>
              </div>

              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="path_to_thumbnail.jpg"
                className="max-w-[20rem] w-full rounded-lg transition-all duration-300 z-50"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="max-md:hidden mr-1    ">
                <img src={clean} alt="" className="m-auto animate-bounce" />
                <h1
                  className="font-bold color-black text-xl font-extrabold "
                  style={{
                    animation: "textMove 4s infinite alternate",
                  }}
                >
                  Clean Enviornment
                </h1>
              </div>
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
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white bg-opacity-100 z-50 bg-black">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <div className="font-bold text-[13px] text-purple-700 p-2">
            LawGateRooms
          </div>
        </div>
      )}

      {/* Background Animation Keyframes */}
      <style>
        {`
   @keyframes bgChange {

  0% { background-image: linear-gradient(to right, #ff9966, #ff5e62); } /* Vibrant */

  100% { background-image: linear-gradient(to right, #ff5e62, #ff9966); } /* Soft */
}

  `}
      </style>
    </>
  );
};

export default PublicRoomPage;
