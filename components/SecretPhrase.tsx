"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import DownArrow from "./ui/down";
import { useState } from "react";
import UpArrow from "./ui/UpArrow";
import { useUser } from "./UserContext";
import Box from "./Box";
import axios from "axios"
import { Button } from "./ui/button";
import {generateMnemonic} from "bip39"

export default function SecretPhrase(){
    const [open,setOpen]=useState(false);
    const [secretPhrase,setSecretPhrase]=useState<string[]>([])
    const[error,setError]=useState<string>("")
    const user = useUser();
    console.log(user)
    async function getSecretPhrase(){
        try{
            const {data}=await axios.get("http://192.168.29.250:3000/api/getSecretPhrase",{params:{username:user.user?.user}})
            console.log("Meneumonic: ",data)
            setSecretPhrase(data);
        }catch(e:unknown){
            console.log("Inside catch")
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
    async function generateMneumonic(){
        const Mnemonic=generateMnemonic();
        try{
            await axios.post("http://192.168.29.250:3000/api/getSecretPhrase",{username:user.user?.user,Mnemonic:Mnemonic.split(" ")})
            setSecretPhrase(Mnemonic.split(" "));
        }catch(e){
            console.log(e)
        }
        
    }
    async function onClickHandler(){
        setOpen(!open);
        await getSecretPhrase();
    }
    return (
        <div className="mt-8 border-2 w-full p-4 text-white">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="text-white">
                    <AccordionTrigger className="font-bold text-[20px] w-[80%]" onClick={onClickHandler}>
                        <div className="flex justify-between mt-3 mb-5">
                            Your Secret Phrase
                            {open ? <UpArrow /> : <DownArrow />}           
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {secretPhrase.length!=0?<div className="grid grid-cols-5 gap-4 ">
                            {secretPhrase.map(m=><Box key={m} name={m}/>)}
                        </div>:<div className="text-white">{error} <Button className="cursor-pointer" onClick={generateMneumonic}>Generate</Button></div>}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}