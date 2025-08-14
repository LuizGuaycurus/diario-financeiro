function ListaTransacoes({titulo, itens, tipo, onDeletar}) {
    const corValor = tipo === 'receita' ? 'text-green-600' : 'text-red-600';
    const simbolo = tipo ==='receita' ? '+' : '-';

    return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
      <ul className="space-y-3">
        {itens.length > 0 ? (
          itens.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <span>{item.descricao}</span>
                {/* Mostra a categoria apenas se for uma despesa */}
                {tipo === 'despesa' && (
                  <span className="text-sm text-slate-500 block">{item.categoria}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-semibold ${corValor}`}>
                  {simbolo} R$ {item.valor.toFixed(2)}
                </span>
                {/* Botão de Deletar */}
                <button
                  onClick={() => onDeletar(item.id, tipo)}
                  className="bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 font-bold py-1 px-2 rounded-full text-xs transition duration-300"
                  aria-label={`Deletar ${item.descricao}`}
                >
                  X
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-slate-500">Nenhuma transação cadastrada.</p>
        )}
      </ul>
    </div>
  );
}

export default ListaTransacoes;
