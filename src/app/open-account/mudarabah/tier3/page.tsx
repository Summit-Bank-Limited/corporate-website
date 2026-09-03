
import { redirect } from "next/navigation";

// =========================
// ✅ Direct Redirect (No Page Render)
// =========================

export default function OpenCurrentAccount() {
  redirect("https://external.summitbankng.com/instant-account");
}