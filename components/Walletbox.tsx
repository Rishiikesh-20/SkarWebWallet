"use client"
import { useUser } from "./UserContext"
import { useEffect} from "react";
import axios from "axios"
import Delete from "./ui/Delete";
import { WalletType } from "./Dashboard";

let counter=0;
export default function WalletBox({option,wallets,setWallets,refresh}:{option:boolean,refresh:boolean,wallets:WalletType[] | null,setWallets:(wallets:WalletType[] | null)=>void}){
    const user=useUser();
    
    let typeCoin:number;
    useEffect(function(){
        console.log("HEre Recursive")
        async function getWallet(){
            try{
                if (option==false){
                    typeCoin=501
                }else{
                    typeCoin=60;
                }
                const {data}=await axios.get("http://192.168.29.250:3000/api/getWallet",{params:{username:user.user?.user,typeCoin:typeCoin,accountNo:user.user?.accountNo}});
                console.log("Wallet DetAILS: ",data)
                setWallets(data);

            }catch(e){
                console.log("Error occured: ",e);
            }
            
        }
        getWallet();
        
    },[option,refresh])
    console.log(wallets)
    
    return (
        <div className="flex flex-col space-y-6 text-white ">
            {counter=0}
            {wallets!=null?wallets.map(m=><div key={++counter} className="border-2 rounded-lg w-full p-4 flex flex-col">
                <div className="flex justify-between">
                    <div>
                        <div className="text-bold text-[20px]">Wallet {counter+1}</div>
                        <div>Remaining amount: </div>
                    </div>
                    <div className="bg-white p-2">
                        <Delete />
                    </div>
                </div>
                <div className="bg-zinc-600 rounded-lg p-4 flex flex-col text-white">
                    <div className="flex flex-col">
                        <div className="text-bold text-gray-200 text-[20px]">Public Key</div>
                        <div className="text-[14px] text-white">{m.pubilcKey}</div> 
                    </div>
                    <div className="flex flex-col">
                        <div className="text-bold text-gray-200 text-[20px]">Private Key</div>
                        <p className="text-[14px] text-white text-wrap">{m.privateKey}</p> 
                    </div>
                </div>
            </div>):<div className="text-bold text-[20px] text-white mt-40 ml-130">No Wallets Found</div>}
        </div>
    )
}