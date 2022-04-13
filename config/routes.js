export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/hello' },
      { path: '/hello', component: '@/pages/HELLO' },
    ],
  },
];
