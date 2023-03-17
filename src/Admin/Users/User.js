import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { getUsers } from '../service/admin-fetch.service';

export const  User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      const getAllUsers = async () => {
        const {users} = await getUsers();
        setUsers(users);
      }
      getAllUsers();
  }, [])
  return (
    <div style={{padding: '60px'}}>
        <Table striped  hover>
        <thead>
            <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
           {
            users?.map(({id, firstname, lastname}, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{firstname}</td>
                <td>{lastname}</td>
              </tr>
            ))
           }
        </tbody>
    </Table>
    </div>
  );
}