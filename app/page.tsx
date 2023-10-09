import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";

import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap ">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
