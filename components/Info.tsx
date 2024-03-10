"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import IconButton from "./ui/iconButton";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="hidden text-3xl font-bold text-gray-900 lg:block">
        {data.name}
      </h1>
      <div className="flex items-end justify-between mt-3">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="w-6 h-6 border border-gray-600 rounded-full"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="flex items-center mt-10 gap-x-3">
        {cart.quantity(data.id) === 0 ? (
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <IconButton
              className="border-none shadow-none disabled:opacity-10"
              onClick={() => cart.decreaseByOne(data.id)}
              icon={<Minus size={30} />}
            />
            <p className="w-5 text-2xl font-semibold text-black">
              {cart.quantity(data.id)}
            </p>
            <IconButton
              className="border-none shadow-none"
              onClick={() => cart.increaseByOne(data.id)}
              icon={<Plus size={30} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
