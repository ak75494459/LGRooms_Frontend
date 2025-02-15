import { PublicRoom } from "@/types";
import PublicRoomChatButton from "./PublicRoomChatButton";
import AspectRatioPublicImage from "./AspectRatioPublicImage";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type Props = {
  publicRoom: PublicRoom;
};

const PublicRoomContainer = ({ publicRoom }: Props) => {
  const shareUrl = window.location.href;

  return (
    <>
      <div className="flex max-md:block w-full shadow shadow-lg ">
        <div className="w-[60%] max-md:w-full">
          <AspectRatioPublicImage imageUrl={publicRoom.imageUrl} />
        </div>

        <div className="bg-white w-[40%] max-md:w-full flex flex-col ">
          <div className="flex flex-col">
            <div className="font-bold text-[1.5rem] m-2 border flex items-center p-2 ">
              Rent-
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-indian-rupee"
              >
                <path d="M6 3h12" />
                <path d="M6 8h12" />
                <path d="m6 13 8.5 8" />
                <path d="M6 13h3" />
                <path d="M9 13c6.667 0 6.667-10 0-10" />
              </svg>
              {publicRoom.rent}/month
            </div>
            <div className="flex border m-2 h-[10rem] justify-center items-center">
              <PublicRoomChatButton />
            </div>
          </div>
        </div>
      </div>

      <div className="m-3 text-[1rem] p-3  font-bold">
        {publicRoom.description}
      </div>
      <div className="m-3 text-[1rem] p-3  font-bold">
        {publicRoom.location}
      </div>
      <div className=" justify-end flex m-5">
        <div className="flex gap-3">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
};

export default PublicRoomContainer;
