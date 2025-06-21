import { useGetPublicRooms } from "@/api/PublicRoomApi";
import PaginationSelector from "@/components/PaginationSelector";
import PublicRoomCard from "@/components/PublicRoomCard";
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import shift from "../assets/shift.png";
import clean from "../assets/clean.png";

export type PublicRoomPageState = {
  page: number;
};

const HeroSection = () => {
  return (
    <div className="hero-section max-md:justify-center">
      {/* Floating Blur Elements */}
      {[
        "top-0 left-0",
        "bottom-0 left-0",
        "top-0 right-0",
        "bottom-0 right-0",
      ].map((pos, index) => (
        <div key={index} className={`floating-blur ${pos} m-2`} />
      ))}

      {/* Left Section */}
      <div className="hidden md:block ml-1">
        <img
          src={shift}
          alt="Shifting Help"
          className="mx-auto animate-bounce"
        />
        <h1 className="text-white text-xl font-extrabold animate-textMove">
          We help in shifting
        </h1>
      </div>

      {/* Video Section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="video-container"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Right Section */}
      <div className="hidden md:block mr-1">
        <img
          src={clean}
          alt="Clean Environment"
          className="m-auto animate-bounce"
        />
        <h1 className="font-bold text-white text-xl font-extrabold animate-textMove">
          Clean Environment
        </h1>
      </div>
    </div>
  );
};

const PublicRoomPage = () => {
  const [pageState, setPageState] = useState<PublicRoomPageState>({ page: 1 });
  const { results, isLoading } = useGetPublicRooms(pageState);
  const navigate = useNavigate();

  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + Math.random() * 10, 90));
      }, 300);

      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [isLoading]);

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
          {results?.pagination?.page === 1 && <HeroSection />}

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
        <div className="loading-screen">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">
            LawGateRooms
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar bg-gradient-to-r from-pink-500 to-violet-500"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicRoomPage;
