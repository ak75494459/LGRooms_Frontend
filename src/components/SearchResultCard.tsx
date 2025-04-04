import { PublicRoom } from "@/types";
import { Link } from "react-router-dom";
import AspectRatioPublicImage from "./AspectRatioPublicImage";

type Props = {
  publicRooms: PublicRoom[];
};

const SearchResultCard = ({ publicRooms }: Props) => {
  return (
    <div className="flex flex-wrap">
      {publicRooms.map((room, index) => (
        <div
          key={index}
          className="p-3 w-[49%] max-md:w-full flex shadow m-[3px] mt-[10px]"
        >
          <div className="bg-gray-50 w-full">
            <div>
              <AspectRatioPublicImage imageUrl={room.imageUrl} />
            </div>
            <Link to={`/publicroom/${room._id}`}>
              <div className="p-3 space-y-3">
                <div className="w-full h-full bg-white rounded p-5 space-y-2 text-cover">
                  <h1 className="font-bold bg-gray-50 p-2 rounded">
                    Rent:{" "}
                    <span className="text-slate-500">
                      {room.rent} <span className="text-[50%]">/month</span>
                    </span>
                  </h1>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded max-sm:hidden w-full">
                <div className="p-2  font-bold text-slate-500">
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
  );
};

export default SearchResultCard;
