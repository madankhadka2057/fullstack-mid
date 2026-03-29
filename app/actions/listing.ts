"use server";

import prisma from "@/app/lib/db";

export type ListingType = {
  id: string;
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  propertyType: string;
  suburb: string;
  city: string;
  address: string;
  images: string;
  status: string;
  internalNotes: string | null;
  ownerContact: string | null;
};

export async function getListingsAction(page: number = 1, limit: number = 10) {
  // We use our custom paginate method here!
  const result = await prisma.listing.paginate(
    {
      orderBy: { createdAt: "desc" },
    },
    { page, limit },
  );

  const { data, meta } = result as any;

  return {
    listings: data as ListingType[],
    meta: {
      total: meta.total as number,
      page: meta.page as number,
      limit: meta.limit as number,
      totalPages: meta.totalPages as number,
      hasNextPage: meta.hasNextPage as boolean,
      hasPrevPage: meta.hasPrevPage as boolean,
    },
  };
}
