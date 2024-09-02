"use client";

import { useSubscription } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import FoodCard from "@/components/FoodCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Categories, Foods } from "@/gql/graphql";
import { GET_ALL_CATEGORIES } from "@/queries/queries";
import { useShopbag } from "@/components/context/ShopbagContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
   const router = useRouter();
   const [isMobile, setIsMobile] = useState(false);
   const [selectedTab, setSelectedTab] = useState("all");
   const [rightPosition, setRightPosition] = useState(12);
   const { totalPrice, totalItems, clearBag } = useShopbag();
   const [filteredCategories, setFilteredCategories] = useState<Categories[]>([]);

   const { data: categoriesData, loading: categoriesLoading } = useSubscription(GET_ALL_CATEGORIES);

   useEffect(() => {
      if (categoriesData && selectedTab !== "all") {
         const filtered = categoriesData.categories.filter((cat: Categories) => cat.category_name === selectedTab);
         setFilteredCategories(filtered);
      } else if (categoriesData) {
         setFilteredCategories(categoriesData.categories);
      }
   }, [categoriesData, selectedTab]);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY >= 10) setRightPosition(2);
         else setRightPosition(12);
      };
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsMobile(true);
         } else {
            setIsMobile(false);
         }
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return (
      <div className="relative">
         {totalPrice !== 0 &&
            (isMobile ? (
               <div className="w-full fixed bottom-2 flex justify-center z-10">
                  <Button className="bg-background/75" variant={"outline"} onClick={() => router.push("/payment")}>
                     <span className="text-lg font-bold">({totalPrice} ₺)</span>
                     <p className="ml-2 text-lg">Ödemeye git</p>
                     <FaAngleRight className="w-6 h-6 ml-2" />
                  </Button>
               </div>
            ) : (
               <div className={`fixed top-2 z-10 right-${rightPosition} transition-all duration-300`}>
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button variant={"outline"}>
                           <BiShoppingBag className="w-6 h-6" />
                           <div className="rounded-full aspect-square min-w-5 ml-3">{totalItems}</div>
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="flex flex-col items-center justify-center space-y-3">
                        <h1>Toplam: {totalPrice} ₺</h1>
                        <div className="flex gap-1">
                           <Button variant={"outline"} onClick={() => clearBag()}>
                              Sepeti boşlat
                           </Button>
                           <Button variant={"outline"} onClick={() => router.push("/payment")}>
                              Ödemeye git
                              <FaAngleRight className="w-5 h-5  ml-2" />
                           </Button>
                        </div>
                     </PopoverContent>
                  </Popover>
               </div>
            ))}
         <Navbar />
         <div className="p-2 max-w-[1200px] mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full flex flex-col items-center">
               <TabsList className="max-w-[500px] ">
                  {isMobile ? (
                     <>
                        <Select onValueChange={setSelectedTab} value={selectedTab}>
                           <SelectTrigger>
                              <SelectValue placeholder="Lütfen seçiniz" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 <SelectItem value="all">Tüm Yemekler</SelectItem>
                                 {categoriesData &&
                                    categoriesData.categories.map((category: Categories) => {
                                       if (category.foods.length !== 0) {
                                          return (
                                             <SelectItem value={category.category_name} key={category.id}>
                                                {category.category_name}
                                             </SelectItem>
                                          );
                                       }
                                    })}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </>
                  ) : (
                     <div className="flex items-center justify-center">
                        <Carousel className="max-w-[400px]" opts={{ align: "center" }}>
                           <CarouselContent>
                              <CarouselItem className="basis-auto">
                                 <TabsTrigger value="all">Tüm Yemekler</TabsTrigger>
                              </CarouselItem>
                              {categoriesData &&
                                 categoriesData.categories.map((category: Categories) => {
                                    if (category.foods.length !== 0) {
                                       return (
                                          <CarouselItem key={category.id} className="basis-auto">
                                             <TabsTrigger value={category.category_name}>{category.category_name}</TabsTrigger>
                                          </CarouselItem>
                                       );
                                    }
                                 })}
                           </CarouselContent>
                           <CarouselNext />
                           <CarouselPrevious />
                        </Carousel>
                     </div>
                  )}
               </TabsList>
               {categoriesLoading ? (
                  <div className="relative h-96">
                     <Loading />
                  </div>
               ) : (
                  <TabsContent className="w-full" value={selectedTab}>
                     {filteredCategories &&
                        filteredCategories.map((category: Categories) => {
                           if (category.foods.length !== 0) {
                              return (
                                 <div key={category.id}>
                                    <h1 className="mt-2 text-2xl font-bold">{category.category_name}</h1>
                                    <Separator className="mb-2 w-full md:w-1/2 lg:w-1/3" />
                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                       {category.foods.map((food: Foods) => (
                                          <FoodCard key={food.id} food={food} />
                                       ))}
                                    </div>
                                 </div>
                              );
                           }
                        })}
                  </TabsContent>
               )}
            </Tabs>
         </div>
      </div>
   );
}
