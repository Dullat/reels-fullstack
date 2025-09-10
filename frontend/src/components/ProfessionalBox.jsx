import { Link } from "react-router-dom";
const ProfessionalBox = () => {
  return (
    <div className={`flex flex-col gap-2 dark:text-white mb-6`}>
      <Link
        to="/dashboard/"
        className={`text-blue-700 text-sm max-w-fit cursor-pointer text-center m-auto`}
      >
        Professional DashBoard
      </Link>
      <div
        className={`flex flex-wrap justify-center gap-2 align-center *:bg-blue-600 *:py-2 *:px-2 *:min-w-[10rem] *:rounded *:text-sm *:text-center *:cursor-pointer`}
      >
        <Link to="/reels/upload">Upload Reel</Link>
        <Link to="/products/upload">Upload Product</Link>
      </div>
    </div>
  );
};

export default ProfessionalBox;
