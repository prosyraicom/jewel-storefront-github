import CartTable from "@/components/cart/cart-table";
import CheckoutButton from "@/components/cart/checkout-button";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

function CartLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-pulse text-center">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] py-20 px-[15px] md:px-[50px]">
        <Suspense fallback={<CartLoading />}>
          <CartTable />
          <CheckoutButton />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
