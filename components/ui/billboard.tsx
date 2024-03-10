import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="relative max-w-xs p-8 text-3xl font-bold text-white sm:text-5xl lg:text-6xl sm:max-w-xl">
            <div className="absolute top-0 right-4 md:right-0 w-[40%] h-[90%] border-4 border-l-0 border-b-0  border-white" />
            <div className="absolute bottom-0 left-4 md:left-0 w-[40%] h-[90%] border-4 border-r-0 border-t-0  border-white" />
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
