// const users = [
//   {
//     id: '410544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'User',
//     email: 'user@nextmail.com',
//     password: '123456',
//   },
// ];

const users = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: '123456',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    password: '123456',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    password: '123456',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    password: '123456',
  },
];

const tasks = [
  {
    user_id: users[0].id,
    title: 'Task1',
    status: 'pending',
    date: '2022-12-06',
  },
  {
    user_id: users[1].id,
    title: 'Task1',
    status: 'pending',
    date: '2022-11-14',
  },
  {
    user_id: users[4].id,
    title: 'Task1',
    status: 'completed',
    date: '2022-10-29',
  },
  {
    user_id: users[3].id,
    title: 'Task1',
    status: 'completed',
    date: '2023-09-10',
  },
  {
    user_id: users[5].id,
    title: 'Task1',
    status: 'pending',
    date: '2023-08-05',
  },
  {
    user_id: users[2].id,
    title: 'Task1',
    status: 'pending',
    date: '2023-07-16',
  },
  {
    user_id: users[0].id,
    title: 'Task2',
    status: 'pending',
    date: '2023-06-27',
  },
  {
    user_id: users[3].id,
    title: 'Task2',
    status: 'completed',
    date: '2023-06-09',
  },
  {
    user_id: users[4].id,
    title: 'Task2',
    status: 'completed',
    date: '2023-06-17',
  },
  {
    user_id: users[5].id,
    title: 'Task2',
    status: 'completed',
    date: '2023-06-07',
  },
  {
    user_id: users[1].id,
    title: 'Task2',
    status: 'completed',
    date: '2023-08-19',
  },
  {
    user_id: users[5].id,
    title: 'Task3',
    status: 'completed',
    date: '2023-06-03',
  },
  {
    user_id: users[2].id,
    title: 'Task2',
    status: 'completed',
    date: '2022-06-05',
  },
];

export { users, tasks };