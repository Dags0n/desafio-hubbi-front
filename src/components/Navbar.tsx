import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  Container,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import HubbiSVG from '../assets/hubbi.svg';

interface Props {
  children?: React.ReactNode;
}

const NavItem: React.FC<{ to: string; label: string; icon: string }> = ({ to, label, icon }) => (
  <NavLink 
    to={to}
    style={({ isActive }) => ({
      textDecoration: 'none',
      color: 'white',
      backgroundColor: isActive ? '#1E40AF' : 'transparent',
      borderRadius: '15px',
      transition: 'background-color ease-in 0.1s',
    })}    
  >
    {icon && icon.trim() !== ''
      ? <img src={icon} alt={label} style={{ padding: 8 }} /> 
      : <Typography variant="h6" fontFamily="Inter" fontSize={18} padding={1}>{label}</Typography>
    }
  </NavLink>
);

const Navbar: React.FC<Props> = (props) => {
  return (
    <>
      <CssBaseline />
        <AppBar
          sx={{
            background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)'
          }}
        >
          <Toolbar 
            sx={{
              justifyContent: { xs: 'space-between', sm: 'normal' },
              gap: '1rem',
            }}
          >
            <NavItem to="/" label={''} icon={HubbiSVG} />
            <NavItem to="/produtos" label="Produtos" icon={''} />
            <NavItem to="/vendas" label="Vendas" icon={''} />
            <NavItem to="/compras" label="Compras" icon={''} />
          </Toolbar>
        </AppBar>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>{props.children}</Box>
      </Container>
    </>
  );
};

export default Navbar;
