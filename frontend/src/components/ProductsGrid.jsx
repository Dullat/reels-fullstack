import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductsGrid = ({ products }) => {
  return (
    <div className="dark:text-white">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2">
        {products.map((product) => (
          <Link to={`/products/${product._id}`}>
            <div
              key={product._id}
              className="w-full aspect-square cursor-pointer relative"
              style={{
                backgroundImage: `url('${product.imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute bottom-0 h-[20%] flex items-center w-full px-3"
                style={{ background: "rgba(0,0,0,.8)" }}
              >
                <p>{product.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

