import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, InputLabel, MenuItem } from '@mui/material';
import { createItem, getAllItems } from '../utils/rotasBack';
import { IItem, IVenda, IProduto } from '../interfaces';
import { toast } from 'react-toastify';
import { Delete } from '@mui/icons-material';

const useVendas = () => {
  const [vendas, setVendas] = useState<IVenda[]>([]);
  const carregarVendas = async () => {
    const data = await getAllItems('vendas');
    setVendas(data);
  };
  return { vendas, carregarVendas };
};

const useProdutos = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const carregarProdutos = async () => {
    const data = await getAllItems('produtos');
    setProdutos(data);
  };
  return { produtos, carregarProdutos };
};

const VendasPage: React.FC = () => {
  const { vendas, carregarVendas } = useVendas();
  const { produtos, carregarProdutos } = useProdutos();
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [status, setStatus] = useState('PENDENTE');
  const [itens, setItens] = useState<IItem[]>([]);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [precoTotal, setPrecoTotal] = useState('');
  const [produtoId, setProdutoId] = useState<number>(0);

  useEffect(() => {
    carregarVendas();
    carregarProdutos();
  }, []);

  const handleAddItem = () => {
    if (produtoId > 0 && quantidade > 0 && parseFloat(precoTotal) > 0) {
      const novoItem: IItem = { produto: produtoId, quantidade, precoTotal };
      const novosItens = [...itens, novoItem];
      setItens(novosItens);
      setValorTotal(novosItens.reduce((total, item) => total + parseFloat(item.precoTotal), 0));
      setProdutoId(0);
      setQuantidade(1);
      setPrecoTotal('');
      toast.success('Produto adicionado ao carrinho');
    } else {
      toast.warn('Preencha todos os campos corretamente');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length > 0 && status.trim()) {
      const venda = { valorTotal, itens, status };
      await createItem('vendas', venda);
      setItens([]);
      setValorTotal(0);
      setStatus('PENDENTE');
      carregarVendas();
      toast.success('Venda criada com sucesso');
    } else {
      toast.warn('Você precisa adicionar produtos primeiro');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await createItem('vendas', id);
      carregarVendas();
      toast.success('Venda deletada com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar venda');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Vendas
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel id="produto-label">Produto</InputLabel>
          <Select
            labelId="produto-label"
            id="produto"
            value={produtoId}
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
            label="Preço Total dos Produtos"
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
            onClick={handleAddItem}
            sx={{ width: '50%', background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)', alignSelf: 'center', mb: 2 }}
          >
            {itens.length > 0 ? 'Adicionar Outro Produto' : 'Adicionar Produto ao carrinho'}
          </Button>

          <InputLabel id="status-venda-label">Status da Venda</InputLabel>
          <Select
            labelId="status-venda-label"
            id="status-venda"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 3 }}
          >
            <MenuItem value="PENDENTE">Pendente</MenuItem>
            <MenuItem value="CONCLUIDA">Concluído</MenuItem>
            <MenuItem value="CANCELADA">Cancelado</MenuItem>
          </Select>

          <Button type="submit" variant="contained" fullWidth sx={{ background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)' }}>
            Criar Venda
          </Button>
        </form>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Valor Total</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendas.map((venda) => (
              <TableRow key={venda.id}>
                <TableCell>{venda.id}</TableCell>
                <TableCell>{venda.valorTotal}</TableCell>
                <TableCell>{venda.status}</TableCell>
                <TableCell>{venda.date}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(venda.id)} sx={{ color: 'black' }}>
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

export default VendasPage;