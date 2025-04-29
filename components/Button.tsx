"use client"

export default function Button({onButtonClick,name}:{onButtonClick:()=>void , name:string}){
    return <div>
        <button className="p-4 bg-black text-white rounded-md" onClick={onButtonClick}>{name}</button>
    </div>
}