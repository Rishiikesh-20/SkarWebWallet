"use client"
import NavBar from "./NavBar";
import SecretPhrase from "./SecretPhrase";
import { useEffect, useState } from "react";
import WalletBox from "./Walletbox";
import SpecificWallet from "./SpecificWallet";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
export type WalletType={
    pathType:number,
    privateKey:string,
    pubilcKey:string
}
export default function Dashboard(){
    const router=useRouter();
    const user=useUser();

    useEffect(()=>{
        if(!user.user){
            router.push("/signin")
        }
    },[user,router])
   
    const [option,setOption]=useState<boolean>(false) 
    const [wallets,setWallets]=useState<WalletType[]|null>(null)
    const [refresh,setRefresh]=useState<boolean>(false);
    console.log(user)
    return (
        <div className="bg-black h-[5000px] w-[100vw] flex flex-col items-center">
            <div className="flex flex col justify-center p-6 w-[80vw]">
                <div className="w-full">
                    <NavBar option={option} setOption={setOption}/>
                    <SecretPhrase />
                    <SpecificWallet option={option} setWallets={setWallets} refresh={refresh} setRefresh={setRefresh}/>
                    <WalletBox option={option} wallets={wallets} setWallets={setWallets} refresh={refresh}/>
                </div>
            </div>
        </div>
    )
}