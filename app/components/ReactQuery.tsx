"use client"

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect} from "react";
import {  groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { menu } from "@/sanity/schema/menu";
import { items } from "@/sanity/schema/items";

const queryClient = new QueryClient();

export const ReactQuery = ({children}: {children: React.ReactNode}) => {
//  const [qty, setQty] = useState(1);
//  const [cartItems, setCartItems] = useState<any[]>([]);
//  const [orderList, setOrdelist] = useState<any[]>([]);

//  const sendItems = (menu:any,qty:number) => {
//    setOrdelist([...cartItems, {...cartItems}]);
    //setOrdelist([...orderList, {...cartItems}]);
//  }
  
  
    
  
//  const addItems = (menu:any, qty:number) => {
//      const checkItem = cartItems.find((item:any)=> item._id === menu._id);
      //setAmt((prevAmt)=>prevAmt + menu.price*qty);

//      if(checkItem){
//        setCartItems(
//           cartItems.map((item:any)=>
//          item._id === menu._id? {...checkItem, qty:checkItem.qty + 1}:item)
//        );      
//    } else{
//      setCartItems([...cartItems, {...menu, qty: + 1}]);
//    }
//  };
//  const removeItem = (menu:any,qty:number)=>{
//    const checkItem = cartItems.find((item:any)=> item._id === menu._id);
//    if(checkItem.qty===1) {
//      setCartItems(cartItems.filter((item) => item._id !== menu._id));
//    }
//    else {
//      setCartItems(
//      cartItems.map(item=>item._id === menu._id?{...checkItem, qty:checkItem.qty -1}:item)
//    );
//    }
//  }
    
    
  
//  const totalAmount = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    
  
//  console.log(cartItems);


//  const {data:menus, isLoading, isError} = useQuery({
//    queryFn: ()=> client.fetch(groq `*[_type=="menu"]`),
//    queryKey: ["menus"],
//  });
//  console.log(menus);
  
//  if(isLoading){
//    return <h1>just a moment please...</h1>
//  }
//  if(isError){
//    return <h1>shit happens...</h1>
//  }
  
  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}