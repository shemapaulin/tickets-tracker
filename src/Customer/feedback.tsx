import Statustracker from "@/components/statustracker"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert" 
import {FieldDemo} from "@/components/comment.tsx";//Alert from "@/components/ui/alert"

const feedback = () => {
  type FeedbackStatus =
    | "Submitted"
    | "Under Review"
    | "In Progress"
    | "Resolved";

  const status: FeedbackStatus = "Resolved"; 
  return (
    <div className=" mb-4 w-full">
      <h1 className=" flex justify-center items-center text-2xl font-bold mb-4 pt-10">Feedback</h1>
      <p className=" flex justify-center items-center text-gray-600 mb-4">We value your feedback! Please let us know how we can improve.</p>
      <div className="flex justify-center items-center w-screen pt-10 pb-10">
          <div className="h-[1px] w-[50%] bg-gray-300"></div>
        </div>
        <div className="flex justify-center items-center pt-10 pb-10">
        <Statustracker status={status} />
      </div>

      {status === "Resolved" && (
        <><div className="flex flex-col gap-6 justify-center items-center pt-10 pb-10">
          <Alert className="max-w-xl">
            <AlertTitle>Your feedback has been resolved.</AlertTitle>
            <AlertDescription>
              Thank you for your input! We appreciate your feedback and will
              continue to work on improving our services.
            </AlertDescription>
          </Alert>
          <FieldDemo />
        </div>
        
        </>
      )}
    </div>
  )
}

export default feedback