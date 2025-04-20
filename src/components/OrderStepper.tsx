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

  return (
    <div
      style={{
        width: "100%",
        margin: "32px 0",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 12,
        maxWidth: "100vw"
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={currentIndex}
        sx={{
          minWidth: 350,
          width: "100%",
          '@media (max-width:600px)': {
            minWidth: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            '.MuiStepLabel-label': {
              fontSize: 13,
            },
            '.MuiStepConnector-root': {
              display: 'none',
            },
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
  );
}
