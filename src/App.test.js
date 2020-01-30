import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Users from '../api/models/users'

test('unit test users functions', () => {
  let allUsers = new Users();

  allUsers.getAllUsers((data)=>{
    data = JSON.parse(data);
    //expect(data.length).toBe(2);
  });

  expect(()=>{ allUsers.addUser(2, x=>{}); }).toThrow(Error);
  expect(()=>{ allUsers.addUser('', x=>{}); }).toThrow(Error);
  allUsers.addUser('new user1', (data)=>{
    expect(data).toBe(true);
  });

  //expect(()=>{ allUsers.removeUser(-1, x=>{}); }).toThrow(Error);
});
