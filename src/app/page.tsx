import CardItem from "./components/CardItem";

async function getDispositivos(): Promise<any[]> {
  const response = await fetch("http://localhost:3001/dispositivos", {
    next: {
      tags: ["dispositivos"],
      revalidate: 0,
    },
  });
  return response.json();
}

export default async function Home() {
  const dispositivos = await getDispositivos();

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 mt-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-wrap -mx-4">
            {dispositivos && dispositivos.map((dispositivo) => (
              <CardItem
                key={dispositivo.id}
                id={dispositivo.id}
                nome={dispositivo.nome}
                imagem={dispositivo.imagem}
                descricao={dispositivo.descricao}
                preco={dispositivo.preco}
                habilitado={dispositivo.habilitado}
                categoria={dispositivo.categoria}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
