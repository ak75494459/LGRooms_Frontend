import { useGetMyRooms } from "@/api/MyRoomApi";
import AddRoomComponent from "@/components/AddRoomComponent";
import RoomCard from "@/components/RoomCard";
import { Separator } from "@/components/ui/separator";

const ShowRoomsPage = () => {
  const { rooms, isLoading } = useGetMyRooms();
  return (
    <div className="flex flex-col space-y-10">
      <AddRoomComponent />
      <Separator />
      <RoomCard rooms={rooms} isLoading={isLoading} />
    </div>
  );
};

export default ShowRoomsPage;
