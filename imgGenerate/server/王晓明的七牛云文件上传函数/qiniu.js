/**
 * @date: 2019/11/28 10:00 上午
 * @author: Geek
 */

import qiniu from 'qiniu'
import config from '../../config/config'

class Qiniu {

  constructor(bucket=config.qiniu.bucket) {
    this.accessKey = config.qiniu.AK
    this.secretKey = config.qiniu.SK
    this.bucket = config.qiniu.bucket
    // 创建各种上传凭证之前，需要定义好其中鉴权对象mac
    this.mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
  }

  _getConf () {
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    //config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    config.useHttpsDomain = false;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;
  }

  // 构建上传策略函数
  // keyToOverwrite: 想进行覆盖的文件名称，这个文件名称同时可是客户端上传代码中指定的文件名，两者必须一致。
  getUpToken (keyToOverwrite = null) {
    const options = {
      scope: keyToOverwrite ? this.bucket + ":" + keyToOverwrite : this.bucket,
      expires: config.qiniu.expires
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(this.mac);
    return uploadToken
  }

  // 上传本地文件，直接指定文件的完整路径即可上传
  uploadFile (uploadToken, key, localFile, success, fail) {
    const formUploader = new qiniu.form_up.FormUploader(this._getConf());
    const putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          fail && fail(respErr)
        } else {
          success && success(respInfo, respBody)
        }
      })
  }

  // 将内存中的字节数组上传到空间中
  uploadBuffer (uploadToken, key, buffer, success, fail) {
    const formUploader = new qiniu.form_up.FormUploader(this._getConf());
    const putExtra = new qiniu.form_up.PutExtra();
    formUploader.put(uploadToken, key, buffer, putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          fail && fail(respErr)
        } else {
          success && success(respInfo, respBody)
        }
      });
  }

  // 文件分片上传（断点续传）
  resumeUploadFile (uploadToken, key, localFile, success, fail) {
    const resumeUploader = new qiniu.resume_up.ResumeUploader(this._getConf());
    const putExtra = new qiniu.resume_up.PutExtra();
    // 扩展参数
    putExtra.params = {
      // "x:name": "",
      // "x:age": 27,
    }
    putExtra.fname = key;
    // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
    // ???
    putExtra.resumeRecordFile = 'progress.log';
    // 文件分片上传
    resumeUploader.putFile(uploadToken, key, localFile, putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          fail && fail(respErr)
        } else {
          success && success(respInfo, respBody)
        }
      });
  }

  // 数据流上传
  // readableStream: 可读的流
  uploadStream (uploadToken, key, readableStream, success, fail) {
    const formUploader = new qiniu.form_up.FormUploader(this._getConf());
    const putExtra = new qiniu.form_up.PutExtra();
    formUploader.putStream(uploadToken, key, readableStream, putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          fail && fail(respErr)
        } else {
          success && success(respInfo, respBody)
        }
      })
  }
}

export {
  Qiniu
}
