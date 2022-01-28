import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { IUser } from '../components/UsersList';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import './App.scss';

import UsersList from '../components/UsersList';
import Sort from '../components/Sort';
import UserForm from '../components/UserForm';


const App: FC = () => {

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {

    getUsers()

  }, [])

  async function getUsers() {
    setLoading(true)
    try {
      const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
      setLoading(false)
      setUsers(response.data)
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const sortByCity = () => {
    const sortUsers = users.sort((a, b) => a.address.city > b.address.city ? 1 : -1)
    setUsers([...sortUsers])
  }

  const sortByCompany = () => {
    const sortUsers = users.sort((a, b) => a.company.name > b.company.name ? 1 : -1)
    setUsers([...sortUsers])
  }



  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="App-main container">
        <Routes>
          <Route path='/' element={
            <>
              <Sort sortByCity={sortByCity} sortByCompany={sortByCompany} />
              <UsersList users={users} loading={loading} />
            </>
          } />
          <Route path='/:id' element={
            <>
              <Sort sortByCity={sortByCity} sortByCompany={sortByCompany} />
              <UserForm />
            </>
          } />


          {/* <Route path='/' element={<UsersList users={users} loading={loading} />} /> */}

        </Routes>
        {/* <UsersList users={users} loading={loading} /> */}
      </main>
      <footer className="App-footer">

      </footer>

    </div>
  );
}

export default App;
