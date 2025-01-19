import { Block, MemberAvailability } from "../../../types/types"
import { AvailabilityGrid } from "./AvailabilityGrid";


export interface AvailabilityParams {
  availableBlocks: Block[],
  preferNotBlocks: Block[],
  handleUpdate: (updateParams: MemberAvailability) => Promise<void>;
}

export default function AvailabilityTab(params: AvailabilityParams) {

  console.log(JSON.stringify(params))
  return (
    <AvailabilityGrid availableBlocks={params.availableBlocks} preferNotBlocks={params.preferNotBlocks} handleUpdate={params.handleUpdate}/>
  );
}

