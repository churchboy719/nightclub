import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect} from "react";
import {  groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { menu } from "@/sanity/schema/menu";
import { items } from "@/sanity/schema/items";

//export function GlobalState<T>(queryKey: unknown, initialData: T | null=null){
    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [orderList, setOrdelist] = useState<any[]>([]);


   //return function (){
      export const {data:menus} = useQuery({
            queryFn: ()=> client.fetch(groq `*[_type=="menu"]`),
            queryKey: ["menus"],
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,

       });


       
          
        
        export const addItems = (menu:any, qty:number) => {
            const checkItem = cartItems.find((item:any)=> item._id === menu._id);
            //setAmt((prevAmt)=>prevAmt + menu.price*qty);
      
            if(checkItem){
              setCartItems(
                 cartItems.map((item:any)=>
                item._id === menu._id? {...checkItem, qty:checkItem.qty + 1}:item)
              );      
          } else{
            setCartItems([...cartItems, {...menu, qty: + 1}]);
          }
        };
        const removeItem = (menu:any,qty:number)=>{
          const checkItem = cartItems.find((item:any)=> item._id === menu._id);
          if(checkItem.qty===1) {
            setCartItems(cartItems.filter((item) => item._id !== menu._id));
          }
          else {
            setCartItems(
            cartItems.map(item=>item._id === menu._id?{...checkItem, qty:checkItem.qty -1}:item)
          );
          }
        }
          
          
        
        export const totalAmount = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  
     

      // return {data:menus, addItems, removeItem, totalAmount, sendItems, qty, setQty, orderList, cartItems, setCartItems, setOrdelist};
    //} 
   
//}