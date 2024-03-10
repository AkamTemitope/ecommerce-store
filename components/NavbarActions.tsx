"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import useCart from "@/hooks/useCart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();
  const totalItems = cart.items.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-auto z-50 flex items-center bottom-4 md:bottom-auto right-4 md:top-4 md:right-6 gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center px-4 py-2 bg-black rounded-full"
      >
        <ShoppingBag size={20} color="white" />
        <span className="w-4 ml-2 text-sm font-medium text-white">
          {totalItems}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
