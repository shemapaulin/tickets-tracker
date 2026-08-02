import Navbar from "@/components/navbar";
import Fielddemo from "@/components/fielddemo";

const Dashboard = () => {
  return (
    
      <>
      <div className=" h-screen">
        <Navbar />
        
            <h1 className="text-3xl flex justify-center items-center font-bold w-screen pt-10">
          What can we help you with?
        </h1>
        <div className="flex justify-center items-center w-screen pt-10">
          <div className="h-[1px] w-[50%] bg-gray-300"></div>
        </div>
        <div className="flex justify-center items-center  w-screen pt-10">
          <Fielddemo />
        </div>
      </div>
      </>
  )
}

export default Dashboard
