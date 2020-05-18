import React from 'react';
import { Container } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button onPress={signOut}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
