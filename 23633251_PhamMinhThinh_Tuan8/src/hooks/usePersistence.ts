import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage";
import { loadJSON } from "../storage/storage";
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types";

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [auth, cart, wish] = await Promise.all([
          loadAuth(),
          loadJSON<CartItem[]>(CART_KEY),
          loadJSON<number[]>(WISHLIST_KEY),
        ]);
        if (!active) return;
        if (auth?.user && auth.token) dispatch(setCredentials(auth));
        if (Array.isArray(cart)) dispatch(hydrateCart(cart));
        if (Array.isArray(wish)) dispatch(hydrateWishlist(wish));
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => { active = false; };
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    if (user && token) void saveAuth({ user, token });
    else void clearAuth();
  }, [ready, user, token]);

  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);
  return ready;
}
