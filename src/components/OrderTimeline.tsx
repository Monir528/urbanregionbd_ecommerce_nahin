import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface OrderTimelineProps {
  status: string;
  onChangeStatus: (nextStatus: string) => void;
}

const steps = [
  { key: "pending", label: "Pending" },
  { key: "received", label: "Received" },
  { key: "cancel", label: "Cancel" },
  { key: "placed", label: "Placed" },
  { key: "delivered", label: "Delivered" },
  { key: "returned", label: "Returned" },
];

function getNextActions(current: string) {
  switch (current) {
    case "pending":
      return ["received", "cancel"];
    case "received":
      return ["placed"];
    case "placed":
      return ["delivered"];
    case "delivered":
      return ["returned"];
    default:
      return [];
  }
}

function getStepVisuals(stepKey: string, isActive: boolean, isCompleted: boolean) {
  // Negative steps: cancel, returned
  const isNegative = stepKey === "cancel" || stepKey === "returned";
  const color = isNegative
    ? isActive || isCompleted
      ? "border-red-400 bg-red-100"
      : "border-red-200 bg-white"
    : isActive
    ? "border-green-400 bg-green-100"
    : isCompleted
    ? "border-green-200 bg-green-50"
    : "border-gray-300 bg-white";
  const icon = isNegative
    ? <FaTimesCircle className={`text-xl ${isActive || isCompleted ? "text-red-500" : "text-red-300"}`} />
    : (isCompleted || isActive)
    ? <FaCheckCircle className="text-green-500 text-xl" />
    : <span className="text-gray-400 text-xl">•</span>;
  return { color, icon };
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ status, onChangeStatus }) => {
  // Find the current step index
  const currentIndex = steps.findIndex((s) => s.key === status);
  const nextActions = getNextActions(status);

  return (
    <div className="flex items-center justify-between my-8 relative">
      {steps.map((step, idx) => {
        // Only show Cancel as a step if it's the current status
        if (step.key === "cancel" && status !== "cancel") return null;
        // Only show Returned as a step if it's the current status or after delivered
        if (step.key === "returned" && currentIndex < steps.findIndex(s => s.key === "delivered")) return null;
        const isActive = status === step.key || (step.key === "cancel" && status === "cancel");
        const isCompleted = idx < currentIndex && status !== "cancel";
        const { color, icon } = getStepVisuals(step.key, isActive, isCompleted);
        // Draw connector line except for last visible step
        const showLine = idx < steps.length - 1 && (steps[idx + 1].key !== "cancel" || status === "cancel") && (steps[idx + 1].key !== "returned" || currentIndex >= steps.findIndex(s => s.key === "delivered"));
        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center flex-1 relative">
              <div className={`rounded-full border-4 w-10 h-10 flex items-center justify-center mb-2 ${color}`}>{icon}</div>
              <span className={`text-xs font-semibold ${step.key === "cancel" || step.key === "returned" ? (isActive ? "text-red-600" : "text-red-400") : isActive ? "text-green-600" : "text-gray-500"}`}>{step.label}</span>
              {/* Show action buttons for the current step */}
              {idx === currentIndex && nextActions.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {nextActions.map((next) => (
                    <button
                      key={next}
                      onClick={() => onChangeStatus(next)}
                      className={`px-3 py-1 rounded text-xs transition ${next === "cancel" || next === "returned" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                      {steps.find((s) => s.key === next)?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Connector Line */}
            {showLine && (
              <div className="absolute top-5 left-full w-full h-1 flex items-center -z-10">
                <div className={`h-1 w-full ${step.key === "cancel" || step.key === "returned" ? "bg-red-200" : "bg-green-200"}`}></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
