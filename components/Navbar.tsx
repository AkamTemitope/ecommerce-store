import Link from "next/link";

import MainNav from "@/components/MainNav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/NavbarActions";
import getCategories from "@/actions/getCategories";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="flex items-center h-16 gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="relative flex px-2 py-1 ml-4 lg:ml-0 gap-x-2"
          >
            <div className="absolute top-0 right-0 w-[40%] h-[90%] border-2 border-l-0 border-b-0  border-black" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[90%] border-2 border-r-0 border-t-0  border-black" />
            <p className="text-xl font-bold">LeSTORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
