"use client";
import * as React from "react";
import { Stepper, Step, StepLabel, StepIconProps, Tooltip } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";

const steps = [
  { key: "pending", label: "Pending" },
  { key: "received", label: "Received" },
  { key: "cancel", label: "Cancel" },
  { key: "placed", label: "Placed" },
  { key: "delivered", label: "Delivered" },
  { key: "returned", label: "Returned" },
];

interface OrderStepperProps {
  status: string;
  onChangeStatus: (nextStatus: string) => void;
}

const CustomStepIcon = (props: StepIconProps & { stepKey: string }) => {
  const { active, completed, stepKey } = props;
  if (stepKey === "cancel" || stepKey === "returned") {
    return (
      <Tooltip title={stepKey.charAt(0).toUpperCase() + stepKey.slice(1)} arrow>
        <span>
          <Cancel color={active || completed ? "error" : "disabled"} fontSize="large" />
        </span>
      </Tooltip>
    );
  }
  if (completed || active) {
    return (
      <Tooltip title={stepKey.charAt(0).toUpperCase() + stepKey.slice(1)} arrow>
        <span>
          <CheckCircle color="success" fontSize="large" />
        </span>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={stepKey.charAt(0).toUpperCase() + stepKey.slice(1)} arrow>
      <span style={{ color: "#bdbdbd", fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "2px solid #bdbdbd" }}>•</span>
    </Tooltip>
  );
};

export default function OrderStepper({ status, onChangeStatus }: OrderStepperProps) {
  // Find the current step index
  const currentIndex = steps.findIndex((s) => s.key === status);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Logic for next valid actions
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

  const nextActions = getNextActions(status);

  // Mobile-specific components
  const MobileStatusSelector = () => {
    if (!isMobile) return null;
    return (
      <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-3">Current Status: 
          <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs text-white ${status === "pending" ? "bg-yellow-500" : 
            status === "received" ? "bg-blue-500" : 
            status === "cancel" ? "bg-red-500" : 
            status === "placed" ? "bg-purple-500" : 
            status === "delivered" ? "bg-green-500" : 
            status === "returned" ? "bg-red-400" : "bg-gray-400"
          }`}>
            {typeof status === 'string' ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
          </span>
        </h3>
        
        {nextActions.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Change status to:</p>
            <div className="flex flex-wrap gap-2">
              {nextActions.map((next) => (
                <button
                  key={next}
                  onClick={() => onChangeStatus(next)}
                  className={`px-3 py-1 rounded-md text-xs font-medium text-white ${next === "cancel" || next === "returned" ? "bg-red-500" : "bg-blue-500"}`}
                >
                  {steps.find((s) => s.key === next)?.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <MobileStatusSelector />
      
      <div
        style={{
          width: "100%",
          margin: isMobile ? "16px 0" : "32px 0",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 12,
          maxWidth: "100vw",
          display: isMobile ? "none" : "block"
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={currentIndex}
          sx={{
            minWidth: 350,
            width: "100%",
            '& .MuiStepConnector-line': {
              minHeight: 12,
            },
            '@media (max-width:767px)': {
              display: 'none',
            },
          }}
        >
          {steps.map((step, idx) => {
            if (step.key === "cancel" && status !== "cancel") return null;
            if (step.key === "returned" && currentIndex < steps.findIndex(s => s.key === "delivered")) return null;
            return (
              <Step key={step.key} sx={{ minWidth: 70, flex: 1 }}>
                <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} stepKey={step.key} />}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{step.label}</span>
                </StepLabel>
                {/* Action button: render outside StepLabel for correct alignment */}
                {idx === currentIndex && nextActions.length > 0 && (
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {nextActions.map((next) => (
                      <button
                        key={next}
                        onClick={() => onChangeStatus(next)}
                        style={{
                          marginTop: 4,
                          padding: "4px 12px",
                          borderRadius: 4,
                          background: next === "cancel" || next === "returned" ? "#f44336" : "#1976d2",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: 13,
                          minWidth: 80
                        }}
                        aria-label={`Change status to ${steps.find((s) => s.key === next)?.label}`}
                      >
                        {steps.find((s) => s.key === next)?.label}
                      </button>
                    ))}
                  </div>
                )}
              </Step>
            );
          })}
        </Stepper>
      </div>
    </>
  );
}
