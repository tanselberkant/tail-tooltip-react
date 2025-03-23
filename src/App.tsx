import Tooltip from "./components/Tooltip";

const App = () => {
  const positions = [
    { position: "top-left", label: "Top Left" },
    { position: "top-center", label: "Top Center" },
    { position: "top-right", label: "Top Right" },
    { position: "right", label: "Right" },
    { position: "bottom-right", label: "Bottom Right" },
    { position: "bottom-center", label: "Bottom Center" },
    { position: "bottom-left", label: "Bottom Left" },
    { position: "left", label: "Left" },
  ] as const;

  return (
    <div className=" space-y-10 pt-10 pb-20 text-black">
      <h1 className="mb-3 text-2xl font-bold text-center ">
        React Basit Tooltip
      </h1>

      <div className="flex justify-center flex-row gap-20 mt-8 w-full ">
        <div>
          <h2 className="mb-6 text-xl font-semibold">Dark Variant</h2>
          <div className="grid grid-cols-2 gap-8">
            {positions.map(({ position, label }) => (
              <div key={position} className="flex justify-center">
                <Tooltip
                  content="This is tooltip content..."
                  position={position}
                  color="dark"
                >
                  <div className="col-span-1 mx-auto w-[120px] cursor-pointer rounded-md border  py-1.5 text-center text-sm text-black border-black">
                    {label}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h2 className="mb-6 text-xl font-semibold">White Variant</h2>
          <div className="grid grid-cols-2 gap-8">
            {positions.map(({ position, label }) => (
              <div key={position} className="flex justify-center">
                <Tooltip
                  content="This is tooltip content..."
                  position={position}
                  color="white"
                >
                  <div className="col-span-1 mx-auto w-[120px] cursor-pointer rounded-md border bg-black py-1.5 text-center text-sm text-white">
                    {label}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-row gap-20 mt-8 w-full ">
        <div className="mt-8">
          <h2 className="mb-6 text-xl font-semibold">Custom Width</h2>
          <div className="flex justify-center">
            <Tooltip content="Tooltip content" width={200} position="top-left">
              <div className="col-span-1 mx-auto w-[120px] cursor-pointer rounded-md border bg-black py-1.5 text-center text-sm text-white">
                Long tooltip
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
