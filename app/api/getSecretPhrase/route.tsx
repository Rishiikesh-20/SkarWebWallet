import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient();
export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const username=searchParams.get("username");
    if (!username){
        return NextResponse.json({message:"Username is null"},{status:400})
    }
    const response=await prisma.user.findFirst({
        where:{
            username,
        }
    })

    return NextResponse.json(response?.Mnemonic)
}