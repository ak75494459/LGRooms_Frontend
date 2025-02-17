import { Link } from "react-router-dom";

type Props = {
  total: number;
  location: string;
};

const SearchResultInfo = ({ total, location }: Props) => {
  return (
    <div >
      <span>
        {total} Rooms found in {location}
        <Link
          to="/"
          className="text-sm font-semibold underline cursor-pointer text-blue-500 ml-2"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
