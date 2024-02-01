"use client"

import Link from 'next/link'
import Image from "next/image";
import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    id: string
    imagem: any
    nome: string
    descricao: string
    preco: number
    habilitado: boolean
    categoria: string
}

export default function CardItem (props: FieldProps){
    async function onDelete() {
        await fetch("http://localhost:3000/api/dispositivos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: props.id }),
        });
    }

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-3">
      <Image
        className="w-350 h-200 object-cover"
        src={props.imagem}
        alt={props.nome}
        width={350}
        height={200}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2 text-black">{props.nome}</div>
        <p className="text-gray-700 text-base">{props.descricao}</p>
        <p className="text-gray-700 text-base">R$ {props.preco}</p>
        <p className="text-gray-700 text-base">{props.habilitado ? 'Habilitado': 'Não habilitado'}</p>
        <p className="text-gray-700 text-base">#{props.categoria}</p>
        <Link href="/form-create">
            <button
            onClick={async() => await onDelete()}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
            Excluir
            </button>
        </Link>
      </div>
    </div>
  );
};
