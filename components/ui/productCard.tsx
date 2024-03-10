"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, Minus, Plus, ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/iconButton";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div className="flex flex-col justify-between p-3 space-y-2 bg-white border group rounded-xl">
      <div className="relative border border-gray-100 aspect-square rounded-xl">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="object-contain rounded-md aspect-square"
        />
        <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <Link
        href={`/product/${data?.id}`}
        className="py-2 rounded-md hover:bg-gray-50"
      >
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </Link>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
        {cart.quantity(data.id) === 0 ? (
          <IconButton
            onClick={onAddToCart}
            icon={<ShoppingCart size={25} className="text-gray-600" />}
          />
        ) : (
          <div className="flex items-center justify-end gap-3">
            <IconButton
              className="border-transparent shadow-none disabled:opacity-10"
              onClick={() => cart.decreaseByOne(data.id)}
              icon={<Minus size={25} />}
            />
            <p className="w-4 text-lg font-semibold text-black">
              {cart.quantity(data.id)}
            </p>
            <IconButton
              className="border-transparent shadow-none"
              onClick={() => cart.increaseByOne(data.id)}
              icon={<Plus size={25} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
