"use client"
import { AccountBox } from "./accountIcon"
export default function Navbar({option,setOption}:{option:boolean , setOption : (option:boolean)=>void}){
    return (
        <div className="flex space-x-4 p-4 border-2 items-center justify-around">
            <AccountBox />
            <div className="text-white text-xl ">Skar Wallet</div>
            <div className="rounded-lg  text-black bg-white flex items-center cursor-pointer">
                <div className={`${option==false ?"bg-black text-white":"bg-white"} rounded-lg py-1 px-4 w-[100px]`} onClick={()=>setOption(false)}>Solana</div>
                <div className={`${option==true ?"bg-black text-white":"bg-white"} rounded-lg px-4 py-1 w-[100px]`} onClick={()=>setOption(true)}>Ethereum</div>
            </div>
        </div>
    )
}