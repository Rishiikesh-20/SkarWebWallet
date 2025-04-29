import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    const {searchParams}=new URL(req.url)
    const username = searchParams.get("username");
    const accountNo = searchParams.get("accountNo");
    const typeCoin = searchParams.get("typeCoin");
    if (!username || !accountNo || !typeCoin) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    const response=await prisma.user.findFirst({
        where:{
            username:username
        },
        select:{
            account:{
                where:{
                    accountNo:parseInt(accountNo)
                },
                select:{
                    wallet:{
                        where:{
                            pathType:parseInt(typeCoin)
                        },
                        select:{
                            pathType:true,
                            privateKey:true,
                            pubilcKey:true,
                        }
                    }

                }
            }
        }
    })
    return NextResponse.json(response?.account[0].wallet)
}