import axios from "axios";

const BASE_URL = "http://localhost:8080";

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  login: (data) => axios.post(`${BASE_URL}/auth/login`, data).then(r => r.data),
  register: (data) => axios.post(`${BASE_URL}/api/users`, data).then(r => r.data),

  // Wallet
  createWallet: (userId) => client.post(`/api/wallet/create/${userId}`).then(r => r.data),
  getBalance: (userId) => client.get(`/api/wallet/balance/${userId}`).then(r => r.data),
  deposit: (userId, amount) => client.post(`/api/wallet/deposit?userId=${userId}&amount=${amount}`).then(r => r.data),
  transfer: (fromUserId, toUserId, amount) => client.post(`/api/wallet/transfer?fromUserId=${fromUserId}&toUserId=${toUserId}&amount=${amount}`).then(r => r.data),

  // Transactions
  getTransactions: (userId) => client.get(`/api/transactions/user/${userId}`).then(r => r.data),

  // Users
  getUser: (id) => client.get(`/api/users/${id}`).then(r => r.data),
};


getUserByUsername: (username) =>
  client.get(`/api/users/username/${username}`).then(r => r.data)