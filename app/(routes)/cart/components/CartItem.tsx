import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import IconButton from "@/components/ui/iconButton";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { Item } from "@/types";
import Link from "next/link";

interface CartItemProps {
  data: Item;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };

  return (
    <li className="flex p-2 border rounded-md md:p-4">
      <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.images[0].url}
          alt=""
          className="object-contain object-center"
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="absolute top-0 right-0 z-10">
          <button onClick={onRemove}>
            <X size={25} className="text-red-500" />
          </button>
        </div>
        <Link
          href={`/product/${data.product.id}`}
          className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
        >
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black ">
              {data.product.name}
            </p>
          </div>

          <div className="flex mt-1 text-sm">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
              {data.product.size.name}
            </p>
          </div>
          <Currency value={data.product.price} />
        </Link>
        <div className="flex items-center justify-end gap-3">
          <IconButton
            className="border-none shadow-none disabled:opacity-10"
            onClick={() => cart.decreaseByOne(data.product.id)}
            disabled={cart.quantity(data.product.id) === 1}
            icon={<Minus size={25} />}
          />
          <p className="w-5 text-lg font-semibold text-black">
            {data.quantity}
          </p>
          <IconButton
            className="border-none shadow-none"
            onClick={() => cart.increaseByOne(data.product.id)}
            icon={<Plus size={25} />}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
