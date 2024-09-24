// DashboardPage 
// Require Auth

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { Layoutprops } from '../interfaces/CompInterfaces';

import { StyledRoot, Main } from '../style.css';
import { Container } from '@radix-ui/themes';

const DashboardOutlet: React.FC<Layoutprops> = memo(() => {
  const token = useSelector(selectToken);

  return token ? (
    <StyledRoot>
      <Main>
        <Container>
          Smart Contract
        </Container>
        <Outlet />
      </Main>
    </StyledRoot>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
});

export default DashboardOutlet;
