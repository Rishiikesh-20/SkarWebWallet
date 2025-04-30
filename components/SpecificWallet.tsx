"use client"
import { Button } from "./ui/button";
import axios from "axios";
import { useUser } from "./UserContext";
import { WalletType } from "./Dashboard";
import { useState } from "react";
export default function SpecificWallet({option,refresh,setWallets,setRefresh}:{option:boolean,refresh:boolean,setRefresh:(refresh:boolean)=>void,setWallets:(wallets:WalletType[] | null)=>void}){
    let typeCoin:number;
    const [error,setError]=useState<string>("")
    if (option==false){
        typeCoin=501
    }else{
        typeCoin=60;
    }
    const user=useUser();
    async function addWallet(){
        console.log("From SecretPhrase")
        try{
           await axios.post("http://192.168.29.250:3000/api/addWallet",{username:user.user?.user,accountNo:user.user?.accountNo,typeCoin:typeCoin})

        //    const {data}=await axios.get("http://192.168.29.250:3000/api/getWallet",{params:{username:user.user?.user,accountNo:user.user?.accountNo,typeCoin:typeCoin}})
        //     console.log(data)
        //    setWallets(data);
        setRefresh(!refresh)
        }catch(e:unknown){
            console.log(e);
            if (axios.isAxiosError(e)) {
                console.log("Inside if")
                console.log(e.response?.data?.message);
                setError(e.response?.data.message)
            } else {
                console.error("Unexpected error", e);
                setError("Unexpected Error")
            }
        }
        
    }

    async function clearWallet(){

    }
    
    return (
        <div className="mt-10 mb-4 flex justify-between w-full">
            <div className="text-[25px] text-white text-bold">
                {typeCoin==501?"Solana":"Ethereum"} Wallet
            </div> 
            <div className="flex space-x-4">
                <Button className="text-black bg-white" size="lg" variant={"secondary"} onClick={addWallet}>Add Content</Button>
                <Button className="text-black bg-red-500" size="lg" variant={"secondary"} onClick={clearWallet}>Clear Content</Button>
            </div>
            {error?<div className="text-red-500">{error}</div>:null}
        </div>
    )
}