"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    nome: z.string().min(1, 'Campo obrigatório!'),
    descricao: z.string().min(1, 'Campo obrigatório!'),
    preco: z.string(),
    imagem: z.instanceof(FileList).transform(list => list.item(0)),
    habilitado: z.boolean(),
    categoria: z.enum(['Smart', 'Mini', 'Tag', 'Totem'])
  }).partial();

type createFormType = z.infer<typeof schema>

export function CreateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<createFormType>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: createFormType) {
    console.log('chegou aqui', data)
    // event.preventDefault();
    // const name = document.querySelector<HTMLInputElement>("#name")!.value;
    // const description =
    //   document.querySelector<HTMLInputElement>("#description")!.value;
    // console.log(name, description);

    // await fetch("http://localhost:3000/api/categories", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, description }),
    // });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="nome">Nome:</label>
        <input autoComplete='off' className="w-full p-2 border border-gray-300 rounded-md text-black" type="text" id="nome" {...register('nome')} />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>
      <div className="mb-2">
        <label className="block mb-2 text-black" htmlFor="descricao">Descrição:</label>
        <textarea style={{ resize: 'none' }} className="w-full p-2 border border-gray-300 rounded-md text-black" id="descricao" {...register('descricao')} />
        {errors.descricao && <span>{errors.descricao.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="preco">Preço:</label>
        <input className="appearance-nonew-full p-2 border border-gray-300 rounded-md text-black" type="text" id="preco" {...register('preco')} />
        {errors.preco && <span>{errors.preco.message}</span>}
      </div>
      <div className="mb-2">
        <label className="bg-sky-800 hover:bg-sky-700 font-bold py-2 px-4 rounded cursor-pointer text-white" htmlFor="imagem">Imagem</label>
        <input className="hidden" type="file" id="imagem" accept=".jpg,.png" {...register('imagem')} />
        {errors.imagem && <span>{errors.imagem.message}</span>}
      </div>
      <div className='flex justify-between'>
        <div className="mb-2 w-1/2">
          <label className="block mb-2 text-black" htmlFor="categoria">Categoria:</label>
          <select className="w-full p-2 border border-gray-300 rounded-md text-black" id="categoria" {...register('categoria')}>
            <option value="Smart">Smart</option>
            <option value="Mini">Mini</option>
            <option value="Tag">Tag</option>
            <option value="Totem">Totem</option>
          </select>
          {errors.categoria && <span>{errors.categoria.message}</span>}
        </div>
        <div className="w-1/2 mb-0 flex items-center justify-center">
          <div>
              <label htmlFor='habilitado' className="block mb-0 text-black">
                  Habilitado:
              </label>
          </div>
          <div>
              <input id='habilitado' className="p-2 borderrounded-md ml-2" type="checkbox" {...register('habilitado')} />
          </div>
        </div>
      </div>
      <button className="bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit">Enviar</button>
    </form>
  );
}

export default CreateForm;