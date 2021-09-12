import Home from "./pages/Home";

export default function App() {
  console.log('Teste no console do navegador');

  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            Gestão de Alunos
          </h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <Home />
        </div>
      </main>
    </div>
  );
}
