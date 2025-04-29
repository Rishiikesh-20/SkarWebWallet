import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { mnemonicToSeedSync } from "bip39";
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {Keypair} from "@solana/web3.js"
const prisma=new PrismaClient()
export default async function POST(req:NextRequest){
    const body=await req.json();
    const response=await axios.get("http://loacalhost:3000/api/getSecretPhrase",{params:{username:body.username}})
    const Mneumonic:string[]|null=response.data;
    if(!Mneumonic){
        return NextResponse.json({message:"Mneumonic is Empty"},{status:404})
    }
    const result=await prisma.user.findFirst({
        where:{
            username:body.username
        },
        select:{
            account:{
                where:{
                    accountNo:body.accountNo
                },
                select:{
                    wallet:{
                        where:{
                            pathType:body.typeCoin
                        },
                        select:{
                            privateKey:true,
                            pubilcKey:true
                        }
                    }
                }
            }
        }
    })

    const wallets=result?.account[0].wallet;
    const noOfWallets=wallets?.length || 0;
    const seed=mnemonicToSeedSync(Mneumonic?.join(" "));
    if(body.typeCoin==501){

        const path=`m/44'/501'/${body.accountNo}'/${noOfWallets+1}'`
        const derivedSeed=derivePath(path,seed.toString("hex")).key;

        const keyPair=nacl.sign.keyPair.fromSeed(derivedSeed);

        const solanaKeyPAir=Keypair.fromSecretKey(keyPair);

        const publicKey=keyPair.publicKey.toBase58()

        const privateKey=Buffer.from(keyPair.secretKey).toString("base64")

        return NextResponse.json({publicKey,privateKey})

    }else if(body.typeCoin==60){

    }else{

    }
}