import React from "react";
import CategoryList from "../components/CategoryList";
import ProductBanner from "../components/ProductBanner";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

export const Home = () => {
  return (
    <div className="">
      <ProductBanner />
      <CategoryList />
      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Top Airpodes"}
        limit={6}
      />
      <VerticalCardProduct
        category={"airpodes"}
        heading={"Top Airpodes"}
        limit={4}
      />
      <HorizontalCardProduct
        category={"camera"}
        heading={"Popular Cameras"}
        limit={6}
      />
      <VerticalCardProduct
        category={"mobile"}
        heading={"Top Mobile"}
        limit={4}
      />
    </div>
  );
};
