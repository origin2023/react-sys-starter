import { history } from 'umi';
import { notification } from 'antd';
import globalSetting from './global';
import { Base64 } from 'js-base64';

const authHeaderInterceptor = (url: string, options: any) => {
  let userInfo: any = null;
  try {
    //console.log('从本地缓存获取useInfo');
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  } catch (e) {
    console.warn('本地用户信息缓存格式错误!');
    userInfo = null;
  }
  const authHeader = {
    ...options.headers,
    Authorization: `Basic ${Base64.encode(
      `${globalSetting.clientId}:${globalSetting.clientSecret}`,
    )}`,
  };
  if (userInfo) {
    authHeader['Origin-Auth'] = `bearer ${userInfo.access_token}`;
  }
  return {
    url: `${options.prefix !== undefined ? options.prefix : '/api'}${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
const responseInterceptors = async (response: Response, options: any) => {
  return response;
};
const errorHandler = async (error) => {
  console.log('error:', error);
  if (!error.response) {
    notification.error({
      message: `请求错误`,
      description: error.toString().replace(/BizError:/g, ''),
    });
    return error;
  }

  const { response = {} } = error;
  // console.log('response:',response);
  const data = await response?.clone?.()?.json?.();

  if (response.status === 401) {
    if (window.location.hash.endsWith('/login')) {
      return false;
    }
    history.push('/login');
  } else if (response.status !== 200) {
    notification.error({
      message: `请求错误`,
      description:
        data?.msg ||
        data?.error_description ||
        data?.errorMessage ||
        response?.statusText ||
        response?.msg,
    });
  }
  //console.log('data:',data);
  return data;
};
export const request = {
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.success,
        errorMessage: resData.msg,
      };
    },
  },
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
};
