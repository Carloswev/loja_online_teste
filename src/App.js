import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/index.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/products')  // Usando a URL relativa ao invés da URL completa
      .then(response => {
        console.log(response.data); // Verifique a estrutura dos dados
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <header>
        <div className="logo">Loja Online</div>
        <div className="search-bar">
          <input type="text" placeholder="Buscar produtos..." />
        </div>
        <div className="cart">
          <span role="img" aria-label="cart">🛒</span> Carrinho
        </div>
      </header>
      <div className="main-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1>Bem-vindo à Loja Online</h1>
                <div className="products-container">
                  {loading ? (
                    <p>Carregando produtos...</p>
                  ) : (
                    produtos.length > 0 ? (
                      produtos.slice(0, 8).map(produto => (
                        <div key={produto.id} className="product-card">
                          <img src={produto.image} alt={produto.title} />
                          <h3>{produto.title}</h3>
                          <p>Preço: R$ {(produto.price || 0).toFixed(2)}</p>
                          <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
                          <button>Comprar</button>
                        </div>
                      ))
                    ) : (
                      <p>Nenhum produto encontrado</p>
                    )
                  )}
                </div>
                <div className="view-more">
                  <Link to="/produtos">Ver mais produtos</Link>
                </div>
              </div>
            } 
          />
          <Route 
            path="/produtos" 
            element={
              <div>
                <h1>Todos os Produtos</h1>
                <div className="products-container">
                  {loading ? (
                    <p>Carregando produtos...</p>
                  ) : (
                    produtos.length > 0 ? (
                      produtos.map(produto => (
                        <div key={produto.id} className="product-card">
                          <img src={produto.image} alt={produto.title} />
                          <h3>{produto.title}</h3>
                          <p>Preço: R$ {(produto.price || 0).toFixed(2)}</p>
                          <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
                          <button>Comprar</button>
                        </div>
                      ))
                    ) : (
                      <p>Nenhum produto encontrado</p>
                    )
                  )}
                </div>
              </div>
            } 
          />
          <Route 
            path="/produto/:id" 
            element={<div>Detalhes do Produto</div>} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
