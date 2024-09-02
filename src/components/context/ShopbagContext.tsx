"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface MenuItem {
   id: string;
   name: string;
   image: string;
   price: number;
   quantity: number;
}

interface ShopbagContextInterface {
   items: MenuItem[];
   addItem: (item: MenuItem) => void;
   removeItem: (id: string) => void;
   clearBag: () => void;
   totalPrice: number;
   totalItems: number;
}

const ShopbagContext = createContext<ShopbagContextInterface | undefined>(undefined);

const ShopbagProvider = ({ children }: { children: ReactNode }) => {
   const [items, setItems] = useState<MenuItem[]>([]);

   const addItem = (item: MenuItem) => {
      setItems((prevItems) => {
         const existingItem = prevItems.find((i) => i.id === item.id);
         if (existingItem) {
            return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
         } else {
            return [...prevItems, item];
         }
      });
   };

   const removeItem = (id: string) => {
      setItems((prevItems) => {
         const existingItem = prevItems.find((i) => i.id === id);

         if (existingItem) {
            if (existingItem.quantity > 1) {
               // Eğer miktar 1'den fazlaysa sadece miktarı azalt
               return prevItems.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
            } else {
               // Eğer miktar 1 ise ürünü tamamen kaldır
               return prevItems.filter((i) => i.id !== id);
            }
         }

         return prevItems; // Eğer ürün yoksa mevcut durumu döndür
      });
   };

   const clearBag = () => setItems([]);

   const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

   const totalItems = items.reduce((total, item) => total + item.quantity, 0);

   return <ShopbagContext.Provider value={{ items, addItem, removeItem, clearBag, totalPrice, totalItems }}>{children}</ShopbagContext.Provider>;
};

const useShopbag = () => {
   const context = useContext(ShopbagContext);
   if (context === undefined) throw new Error("UseShopbag ShopbagProvider içinde kullanılmalıdır");
   return context;
};

export { ShopbagProvider, useShopbag };
