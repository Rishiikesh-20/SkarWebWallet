import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req:NextRequest){
    const body=await req.json();
    console.log(body)
    try{
        const result=await prisma.user.findFirst({
            where:{
                username:body.username,
            }
        })
        if(!result){
            const response=await prisma.user.create({
                data:{
                    username:body.username,
                    password:body.password,
                    account:{
                        create:{
                            accountNo:0
                        }
                    }
                }
            })
    
            return NextResponse.json({username:response.username,password:response.password},{status:200})
        }else{
            if(result?.password==body.password){
                return NextResponse.json({username:result?.username,password:result?.password},{status:200})
            }else {
                return NextResponse.json({ message: "Password is wrong" },{ status: 401 });
            }
        }
    }catch(e){
        return NextResponse.json(
            { message: "Prisma Error: " + (e instanceof Error ? e.message : String(e)) },
            { status: 500 }
        );
    } 
}