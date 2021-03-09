const qiniu = require('qiniu');


const _getConf = () => {
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    //config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    config.useHttpsDomain = false;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;
  }
/**
 * 上传服务器本地文件，直接指定文件的完整路径即可上传
 * uploadToken：获取的七牛云token
 * key：存储在七牛云中的名称。例如：key = new Date().getTime()
 * localFile：本地文件的路径。例如：localFile=`g:\github_pro\zero2One\imgGenerate\server`
 * success: 成功回调
 * fail：失败回调
 */
const uploadFile = (uploadToken, localFile) => {
    return new Promise((resolve, reject) => {
        const key = new Date().getTime();
        const formUploader = new qiniu.form_up.FormUploader(_getConf());
        const putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
                reject(respErr)
                // fail && fail(respErr)
            } else {
                resolve({respInfo, respBody})
                // success && success(respInfo, respBody)
            }
        })
    })
    
}

module.exports = {
    uploadFile
}