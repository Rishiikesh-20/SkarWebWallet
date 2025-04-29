"use client"
import { useUser } from "./UserContext"
import { useEffect, useState } from "react";
import axios from "axios"
import Delete from "./ui/Delete";
type WalletType={
    pathType:number,
    privateKey:string,
    publicKey:string
}
let counter=0;
export default function WalletBox({option}:{option:boolean}){
    const user=useUser();
    const [wallets,setWallets]=useState<WalletType[]|null>(null)
    let typeCoin:number;
    useEffect(function(){
        async function getWallet(){
            try{
                if (option==false){
                    typeCoin=501
                }else{
                    typeCoin=60;
                }
                const {data}=await axios.get("http://localhost:3000/api/getWallet",{params:{username:user.user?.user,typeCoin:typeCoin}});
                setWallets(data);
            }catch(e){
                console.log("Error occured: ",e);
            }
            
        }
        getWallet();
        
    },[option,wallets])
    
    
    return (
        <div className="flex flex col space-y-6">
            {counter=0}
            {wallets!=null?wallets.map(m=><div key={++counter} className="border-2 rounded-lg w-full p-4 flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <div className="text-bold text-[20px]">Wallet {counter}</div>
                        <div>Remaining amount: </div>
                    </div>
                    <div className="bg-white p-2">
                        <Delete />
                    </div>
                </div>
                <div className="bg-zinc-600 rounded-lg p-4 flex flex-col text-white">
                    <div className="flex flex-col">
                        <div className="text-bold">Public Key</div>
                        <div className="text-[7px] text-gray-600">{m.publicKey}</div> 
                    </div>
                    <div className="flex flex-col">
                        <div className="text-bold">Private Key</div>
                        <div className="text-[7px] text-gray-600">{m.privateKey}</div> 
                    </div>
                </div>
            </div>):<div className="text-bold text-[20px] text-white mt-40 ml-130">No Wallets Found</div>}
        </div>
    )
}