import { request } from 'umi';

/**
 *  等待
 * @param {number} seconds 等待的秒数
 * @returns
 */
export function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
/**
 * 下载
 * @param {Object} option 必填,接受一个对象参数,该对象包含 data,url,name
 * @param {Object} option.data 必填,下载接口所需的请求参数
 * @param {string} option.url 必填,下载接口地址
 * @param {string=} option.name 可选参数,文件名,不传此参数则从response header中提取
 */
export function download({ data, url, name }) {
  request(url, { method: 'get', params: data, responseType: 'blob' }).then(
    (response) => {
      const { blob, fileName } = response;
      const blobData = new Blob([blob]);
      const objectURL = URL.createObjectURL(blobData);
      let btn = document.createElement('a');
      btn.download = name || fileName;
      btn.href = objectURL;
      btn.click();
      URL.revokeObjectURL(objectURL);
      btn = null;
    },
  );
}
