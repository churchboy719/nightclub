import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect} from "react";
import {  groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { menu } from "@/sanity/schema/menu";
import { items } from "@/sanity/schema/items";
import { menus } from "../query";


export const useMenu = () => {
    return useQuery({ queryFn: ()=> client.fetch(groq `*[_type=="menu"]`),
    queryKey: ["menus"],
refetchInterval: false,
refetchOnMount: false,
refetchOnWindowFocus: false,
refetchOnReconnect: false,
refetchIntervalInBackground: false,});
}

type useCartItems = {
  menu: any[],
  cartItems: any[],
  orderList: any[ ]
}

export const useCartItems = () => {
const [cartItems, setCartItems] = useState<any[]>([]);
const [orderList, setOrdelist] = useState<any[]>([]);

  return useQuery(
    {queryFn: (cartItems:any)=>{
      setOrdelist((...orderList:any)=>[...orderList, cartItems])
    },
    queryKey: ["orderList"]
    }
  );
} 







//export const useMenuQuery = ()  => useQuery({
  //      queryFn: ()=> client.fetch(groq `*[_type=="menu"]`),
    //    queryKey: ["menus"],
   // refetchInterval: false,
    //refetchOnMount: false,
    //refetchOnWindowFocus: false,
    //refetchOnReconnect: false,
    //refetchIntervalInBackground: false,
   //});

