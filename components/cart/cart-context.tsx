"use client";

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/shopify/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product };
    }
  | {
      type: "SET_CART";
      payload: { cart: Cart };
    };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
function loadCartFromStorage(): Cart | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const storedCart = localStorage.getItem("shopify-cart");
    return storedCart ? JSON.parse(storedCart) : undefined;
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return undefined;
  }
}

// Save cart to localStorage
function saveCartToStorage(cart: Cart | undefined) {
  if (typeof window === "undefined" || !cart) return;

  try {
    localStorage.setItem("shopify-cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

// Generate a unique ID if needed
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus"
      ? Number(item.quantity) + 1
      : Number(item.quantity) - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount =
    Number(item.cost.totalAmount.amount) / Number(item.quantity);
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? Number(existingItem.quantity) + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    // Generate an ID if it doesn't exist
    id: existingItem?.id || generateId(),
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "SET_CART": {
      return action.payload.cart;
    }
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = state.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...state,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...state.cost,
            totalAmount: { ...state.cost.totalAmount, amount: "0" },
          },
        };
      }

      return {
        ...state,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    case "ADD_ITEM": {
      const { variant, product } = action.payload;
      const existingItem = state.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      const updatedLines = existingItem
        ? state.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...state.lines, updatedItem];

      return {
        ...state,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartContext.Provider value={useCartState()}>
      {children}
    </CartContext.Provider>
  );
}

function useCartState(): CartContextType {
  // Client-side only state to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // Use regular reducer instead of useOptimistic
  const [cart, dispatch] = useReducer(cartReducer, createEmptyCart());

  // After hydration, set isClient to true and load from localStorage
  useEffect(() => {
    setIsClient(true);

    // Load cart from localStorage after client-side render
    const localCart = loadCartFromStorage();
    if (localCart) {
      dispatch({
        type: "SET_CART",
        payload: { cart: localCart },
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient && cart) {
      saveCartToStorage(cart);
    }
  }, [cart, isClient]);

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { merchandiseId, updateType },
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: { variant, product } });
  };

  return useMemo(
    () => ({
      cart,
      updateCartItem,
      addCartItem,
    }),
    [cart]
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
