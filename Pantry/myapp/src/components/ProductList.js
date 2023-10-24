import Product from "./Product";

function ProductList({ products, getAllProducts }) {
  return (
    <>
      <div className="productGrid">
        {/* Render the TodoItem component with todos and getAllTodos function */}
        <Product products={products} getAllProducts={getAllProducts} />
      </div>
    </>
  );
}
export default ProductList;