import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getListingsAction } from "@/app/actions/listing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import PaginationControls from "@/components/PaginationControls";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;

  const page =
    typeof resolvedParams.page === "string"
      ? parseInt(resolvedParams.page, 10)
      : 1;
  const limit =
    typeof resolvedParams.limit === "string"
      ? parseInt(resolvedParams.limit, 10)
      : 10;

  // Fetch properties using the modular server action!
  const validPage = isNaN(page) ? 1 : page;
  const validLimit = isNaN(limit) ? 10 : limit;
  const { listings, meta } = await getListingsAction(validPage, validLimit);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">
            {session
              ? `Logged in as ${session.user.name} ${session.user.isAdmin ? "(Admin)" : ""}`
              : "Browsing as Guest"}
          </p>
        </div>
        <div className="flex gap-4">
          {!session ? (
            <Link href="/login" passHref>
              <Button>Login</Button>
            </Link>
          ) : (
            <SignOutButton />
          )}
        </div>
      </div>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="flex flex-col">
              <div
                className="h-48 w-full bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: `url(${listing.images.split(",")[0]})`,
                }}
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {listing.propertyType}
                  </span>
                  <span className="font-bold text-lg">
                    ${listing.price.toLocaleString()}
                  </span>
                </div>
                <CardTitle className="mt-2 text-xl">{listing.title}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {listing.address}, {listing.suburb}, {listing.city}
                </p>
              </CardHeader>
              <CardContent className="grow">
                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <span>🛏️ {listing.beds} Beds</span>
                  <span>🛁 {listing.baths} Baths</span>
                </div>
                <p className="text-sm line-clamp-3">{listing.description}</p>

                {/* Admin Only Data */}
                {session?.user.isAdmin && (
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                      Admin Metadata
                    </p>
                    <p className="text-sm">
                      <strong>Internal Notes:</strong> {listing.internalNotes}
                    </p>
                    <p className="text-sm">
                      <strong>Owner Contact:</strong> {listing.ownerContact}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <PaginationControls meta={meta} limit={validLimit} />
    </div>
  );
}
