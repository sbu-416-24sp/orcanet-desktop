
const MarkerPoints = () => {
  
  return (

        <div className="flex mt-1">
          <div className="w-3/5"></div>
          <div className="flex justify-items-end">
            <span className="text-gray-500 text-base ">Peers: </span>
            <span className="flex ml-3">
                <span className="mt-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-blue-300">
                </span>
                <span className="text-sm">1-10</span>
            </span>

            <span className="flex ml-3">
                <span className="mt-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
                </span>
                <span className="text-sm">10-100</span>
            </span>

            <span className="flex ml-3">
                <span className="mt-1 selection:flex h-4 w-4 items-center justify-center rounded-full bg-blue-700">
                </span>
                <span className="text-sm">100+</span>
            </span>
          </div>                  
        </div>

       
  );
};

export default MarkerPoints;