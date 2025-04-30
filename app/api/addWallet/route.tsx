/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { mnemonicToSeedSync } from "bip39";
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {Keypair} from "@solana/web3.js"
import {HDNodeWallet} from "ethers"
const prisma=new PrismaClient()
export async function POST(req:NextRequest){
    const body=await req.json();
    const response=await axios.get("http://192.168.29.250:3000/api/getSecretPhrase",{params:{username:body.username}})
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

    try{

        if(body.typeCoin==501){

            const path=`m/44'/501'/${body.accountNo}'/${noOfWallets+1}'`

            const derivedSeed=derivePath(path,seed.toString("hex")).key;

            const secret=nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

            const publicKey=Keypair.fromSecretKey(secret).publicKey.toBase58();

            const privateKey=Keypair.fromSecretKey(secret).secretKey

            const result=await prisma.wallet.create({
                data:{
                    pathType:body.typeCoin,
                    accountNo:body.accountNo,
                    privateKey:privateKey.toString(),
                    pubilcKey:publicKey
                }
            })

            return NextResponse.json({publicKey,privateKey})

        }else if(body.typeCoin==60){
            const path=`m/44'/60'/${body.accountNo}'/${noOfWallets+1}'`

            const hdNode=HDNodeWallet.fromSeed(seed);

            const child=hdNode.derivePath(path);

            const address=child.publicKey;

            const privateKey=child.privateKey;

            const result=await prisma.wallet.create({
                data:{
                    pathType:body.typeCoin,
                    accountNo:body.accountNo,
                    privateKey:privateKey.toString(),
                    pubilcKey:address
                }
            })

            return NextResponse.json({publicKey:address,privateKey})
        }else{
            return NextResponse.json({message:"Pathtype is not supported"},{status:404})
        }
    }
    catch(e){
        console.log("Error: ",e);
    }
}