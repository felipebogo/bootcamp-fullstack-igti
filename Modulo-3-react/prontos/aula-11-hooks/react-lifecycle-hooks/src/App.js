import React, { useState, useEffect } from 'react';
import Toggle from './components/Toggle/Toggle';
import Users from './components/User/Users';

async function doFetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=rush&nat=br&results=10'
  );
  const json = await res.json();

  const users = json.results.map((item) => {
    const { name, picture, login } = item;

    return {
      id: login.uuid,
      name: name.first,
      picture: picture.large,
    };
  });

  return users;
}

export default function App() {
  const [showData, setShowData] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const users = await doFetchUsers();

      /**
       * Simulando atraso de 5
       * segundos na requisição
       */
      setTimeout(async () => {
        setUsers(users);
      }, 5000);
    };

    getItems();
  }, []);

  const handleToggle = (checked) => {
    setShowData(checked);
  };

  return (
    <div style={{ padding: '10px' }}>
      <h1>Abra o console!</h1>

      <div>
        <Toggle description="Exibir lista" onToggle={handleToggle} />
      </div>

      {showData && <Users users={users} />}
    </div>
  );
}
