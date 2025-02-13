import { Room } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  rooms: Room[];
  isLoading: boolean;
};

const RoomDetails = ({ rooms, isLoading }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(rooms)) {
    return <div>No rooms available</div>;
  }
  return (
    <>
      {rooms.map((room, index) => (
        <div
          className="flex flex-col bg-gray-50 m-4 shadow shadow-xl"
          key={room._id}
        >
          <div className="font-bold p-3 bg-[#F5D790]">{index + 1}</div>
          <div className="text-lg p-2">
            <span className="font-bold text-xl">owner:</span>
            {" " + room.user.email}
          </div>
          <div className="p-2">
            <span className="font-bold">Pg Name: </span>
            {" " + room.pgName}
          </div>
          <div className="p-1">
            <div className="font-bold p-2">Image Url</div>
            <div className="p-4 bg-white text-blue-600 break-words whitespace-normal">
              {room.imageUrl.map((imageUrl, index) => (
                <div>
                  <span className="text-black mr-2">{index + 1}.</span>
                  <Link to={imageUrl} target="_blank">
                    {" "}
                    {imageUrl}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2">
            <span className="font-bold">Rent: </span>
            {" " + room.rent}
          </div>
          <div className="p-2">
            <span className="font-bold">Location: </span>
            {" " + room.location}
          </div>
          <div className="p-2">
            <span className="font-bold">Contact Number: </span>
            {" " + room.contactNumber}
          </div>
          <div className="p-2">
            <span className="font-bold">Description: </span>
            {" " + room.description}
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomDetails;
