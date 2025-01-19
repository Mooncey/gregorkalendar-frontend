import { MemberAvailability } from "../../../types/types"
import { AvailabilityGrid } from "./AvailabilityGrid";

export default function AvailabilityTab(availability: {avilability: MemberAvailability}) {

  return (
    <AvailabilityGrid />
  );
}

