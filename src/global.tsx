window.app={
  userInfo:null
};
window.onerror = function (message, url, line, column, error) {
  console.log(message, url, line, column, error);
}
window.addEventListener("unhandledrejection", event => {
  event.preventDefault();
  event.stopPropagation();

  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
export default {
  apiPrefix:'/api',
  tenantId: '000000', // 客户端id
  clientId: 'xxx', // 客户端id
  clientSecret: 'xxx_secret', // 客户端密钥
}
