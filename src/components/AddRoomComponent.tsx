import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const AddRoomComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 p-5 flex justify-between">
      <div className="flex items-center gap-x-2 max-md:hidden">
        <div className="bg-white border p-3 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold">Want to add your own rooms</h1>
          <h2>only owner and careTaker of the pg can add rooms</h2>
        </div>
      </div>
      <div className="max-md:m-auto items-center flex">
        <Button onClick={() => navigate("/add-room")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-house md:hidden"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Add Room
        </Button>
      </div>
    </div>
  );
};

export default AddRoomComponent;
