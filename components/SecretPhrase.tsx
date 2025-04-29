"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import DownArrow from "./ui/down";
import { useState } from "react";
import UpArrow from "./ui/UpArrow";
import { useUser } from "./UserContext";
import Box from "./Box";
import axios from "axios"


export default function SecretPhrase(){
    const [open,setOpen]=useState(false);
    const [secretPhrase,setSecretPhrase]=useState<string[]>()
    const user = useUser();
    async function getSecretPhrase(){
        try{
            const {data}=await axios.get("http://localhost:3000/api/getSecretPhrase",{params:{username:user.user?.user}})
            setSecretPhrase(data);
        }catch(e){
            console.log(e);
        }
    }
    async function onClickHandler(){
        setOpen(true);
        await getSecretPhrase();
    }
    return (
        <div className="mt-8 border-2 w-full p-4 text-white">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="text-white">
                    <AccordionTrigger className="font-bold text-[20px] w-[80%]" onClick={onClickHandler}>
                        <div className="flex justify-between">
                            Your Secret Phrase
                            {open ? <UpArrow /> : <DownArrow />}           
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {secretPhrase?.map(m=><Box key={m} name={m}/>)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}