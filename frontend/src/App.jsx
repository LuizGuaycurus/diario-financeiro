import { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioTransacao from './components/FormularioTransacao';
import ListaTransacoes from './components/ListaTransacoes';

function App() {
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);

  // Função para buscar os dados iniciais da API
  const buscarDados = async () => {
    try {
      const [resDespesas, resReceitas] = await Promise.all([
        axios.get('http://localhost:3000/despesas'),
        axios.get('http://localhost:3000/receitas')
      ]);
      setDespesas(resDespesas.data);
      setReceitas(resReceitas.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // useEffect para buscar os dados quando o componente carregar
  useEffect(() => {
    buscarDados();
  }, []);

  // Função que será chamada pelo formulário para adicionar uma nova transação
  const handleAdicionarTransacao = async (novaTransacao, tipo) => {
    try {
      // Define o endpoint da API com base no tipo ('receitas' ou 'despesas')
      const endpoint = `http://localhost:3000/${tipo}s`;
      
      // Faz a requisição POST para a API para criar o novo registro
      await axios.post(endpoint, novaTransacao);
      
      // Após o sucesso, busca os dados novamente para atualizar as listas na tela
      buscarDados();

    } catch (error) {
      console.error(`Erro ao adicionar ${tipo}:`, error);
      alert(`Não foi possível adicionar a ${tipo}. Verifique o console para mais detalhes.`);
    }
  };

  // nova função pra deletar

  const handleDeletarTransacao = async (id, tipo) => {
    // Pede uma confirmação ao usuário antes de deletar
    if (window.confirm(`Tem certeza que deseja deletar esta ${tipo}?`)) {
      try {
        const endpoint = `http://localhost:3000/${tipo}s/${id}`;
        await axios.delete(endpoint);
        // Atualiza a lista na tela após deletar
        buscarDados();
      } catch (error) {
        console.error(`Erro ao deletar ${tipo}:`, error);
        alert(`Não foi possível deletar a ${tipo}.`);
      }
    }
  };

  const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
  const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Meu Diário Financeiro</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <FormularioTransacao onAdicionarTransacao={(transacao) => handleAdicionarTransacao(transacao, 'receita')} tipo="receita" />
          <FormularioTransacao onAdicionarTransacao={(transacao) => handleAdicionarTransacao(transacao, 'despesa')} tipo="despesa" />
        </div>

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

        {/*Usa o novo componente para as listas */}
        <div className="grid md:grid-cols-2 gap-8">
          <ListaTransacoes
            titulo="Receitas"
            itens={receitas}
            tipo="receita"
            onDeletar={handleDeletarTransacao}
          />
          <ListaTransacoes
            titulo="Despesas"
            itens={despesas}
            tipo="despesa"
            onDeletar={handleDeletarTransacao}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
