import getBillboards from "@/actions/getBillboards";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
import Billboards from "@/components/ui/billboards";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboards();

  return (
    <Container>
      <div className="pb-10 space-y-16">
        <Billboards data={billboards} />
        <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
