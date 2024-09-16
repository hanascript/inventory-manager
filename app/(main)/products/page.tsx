import { getProducts } from '@/features/products/actions/get-products';
import { ProductClient } from '@/features/products/components/product-client';

export default async function ProductsPage() {
  const productsQuery = await getProducts();

  const products = productsQuery || [];

  return <ProductClient products={products} />;
}
