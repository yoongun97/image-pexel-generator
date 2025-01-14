import WorkListInClient from "@/components/list/ListInClient";
import { worklist } from "@/utils/dummyData";

export default function WorkList() {
  return <WorkListInClient worklist={worklist} />;
}
