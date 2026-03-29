import { redirect } from "next/navigation";

export default function Home() {
  // Since this is the core listing-search backbone,
  // redirect the user immediately to the listings index.
  redirect("/listings");
}
