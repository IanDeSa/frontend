import Image from "next/image";

async function getDispositivos(): Promise<any[]> {
  const response = await fetch("http://localhost:3001/dispositivos", {
    next: {
      tags: ["dispositivos"],
    },
  });
  return response.json();
}

export default async function Home() {
  const dispositivos = await getDispositivos();

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center mt-6">
      <div className="bg-gray-100 mt-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-wrap -mx-4">
            {dispositivos.map((dispositivo) => (
              <div key={dispositivo.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <p className="text-black">
                    {dispositivo.nome}
                  </p>
                  <p className="text-black">
                    {dispositivo.descricao}
                  </p>
                  <p className="text-black">
                    {dispositivo.preco}
                  </p>
                  <p className="text-black">
                    {dispositivo.habilitado ? 'Habilitado' : 'Não Habilitado'}
                  </p>
                  <p className="text-black">
                    {dispositivo.categoria}
                  </p>
                  <Image
                    src={dispositivo.imagem}
                    alt={`Imagem do dispositivo ${dispositivo.id}`}
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
