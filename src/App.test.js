import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Todo from '../api/models/todo'

test('unit test todo list functions', () => {
  let todo = new Todo();
	
	expect(todo.getAllItems().length).toBe(2);
	
	expect(()=>{ todo.addItem(2) }).toThrow(Error);
	expect(todo.addItem('test item')).toBe(undefined);
	
	expect(()=>{ todo.removeItem(3) }).toThrow(Error);
	expect(todo.removeItem(2)).toBe(undefined);
	
	expect(todo.getAllItems().length).toBe(2);
});
