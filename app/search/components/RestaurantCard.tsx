import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link";
import Price from "../../components/Price";
import { calculateReviewRatingAverage } from "../../../utils/helper";

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const { name, main_image, slug, price, cuisine, location, reviews } =
    restaurant;

  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(reviews);

    if (rating > 4) return "Awesome";

    if (rating <= 4 && rating > 3) return "Good";

    if (rating <= 3 && rating > 2) return "Average";

    return "";
  };

  return (
    <div className="border-b flex pb-5 ml-4">
      <img src={main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4 capitalize">{cuisine.name}</p>
            <p className="mr-4 capitalize">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
}
