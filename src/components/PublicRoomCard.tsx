import { PublicRoom } from "@/types";
import AspectRatioPublicImage from "./AspectRatioPublicImage";
import { Link } from "react-router-dom";

type Props = {
  publicRooms: PublicRoom[];
  isLoading: boolean;
};

const PublicRoomCard = ({ publicRooms, isLoading }: Props) => {
  if (isLoading) {
    return <div className="m-auto">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center  relative  rounded bottom-[8rem]">
        {publicRooms.map((room, index) => (
          <div
            key={index}
            className="p-3 w-[24%] flex changeWidth   max-md:w-full  shadow m-[3px] mt-[10px] rounded  transition-all duration-300  hover:scale-105 z-50 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
          >
            <div className="w-full ">
              <div>
                <AspectRatioPublicImage imageUrl={room.imageUrl} />
              </div>
              <Link to={`/publicroom/${room._id}`}>
                <div className="p-3 space-y-3 ">
                  <div className="w-full h-full bg-white rounded p-5 space-y-2 text-cover">
                    <h1 className="font-bold bg-gray-50 p-2 rounded">
                      Rent:{" "}
                      <span className="text-slate-500">
                        {room.rent} <span className="text-[50%]">/month</span>
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded max-sm:hidden w-full ">
                  <div className="p-2  font-bold text-slate-500 ">
                    Description: {room.description}
                  </div>
                </div>
                <div className="p-2  font-bold text-slate-500">
                  Location: <span className="text-black">{room.location}</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          
          @media (max-width: 1125px) { 
            .changeWidth{
                  width: 48%;
            }
          }
          @media (max-width: 48rem) { 
            .changeWidth{
                  width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default PublicRoomCard;
