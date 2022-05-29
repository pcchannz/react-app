import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem/ProductItem";
import { Card } from "reactstrap";
import styles from "./Products.module.css";
import { OrderType } from "../Common/DataTypes";
import { ProductItemForm } from "./ProductItem/ProductItemForm";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const populateProductsData = async () => {
      const response = await fetch("product");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    };

    populateProductsData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    return () => {};
  }, []);

  
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-sm">
              <Card className={styles.card}>
                <ProductItem key={product.id} product={product} />
                <ProductItemForm order={{Product: product, Quantity: 1}} action={OrderType.ADD} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>);
};

export default Products;
