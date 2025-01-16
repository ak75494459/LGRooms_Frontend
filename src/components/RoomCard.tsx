import { Room } from "@/types";
import { AspectRatioDemo } from "./AspectRatioDemo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDeleteRoom } from "@/api/MyRoomApi";

type Props = {
  rooms: Room[];
  isLoading: boolean;
};

const RoomCard = ({ rooms, isLoading }: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(rooms)) {
    return <div>No rooms available</div>;
  }
  const { deleteRoom } = useDeleteRoom();

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id);
    } catch (err: any) {
      console.error("Failed to delete room:", err.message);
    }
  };

  return (
    <>
      {rooms.map((room, index) => (
        <div key={index} className="p-3 bg-gray-50">
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-[#91999E] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis-vertical cursor-pointer"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button
                    onClick={() => handleDelete(room._id)}
                    className="flex items-center justify-center bg-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:grid grid-cols-2">
            <div>
              <AspectRatioDemo imageUrl={room.imageUrl} />
            </div>
            <div className="p-3 space-y-3">
              <div className="w-full h-full bg-white rounded p-5 space-y-2 text-cover">
                <h1 className="font-bold bg-gray-50 p-2 rounded">
                  Rent:{" "}
                  <span className="text-slate-500">
                    {room.rent} <span className="text-[50%]">/month</span>
                  </span>
                </h1>
                <h1 className="font-bold bg-gray-50 p-2 rounded">
                  PG Name:
                  <span className="text-slate-500"> {room.pgName} </span>
                </h1>
                <div className="font-bold bg-gray-50 p-2 rounded">
                  Mobile Number:{" "}
                  <span className="text-slate-500">{room.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 border rounded max-sm:hidden w-full">
            <div className="p-2 font-bold text-slate-500">
              Description: {room.description}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomCard;
