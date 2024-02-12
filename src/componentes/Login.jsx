import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error);
      alert('Error al intentar iniciar sesión');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src="./IMG/logopng.png" alt="logo" />
          <h2 className="mb-4">Login a la página Blog.html</h2>
          <form onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;