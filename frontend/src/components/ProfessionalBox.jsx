const ProfessionalBox = () => {
  return (
    <div className={`flex flex-col gap-2 dark:text-white`}>
      <button className={`text-blue-700 text-sm cursor-pointer`}>
        Professional DashBoard
      </button>
      <div
        className={`flex flex-wrap justify-center gap-2 align-center *:bg-blue-600 *:py-2 *:px-2 *:min-w-[10rem] *:rounded *:text-sm *:cursor-pointer`}
      >
        <button>Upload Reel</button>
        <button>Upload Product</button>
      </div>
    </div>
  );
};

export default ProfessionalBox;
