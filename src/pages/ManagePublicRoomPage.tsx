import { useCreatePublicRoom } from "@/api/PublicRoomApi";
import ManagePublicRoomForm from "@/forms/public-room-form/ManagePublicRoomForm";

const ManagePublicRoomPage = () => {
  const { createPublicRoom, isLoading } = useCreatePublicRoom();
  return (
    <ManagePublicRoomForm onSave={createPublicRoom} isLoading={isLoading} />
  );
};

export default ManagePublicRoomPage;
