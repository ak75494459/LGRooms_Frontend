import { useGetPublicRooms } from "@/api/PublicRoomApi";
import PublicRoomCard from "@/components/PublicRoomCard";

const PublicRoomPage = () => {
  const { publicRooms, isLoading } = useGetPublicRooms();

  return <PublicRoomCard publicRooms={publicRooms} isLoading={isLoading} />;
};

export default PublicRoomPage;
