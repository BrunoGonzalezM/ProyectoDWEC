import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';
import fondo from '../IMG/loginFondo.jpg';
import "../styles/styleLogin.css"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Error al intentar iniciar sesión');
      }

      const users = await response.json();
      const usuarioAutenticado = users.find(user => user.email === email && user.address.zipcode === password);

      if (usuarioAutenticado) {
        console.log('Inicio de sesión exitoso');
        navigate('/inicio');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error);
      alert('Error al intentar iniciar sesión');
    }
  };

  return (
    <Flex
      h="100vh"
      bgImage={`url(${fondo})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {/* Contenido del formulario */}
      <Flex
        p="20px"
        backgroundColor="rgba(0, 0, 0, 0.9)"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={e => {
          e.preventDefault();
          handleLogin();
        }} style={{ textAlign: 'center' }}
        >
          <div class="login wrap">
            <div class="h1">Login</div>
            <input onChange={e => setEmail(e.target.value)} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" />
            <input placeholder="password" id="password" name="password" onChange={e => setPassword(e.target.value)} type="password" />
            <input value="Login" class="btn" type="submit" />
          </div>
          {/* <Box color="white">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Box>
          <Box color="white">
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Box>
          <Button type="submit" className="btn btn-primary" marginY="25px">ACCESO</Button> */}
        </form>

      </Flex>
    </Flex>
  );
};

export default Login;
