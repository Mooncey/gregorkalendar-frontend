import { MemberAvailability } from "../../../types/types"
import { AvailabilityGrid } from "./AvailabilityGrid";

export default function AvailabilityTab(avilability: MemberAvailability) {

  console.log(JSON.stringify(avilability))
  return (
    <AvailabilityGrid memberAvailability={avilability} />
  );
}

