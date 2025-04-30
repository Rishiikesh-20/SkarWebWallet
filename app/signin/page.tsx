"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";
export default function SignIn(){
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [error,setError]=useState<string>("")
    const router=useRouter();
    const user=useUser();
    async function signIn(){
        try{
            const response=await axios.post("http://192.168.29.250:3000/api/addUser",{username:username,password:password});

            console.log(response);
            user.setUser({user:response.data.username,accountNo:0})

            router.push("/")


        }catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
                setError(e.response?.data.message)
            } else {
                console.error("Unexpected error", e);
            }
        }
        
    }
    return(
        <div className="w-[100vw] h-[100vh] bg-black flex flex-col items-center justify-center">
            <div className="p-9  border-1 border-white rounded-lg flex flex-col items-center space-y-6">
                <div className="text-white text-[25px] text-bold">Sign In Page</div>
                <Input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" type="text" className="text-white" required/>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="password" type="password" className="text-white" required />
                <Button onClick={signIn} size="lg" className="text-white hover:bg-white hover:text-black">Submit</Button>
                <div className="text-red-500">{error}</div>
            </div>
        </div>
    );
}