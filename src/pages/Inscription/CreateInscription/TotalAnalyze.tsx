export default function AnalyzeBadge() {
  return (
    <div className="flex-col md:flex-row w-[100%] flex bg-gra">
      <div className="flex flex-col md:flex-row w-[100%] justify-center items-center  ">
        <img
          className="w-[80px] bg-gray-700 h-auto p-2 inline float-left rounded-full text-indigo-500"
          src="/images/inscription/hero1.png"
        />
        <div className="flex-1w-[90%] pl-5 pr-5 md:h-auto md:flex-grow">
          <div className=" w-[100%] flex justify-between">
            <p className="">Loli</p>
            <p className="">
              <button className="p-2 bg-gray-500 rounded-full hover:bg-gray-400 hover:outline-none">
                <svg
                  className="w-4 h-4 text-gray-100 stroke-current"
                  fill="none"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L9.4 8.2H3.5L8.5 12.8L6.7 18.5L12 14.8L17.3 18.5L15.5 12.8L20.5 8.2H14.6L12 2Z"></path>
                </svg>
              </button>
              currency details
            </p>
          </div>
          <div className="mt-2 mb-2 h-1 w-full bg-gray-500 rounded-full">
            <div className="h-full bg-white rounded-full w-[25%]"></div>
          </div>
          <div className=" w-[100%] flex justify-between">
            <p className="">Cast: 7, 876.543</p>
            <p className="">Total win volume: 7, 876.543</p>
          </div>
        </div>
        <div className=" flex md:flex-row justify-center items-center ">
          <button
            className="overflow-auto border-2 border-gray-500 rounded-2xl m-2 cursor-pointer md:flex-grow p-3"
            onClick={() => {}}
          >
            outwell
          </button>
          <button
            className="overflow-auto border-none bg-gradient-to-r from-blue-500 to-pink-400 rounded-2xl border-2 m-2 cursor-pointer  md:flex-grow p-3"
            onClick={() => {}}
          >
            inscription
          </button>
        </div>
      </div>
    </div>
  );
}
