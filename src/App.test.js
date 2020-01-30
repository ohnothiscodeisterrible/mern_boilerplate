import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Users from '../api/models/users'

test('unit test users functions', () => {
  let allUsers = new Users();

  allUsers.deleteAllUsers((error, result)=>{
    allUsers.getAllUsers((error1, result1)=>{
      let data = JSON.parse(result1);
      expect(data.length).toBe(0);

      allUsers.addUser(2, (error2,result2)=>{
        expect(error2 !== null).toBe(true);
      });
      allUsers.addUser('', (error2,result2)=>{
        expect(error2 !== null).toBe(true);
      });
      allUsers.addUser('new user 1', (error2, result2)=>{
        expect(result2).toBe(true);
        allUsers.getUserByUsername('new user 3', (error3, result3)=>{
          allUsers.removeUser(result3.id, (error4, result4)=>{
            expect(error4 === null && result4).toBe(true);
          });
        });
      });
      allUsers.addUser('new user 2', (error2, result2)=>{
        expect(result2).toBe(true);
      });
      allUsers.addUser('new user 3', (error2, result2)=>{
        expect(result2).toBe(true);
      });

      allUsers.removeUser(-1, (error2,result2)=>{
        expect(error2 !== null).toBe(true);
      });

    });
  });

});
