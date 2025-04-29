"use client"
import NavBar from "./NavBar";
import SecretPhrase from "./SecretPhrase";
import { useState } from "react";
import WalletBox from "./Walletbox";
import SpecificWallet from "./SpecificWallet";
export default function Dashboard(){
    const [option,setOption]=useState<boolean>(false) 
    return (
        <div className="bg-black h-screen w-[100vw] flex flex-col items-center">
            <div className="flex flex col justify-center p-6 w-[80vw]">
                <div className="w-full">
                    <NavBar option={option} setOption={setOption}/>
                    <SecretPhrase />
                    <SpecificWallet option={option}/>
                    <WalletBox option={option}/>
                </div>
            </div>
        </div>
    )
}