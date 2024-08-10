import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [product, setProduct] = useState<string[]>([]);
  useEffect(() => {
    console.log("fetching Products in ", category);
    setProduct(["clothing", "HouseHold"]);
  }, [category]);
  return <></>;
};

export default ProductList;
