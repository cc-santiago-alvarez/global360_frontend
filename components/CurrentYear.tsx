import { cacheLife } from "next/cache";

// Con cacheComponents, new Date() debe ir en un ámbito cacheado; se recalcula como máximo una vez al día.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
