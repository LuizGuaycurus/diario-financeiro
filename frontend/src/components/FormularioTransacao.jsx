import { useState } from 'react';

// cmponente reutilizável para o formulário de transações.
// props: onAdicionarTransacao (callback para o submit), tipo ('receita' ou 'despesa').
function FormularioTransacao({ onAdicionarTransacao, tipo }) {
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    // Validação de entrada.
    if (!descricao || !valor || (tipo === 'despesa' && !categoria)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Monta o payload da nova transação.
    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      // Adiciona o campo 'categoria' condicionalmente ao objeto.
      ...(tipo === 'despesa' && { categoria }),
    };

    // executa o callback do componente pai, passando o novo objeto de transação.
    onAdicionarTransacao(novaTransacao);

    //lLimpa os campos do formulário para a próxima inserção.
    setDescricao('');
    setValor('');
    setCategoria('');
  };

  // UI/UX: Customização baseada no tipo de transação.
  const titulo = tipo === 'receita' ? 'Adicionar Receita' : 'Adicionar Despesa';
  const corBotao = tipo === 'receita' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          
          {/* Input: Descrição */}
          <input
            type="text"
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            placeholder="Descrição"
            className="p-2 border rounded-md w-full"
          />

          {/* Input: Valor */}
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor (R$)"
            className="p-2 border rounded-md w-full"
            step="0.01" 
          />

          {/* Renderização condicional do campo Categoria. */}
          {/* O campo só é renderizado se o tipo for 'despesa'. */}
          {tipo === 'despesa' && (
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoria"
              className="p-2 border rounded-md w-full"
            />
          )}
        </div>
        <button
          type="submit"
          className={`w-full text-white font-bold py-2 px-4 rounded-md transition duration-300 ${corBotao}`}
        >
          {titulo}
        </button>
      </form>
    </div>
  );
}

export default FormularioTransacao;