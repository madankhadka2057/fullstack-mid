const bcrypt = require("bcryptjs");
const prisma = require("../app/lib/db.tsx").default;

async function main() {
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  const [adminUser, agent1, agent2, guestUser] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Admin Manager",
        email: "admin@broker.com",
        password: hashedPassword,
        isAdmin: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Broker",
        email: "sarah@broker.com",
        password: hashedPassword,
        phone: "+1 234 567 8900",
        isAdmin: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "John Realtor",
        email: "john@broker.com",
        password: hashedPassword,
        phone: "+1 234 567 8901",
        isAdmin: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "Guest User",
        email: "guest@broker.com",
        password: hashedPassword,
        isAdmin: false,
      },
    }),
  ]);

  const listingsData = [
    {
      title: "Modern Family Home with Garden",
      description:
        "A spacious 4-bedroom home located in the heart of Northside. Perfect for families looking for a quiet lifestyle with all modern amenities.",
      price: 850000,
      beds: 4,
      baths: 2,
      suburb: "Northside",
      city: "Metropolis",
      address: "123 Pinecrest Ave",
      propertyType: "HOUSE",
      images:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994,https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      status: "AVAILABLE",
      internalNotes: "Seller motivated. Needs inspection of the roof.",
      ownerContact: "Mrs. Gable (+1 999 000 111)",
      userId: agent1.id,
    },
    {
      title: "Luxury Downtown Apartment",
      description:
        "Stunning city views from this top-floor 2-bedroom apartment. Modern finishes and full building amenities inclusive.",
      price: 1200000,
      beds: 2,
      baths: 2,
      suburb: "Central Heights",
      city: "Metropolis",
      address: "77 Skyview Blvd, #34B",
      propertyType: "APARTMENT",
      images:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267,https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      status: "AVAILABLE",
      internalNotes:
        "Vacant for 3 months. Owner willing to negotiate on closing costs.",
      ownerContact: "Apex Investments",
      userId: agent2.id,
    },
    {
      title: "Cozy Townhouse near Park",
      description:
        "Quaint townhouse perfect for a small family or couple. Close to Northside Park and local schools.",
      price: 550000,
      beds: 3,
      baths: 1,
      suburb: "Northside",
      city: "Metropolis",
      address: "45 Clover Row",
      propertyType: "TOWNHOUSE",
      images:
        "https://images.unsplash.com/photo-1571055107559-3e67626fa8be,https://images.unsplash.com/photo-1448630305421-919af466b1c1",
      status: "AVAILABLE",
      internalNotes: "Fixed lease until Dec 2026.",
      ownerContact: "Mr. Henderson (+44 20 7946 0958)",
      userId: agent1.id,
    },
  ];

  for (const listing of listingsData) {
    await prisma.listing.create({ data: listing });
  }

  console.log("Seed completed perfectly!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
