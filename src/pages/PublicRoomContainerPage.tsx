import { useGetPublicRoom } from "@/api/PublicRoomApi";
import PublicRoomContainer from "@/components/PublicRoomContainer";

const PublicRoomContainerPage = () => {
  const { publicRoom, isLoading } = useGetPublicRoom();

  if (!publicRoom) {
    return <div>Loading...</div>; 
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PublicRoomContainer publicRoom={publicRoom} />
    </div>
  );
};

export default PublicRoomContainerPage;
