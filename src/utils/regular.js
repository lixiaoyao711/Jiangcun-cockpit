// 验证常用的设备
export function regMobile(type, str = navigator.userAgent) {
  let rule = {
    mobile: /AppleWebKit.*(Mobile|MQQBrowser)+/, // 移动端
    ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/, // ios
    iphone: /.*iPhone.*/, // iPhone
    android: /(.*Linux+.*Android+.*)|(.*Android+.*Linux+.*)/, // Android
    weibo: /.*Weibo.*/, // 微博

    wechat: /.*(MicroMessenger|micromessenger)+.*/, // 微信
    pcwechat: /.*WindowsWechat+.*/, // 微信
    dingtalk: /.*DingTalk.*/, // 钉钉
    Alipay: /.*Alipay.*/, // 支付宝
    AliApp: /.*AliApp.*/, // 阿里系APP webview
    chrome: /.*(Chrome)\/([\w.]+).*/, // chrome
    lark: /.*Lark.*/, // 飞书 Lark
    // pc端
    dingtalkWin: /.*dingtalk-win.*/, // 钉钉 windows
    ie: /.*Trident.*/, // IE内核
    opera: /.*Presto.*/, // opera内核
    webKit: /.*AppleWebKit.*/, // 苹果、谷歌内核
  };
  return rule[type].test(str.trim());
}

// 自定义校验规则
export var checkPhone = (rule, value, cb) => {
  //验证手机号是否合法
  const regChinese = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (regChinese.test(value)) {
    return true
  }
  return false
};
