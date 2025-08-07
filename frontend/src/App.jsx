import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);

  // useEffect executa o código dentro dele assim que o componente aparece na tela.
  useEffect(() => {
    // Função para buscar todos os dados da API
    async function buscarDados() {
      try {
        // Fazemos duas chamadas à API em paralelo para ser mais eficiente
        const [resDespesas, resReceitas] = await Promise.all([
          axios.get('http://localhost:3000/despesas'),
          axios.get('http://localhost:3000/receitas')
        ]);
        
        // atualiza os "estados" com os dados recebidos da api
        setDespesas(resDespesas.data);
        setReceitas(resReceitas.data);

      } catch (error) {
        // Mostra um erro no console do navegador se a chamada falhar
        console.error("Erro ao buscar dados:", error);
      }
    }

    buscarDados(); // Executamos a função de busca
  }, []); // O array vazio [] no final faz com que ele rode apenas uma vez, quando o app carrega.

  // Calcula os totais e o saldo
  const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
  const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    // Fundo da página
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      {/* Container principal */}
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Meu Diário Financeiro</h1>
          <p className="text-slate-500">Seu controle financeiro, simplificado.</p>
        </header>

        {/* Card de Resumo */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Resumo</h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-green-600">Total de Receitas:</p>
            <span className="text-lg font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-red-600">Total de Despesas:</p>
            <span className="text-lg font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-bold">Saldo Atual:</h3>
            <span className={`text-xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              R$ {saldo.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Grid para Receitas e Despesas */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna de Receitas */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Receitas</h2>
            <ul className="space-y-3">
              {receitas.length > 0 ? receitas.map((receita) => (
                <li key={receita.id} className="flex justify-between border-b pb-2">
                  <span>{receita.descricao}</span>
                  <span className="font-semibold text-green-600">+ R$ {receita.valor.toFixed(2)}</span>
                </li>
              )) : <p className="text-slate-500">Nenhuma receita cadastrada.</p>}
            </ul>
          </div>

          {/* Coluna de Despesas */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Despesas</h2>
            <ul className="space-y-3">
              {despesas.length > 0 ? despesas.map((despesa) => (
                <li key={despesa.id} className="flex justify-between border-b pb-2">
                  <div>
                    <span>{despesa.descricao}</span>
                    <span className="text-sm text-slate-500 block">{despesa.categoria}</span>
                  </div>
                  <span className="font-semibold text-red-600">- R$ {despesa.valor.toFixed(2)}</span>
                </li>
              )) : <p className="text-slate-500">Nenhuma despesa cadastrada.</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;