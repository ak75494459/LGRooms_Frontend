
import { useCreateMyRoom } from "@/api/MyRoomApi";
import ManageRoomForm from "@/forms/manage-room-form/ManageRoomForm";

const ManageRoomPage = () => {
    const {createRoom , isLoading} = useCreateMyRoom()
  return(
    <ManageRoomForm onSave={createRoom} isLoading={isLoading} />
  )
}

export default ManageRoomPage;