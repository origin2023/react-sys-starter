import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  proxy: proxy[REACT_APP_ENV || 'dev'],
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/public/',
  history: {
    type: 'hash',
  },
  routes,
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
});
