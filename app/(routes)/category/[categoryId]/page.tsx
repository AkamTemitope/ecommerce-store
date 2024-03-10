import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import ProductCard from "@/components/ui/productCard";
import NoResults from "@/components/ui/noResults";

import getProducts from "@/actions/getProducts";
import getCategory from "@/actions/getCategory";
import getSizes from "@/actions/getSizes";
import getColors from "@/actions/getColors";

import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";
import { Size } from "@/types";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  });

  const productsByCategory = await getProducts({
    categoryId: params.categoryId
  });

  const sizesByCategory = productsByCategory.map((product) => product.size);
  const sizes = sizesByCategory.filter(
    (size, index) =>
      index === sizesByCategory.findIndex((item) => item.id === size.id)
  );

  const colorsByCategory = productsByCategory.map((product) => product.color);
  const colors = colorsByCategory.filter(
    (color, index) =>
      index === colorsByCategory.findIndex((item) => item.id === color.id)
  );

  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
