"use client"
import {generateMnemonic} from "bip39"
import { useState } from "react";
import Button from "./Button";
import Box from "./Box";

export default function Mneumonic() {
    const [mneumonicArray,setMneumonicArray]=useState<string[]>();
    const [generated,setGenerated]=useState<boolean>(false);

    function generateMnemonicFunc(){
        const Mneumonic=generateMnemonic();
        return Mneumonic.split(" ");
    }

    function onButtonClick(){
        const mneumonic = generateMnemonicFunc();
        setMneumonicArray(mneumonic);
        setGenerated(true)
    }
   
    return <div>
        <Button onButtonClick={onButtonClick} name={"Generate"}/> 
        {generated==true ? <div>
            {mneumonicArray?.map((m)=><div key={m}>
                <Box name={m}/>
            </div>)}
        </div>: <div></div>}
    </div>
}