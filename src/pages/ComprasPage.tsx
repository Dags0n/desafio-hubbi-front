import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Select, MenuItem } from '@mui/material';
import { createItem, getAllItems, deleteItem } from '../utils/rotasBack';
import { IVenda, IItem, IProduto, ICompra } from '../interfaces';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

const ComprasPage: React.FC = () => {
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [itens, setItens] = useState<IItem[]>([]);
  const [compras, setCompras] = useState<ICompra[]>([]);
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [precoTotal, setPrecoTotal] = useState('');
  const [vendaId, setVendaId] = useState<number>(0);
  const [vendas, setVendas] = useState<IVenda[]>([]);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    carregarCompras();
    carregarVendas();
    carregarProdutos();
  }, []);

  const carregarCompras = async () => {
    const data = await getAllItems('compras');
    setCompras(data);
  };

  const carregarVendas = async () => {
    const data = await getAllItems('vendas');
    setVendas(data);
  }

  const carregarProdutos = async () => {
    const data = await getAllItems('produtos');
    setProdutos(data);
  };

  const handleAddItem = () => {
    if (produtoId > 0 && quantidade > 0 && parseFloat(precoTotal) > 0) {
      const novoItem: IItem = { produto: produtoId, quantidade, precoTotal };
      const novosItens = [...itens, novoItem];
      setItens(novosItens);

      const novoValorTotal = novosItens.reduce((total, item) => total + parseFloat(item.precoTotal), 0);
      setValorTotal(novoValorTotal);

      setProdutoId(0);
      setQuantidade(1);
      setPrecoTotal('');
      toast.success('Produto adicionado ao carrinho');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length > 0) {
      const compra = { valorTotal, itens, venda: vendaId };
      console.log(compra);
      await createItem('compras', compra);
      setItens([]);
      setValorTotal(0);
      carregarCompras();
      toast.success('Compra realizada com sucesso');
    } else {
      toast.warn('Adicione produtos ao carrinho');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem('compras', id);
      carregarCompras();
    } catch (error) {
      toast.error('Erro ao deletar compra');
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Compras
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel id="produto-label">Produto</InputLabel>
          <Select
            labelId="produto-label"
            id="produto"
            value={produtoId}
            fullWidth
            onChange={(e) => setProdutoId(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            <MenuItem value={0}>Selecione um produto</MenuItem>
            {produtos.map((produto) => (
              <MenuItem key={produto.id} value={produto.id}>
                {produto.nome}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Quantidade"
            variant="outlined"
            fullWidth
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preço Total do Item"
            variant="outlined"
            fullWidth
            type="number"
            value={precoTotal}
            onChange={(e) => setPrecoTotal(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="button"
            variant="contained"
            sx={{ background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)', width: '50%', alignSelf: 'center' }}
            onClick={handleAddItem}
          >
            Adicionar Item
          </Button>

          <InputLabel id="venda-label" sx={{ mt: 2 }}>Venda</InputLabel>
          <Select
            labelId="venda-label"
            id="venda"
            value={vendaId}
            fullWidth
            onChange={(e) => setVendaId(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            <MenuItem value={0}>Selecione uma venda</MenuItem>
            {vendas.map((venda) => (
              <MenuItem key={venda.id} value={venda.id}>
                {venda.id}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)' }}>
            Criar Compra
          </Button>
        </form>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Venda</strong></TableCell>
              <TableCell><strong>Valor Total</strong></TableCell>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compras.map((compra) => (
              <TableRow key={compra.id}>
                <TableCell>{compra.id}</TableCell>
                <TableCell>{compra.venda.id}</TableCell>
                <TableCell>{compra.valorTotal}</TableCell>
                <TableCell>{compra.date}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(compra.id)} sx={{ color: 'black' }}>
                    <Delete/>
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

export default ComprasPage;
