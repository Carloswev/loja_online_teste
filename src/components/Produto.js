import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Substitua a URL pela URL da sua API
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduto(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar o produto.</p>;

  return (
    <div className="produto">
      {produto ? (
        <div>
          <h1>{produto.title}</h1>
          <img src={produto.image} alt={produto.title} />
          <p>Preço: R$ {(produto.price || 0).toFixed(2)}</p>
          <p>{produto.description}</p>
          <button>Comprar</button>
        </div>
      ) : (
        <p>Produto não encontrado</p>
      )}
    </div>
  );
}

export default Produto;
