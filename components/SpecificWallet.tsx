"use client"
import { Button } from "./ui/button";
import axios from "axios";
import { useUser } from "./UserContext";
export default function SpecificWallet({option}:{option:boolean}){
    let typeCoin:number;
    if (option==false){
        typeCoin=501
    }else{
        typeCoin=60;
    }
    const user=useUser();
    async function addWallet(){
        const response=await axios.post("http://localhost:3000/api/getWallet",{username:user.user?.user,accountNo:user.user?.accountNo,typeCoin:typeCoin})

    }
    
    return (
        <div className="mt-10 mb-4 flex justify-between w-full">
            <div className="text-[25px] text-white text-bold">
                {typeCoin==501?"Solana":"Ethereum"} Wallet
            </div> 
            <div className="flex space-x-4">
                <Button className="text-black bg-white" size="lg" variant={"secondary"} onClick={addWallet}>Add Content</Button>
                <Button className="text-black bg-red-500" size="lg" variant={"secondary"}>Clear Content</Button>
            </div>
        </div>
    )
}