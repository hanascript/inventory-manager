import { ProductForm } from '@/components/product/product-form';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function ProductFormPage({ params }: { params: { productId: string } }) {
  if (!params.productId) redirect('/products');

  if (params.productId === 'new') {
    return <ProductForm />;
  }

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return <ProductForm initialData={product} />;
}
