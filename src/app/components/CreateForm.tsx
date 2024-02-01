"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './Form';
import React from 'react';

const typeFile = z.custom<FileList>((val) => {
  return val instanceof FileList;
}, { message: 'O valor deve ser uma imagem!' });

const schema = z.object({
    nome: z.string().min(1, 'Campo obrigatório!'),
    descricao: z.string().min(1, 'Campo obrigatório!'),
    preco: z.string().min(1, 'Campo obrigatório!'),
    imagem: typeFile.transform(list => list.item(0)),
    habilitado: z.string().min(1, 'Campo obrigatório!'),
    categoria: z.string().min(1),
  }).refine(data => {
    return data.imagem !== null && data.imagem !== undefined;
}, {
    message: 'Imagem é um campo obrigatório!',
    path: ['imagem'],
});

type createFormType = z.infer<typeof schema>

const categorias = [
  { value: 'Smart', label: 'Smart' },
  { value: 'Mini', label: 'Mini' },
  { value: 'Tag', label: 'Tag' },
  { value: 'Totem', label: 'Totem' },
];

const habilitadoOpcoes = [
  { value: 'y', label: 'Sim' },
  { value: 'n', label: 'Não' },
];

export function CreateForm() {
  const [value, setValue] = React.useState<string>('');
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!/^\d*\.?\d*$/.test(input)) return;

    const sanitizedValue = input.replace(/[^\d,]/g, '');
  
    const formattedValue= (parseFloat(sanitizedValue)/100).toFixed(2);

    setValue(formattedValue);
  };

  const criacaoForm = useForm<createFormType>({
    resolver: zodResolver(schema),
  });

  const { 
    handleSubmit, 
    formState: { isSubmitting }, 
    reset,
  } = criacaoForm;

  function converterImagemParaBase64(imagem: any): Promise<string> | null {
    return imagem ? new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
  
      reader.onerror = () => {
        reject(new Error('Erro ao ler a imagem'));
      };
  
      reader.readAsDataURL(imagem);
    }) : null;
  }

  async function onSubmit(data: createFormType) {
    const imgBase64 = await converterImagemParaBase64(data.imagem);
    const bodyRequest = {
      ...data,
      imagem: imgBase64,
      preco: parseFloat(data.preco),
      habilitado: data.habilitado === 'y' ? true : false, 
    };

    try {
      await fetch("http://localhost:3000/api/dispositivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 3000);
      setValue('');
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  }

  return (
    <FormProvider {...criacaoForm}>
      {isSuccess && (
        <div className="bg-green-500 text-white p-2 mb-2">
          Dispositivo criado com sucesso!
        </div>
      )}
      {isError && (
        <div className="bg-red-500 text-white p-2 mb-2">
          Ocorreu um erro ao criar um dispositivo. Tente novamente.
        </div>
      )}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <Form.Field>
          <Form.Label htmlFor="nome">
            Nome
          </Form.Label>
          <Form.Input type="text" name="nome" />
          <Form.ErrorMessage field="nome" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="descricao">
            Descrição
          </Form.Label>
          <Form.Textarea
            name="descricao"
            style={{ resize: 'none' }}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
          <Form.ErrorMessage field="descricao" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="descricao">
            Preço
          </Form.Label>
          <Form.Input
            type="text"
            name="preco"
            value={value}
            onChange={handleChange}
          />
          <Form.ErrorMessage field="descricao" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="categoria">
            Categoria
          </Form.Label>
          <Form.Select name="categoria" options={categorias}/>
          <Form.ErrorMessage field="descricao" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="habilitado">
            Habilitado
          </Form.Label>
          <Form.Radio name="habilitado" options={habilitadoOpcoes}/>
          <Form.ErrorMessage field="habilitado" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="imagem">
            Imagem
          </Form.Label>

          <Form.Input type="file" name="imagem" />
          <Form.ErrorMessage field="imagem" />
        </Form.Field>

        <button
          type="submit" 
          disabled={isSubmitting}
          className="bg-sky-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-sky-600 mb-2"
        >
          Salvar
        </button>
      </form>
    </FormProvider>
  );
}

export default CreateForm;