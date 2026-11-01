import { AbsoluteFill } from "remotion";
import { AvatarSlot } from "./components/AvatarSlot";
import { TopCaptions } from "./components/TopCaptions";
import { TwoMinuteRule } from "./components/TwoMinuteRule";

export const Story: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0D10" }}>
      <GridBackdrop />
      <TwoMinuteRule />
      <TopCaptions />
      <AvatarSlot />
    </AbsoluteFill>
  );
};

const GridBackdrop: React.FC = () => {
  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#1C2230" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#dots)" />
    </svg>
  );
};
