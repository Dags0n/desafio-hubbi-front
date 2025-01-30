import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { createItem, getAllItems, deleteItem } from '../utils/rotasBack';
import { IProduto } from '../interfaces';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

const ProdutosPage: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState<number>(0);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const data = await getAllItems('produtos');
    setProdutos(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && parseFloat(preco) > 0 && estoque >= 0) {
      await createItem('produtos', { nome, preco, estoque });
      setNome('');
      setPreco('');
      setEstoque(0);
      carregarProdutos();
      toast.success('Produto adicionado com sucesso');
    } else {
      toast.warn('Preencha todos os campos corretamente');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem('produtos', id);
      carregarProdutos();
      toast.success('Produto deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar produto');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Produtos
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Estoque"
            variant="outlined"
            fullWidth
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)' }}>
            Adicionar Produto
          </Button>
        </form>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Preço</strong></TableCell>
              <TableCell><strong>Estoque</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.preco}</TableCell>
                <TableCell>{produto.estoque}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(produto.id)} sx={{ color: 'black' }}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProdutosPage;
