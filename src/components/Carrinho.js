import React from 'react';

function Carrinho({ itens, removerDoCarrinho }) {
  const total = itens.reduce((acc, item) => acc + (item.price || 0), 0); 

  console.log(itens); // Verifique a estrutura dos dados

  return (
    <div className="carrinho">
      <h2>Carrinho de Compras</h2>
      {itens.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {itens.map((item) => (
              <li key={item.id} className="carrinho-item">
                <img src={item.image} alt={item.title} className="carrinho-item-img" />
                <div className="carrinho-item-info">
                  <h3>{item.title}</h3>
                  <p>Preço: R$ {(item.price || 0).toFixed(2)}</p> {}
                  <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
