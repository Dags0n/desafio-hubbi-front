import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { getAllItems } from '../utils/rotasBack';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const HomePage: React.FC = () => {
  const [vendas, setVendas] = useState<any[]>([]);
  const [compras, setCompras] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const vendasData = await getAllItems('vendas');
    const comprasData = await getAllItems('compras');
    const produtosData = await getAllItems('produtos');

    setVendas(vendasData);
    setCompras(comprasData);
    setProdutos(produtosData);
    setLoading(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6">Carregando dados...</Typography>
      </Container>
    );
  }

  const totalVendas = vendas.length;
  const totalCompras = compras.length;
  const vendasPendentes = vendas.filter(v => v.status === 'PENDENTE').length;
  const totalProdutos = produtos.length;

  const vendasPorData = vendas.reduce((acc: any, venda) => {
    const data = new Date(venda.date).toLocaleDateString();
    acc[data] = (acc[data] || 0) + 1;
    return acc;
  }, {});

  const comprasPorData = compras.reduce((acc: any, compra) => {
    const data = new Date(compra.data).toLocaleDateString();
    acc[data] = (acc[data] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(vendasPorData),
    datasets: [
      {
        label: 'Vendas',
        data: Object.values(vendasPorData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Compras',
        data: Object.values(comprasPorData),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Gerenciamento
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total de Vendas</Typography>
            <Typography variant="h4">{totalVendas}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total de Compras</Typography>
            <Typography variant="h4">{totalCompras}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Vendas Pendentes</Typography>
            <Typography variant="h4">{vendasPendentes}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Produtos no Estoque</Typography>
            <Typography variant="h4">{totalProdutos}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vendas e Compras Recentes
            </Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
