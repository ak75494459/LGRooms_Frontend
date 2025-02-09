import { useGetRooms } from "@/api/MyRoomApi";
import RoomDetails from "@/components/RoomDetails";

const RoomDetailsPage = () => {
  const { rooms, isLoading } = useGetRooms();
  return <RoomDetails rooms={rooms} isLoading={isLoading} />;
};

export default RoomDetailsPage;
