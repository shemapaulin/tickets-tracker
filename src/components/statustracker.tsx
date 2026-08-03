import { Check } from "lucide-react";

const steps = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
];

type Props = {
  status: string;
};

export default function StatusTracker({ status }: Props) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex w-full items-center justify-between">

      {steps.map((step, index) => {
        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >

            {/* Circle */}
            <div className="flex flex-col items-center">

              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full border-2
                  ${
                    completed || active
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-gray-100 text-gray-400"
                  }
                `}
              >
                {completed ? (
                  <Check size={20} />
                ) : (
                  index + 1
                )}
              </div>


              {/* Label */}
              <span
                className={`
                  mt-2 text-sm font-medium
                  ${
                    completed || active
                      ? "text-primary"
                      : "text-gray-400"
                  }
                `}
              >
                {step}
              </span>

            </div>


            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  mx-3 h-1 flex-1
                  ${
                    index < currentIndex
                      ? "bg-primary"
                      : "bg-gray-300"
                  }
                `}
              />
            )}

          </div>
        );
      })}

    </div>
  );
}