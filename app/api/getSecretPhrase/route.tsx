import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();
export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const username=searchParams.get("username");
    if (!username){
        console.log("USername is null")
        return NextResponse.json({message:"Username is null"},{status:400})
    }
    const response=await prisma.user.findFirst({
        where:{
            username,
        }
    })
    if(response?.Mnemonic.length==0){
        return NextResponse.json({message:"Mneumonic is not generated"},{status:404})
    }
    return NextResponse.json(response?.Mnemonic)
}


export async function POST(req:NextRequest){
    const body=await req.json();

    try{
        await prisma.user.update({
            where:{
                username:body.username
            },
            data:{
                Mnemonic:body.Mnemonic
            }
        })

        return NextResponse.json({message:"Updated the Mnemonic"},{status:200})
    }catch(e){
        console.log(e)

    }

    

}