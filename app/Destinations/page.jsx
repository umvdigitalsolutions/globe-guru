import DestinationsView from "../components/DestinationsView";
import { getPublicContent } from "../lib/content";

export default async function DestinationsPage() {
  return <DestinationsView destinations={await getPublicContent("destinations")} />;
}
