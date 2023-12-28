// server.test.js
const request = require('supertest');
const app = require('./server');

describe('POST /submitForm', () => {
  it('should return 400 if address is missing', async () => {
    const res = await request(app)
      .post('/submitForm')
      .send({
        name: 'aliasghar afzalabadi',
        email: 'aliasgharafzalabadi@gmail.com',
        phone: '1234567890',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual('Address is required');
  });

  it('should return 400 if phone number is invalid', async () => {
    const res = await request(app)
      .post('/submitForm')
      .send({
        name: 'aliasghar afzalabadi',
        email: 'aliasgharafzalabadi@gmail.com',
        address: '123 Main St',
        phone: '1234',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.message).toEqual('Invalid phone number');
  });

  it('should return 200 if form is valid', async () => {
    const res = await request(app)
      .post('/submitForm')
      .send({
        name: 'aliasghar afzalabadi',
        email: 'aliasgharafzalabadi@gmail.com',
        address: '123 Main St',
        phone: '1234567890',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual('Form submitted successfully');
  });
});

// Form.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('renders form with required fields', () => {
  const { getByLabelText } = render(<Form />);
  const nameInput = getByLabelText(/name/i);
  const emailInput = getByLabelText(/e-mail/i);
  const phoneInput = getByLabelText(/phone number/i);
  expect(nameInput).toBeRequired();
  expect(emailInput).toBeRequired();
  expect(phoneInput).toBeRequired();
});

test('displays error message if name is missing', () => {
  const { getByLabelText, getByText } = render(<Form />);
  const emailInput = getByLabelText(/e-mail/i);
  const phoneInput = getByLabelText(/phone number/i);
  const submitButton = getByText(/submit/i);
  fireEvent.change(emailInput, { target: { value: 'aliasgharafzalabadi@gmail.com' } });
  fireEvent.change(phoneInput, { target: { value: '09106802815' } });
  fireEvent.click(submitButton);
  expect(getByText(/please enter your name/i)).toBeInTheDocument();
});

test('displays error message if email is invalid', () => {
  const { getByLabelText, getByText } = render(<Form />);
  const nameInput = getByLabelText(/name/i);
  const emailInput = getByLabelText(/e-mail/i);
  const phoneInput = getByLabelText(/phone number/i);
  const submitButton = getByText(/submit/i);
  fireEvent.change(nameInput, { target: { value: 'aliasghar afzalabadi' } });
  fireEvent.change(emailInput, { target: { value: 'aliasgharafzalabadi@gmail.com' } });
  fireEvent.change(phoneInput, { target: { value: '09106802815' } });
  fireEvent.click(submitButton);
  expect(getByText(/please enter a valid email address/i)).toBeInTheDocument();
});