import { useGetPublicRoom } from "@/api/PublicRoomApi";
import PublicRoomCard from "@/components/PublicRoomCard";

const PublicRoomPage = () => {
  const { publicRoom, isLoading } = useGetPublicRoom();

  return <PublicRoomCard publicRoom={publicRoom} isLoading={isLoading} />;
};

export default PublicRoomPage;
