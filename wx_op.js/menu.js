const axios = require('axios');

// 创建菜单
const createMenu = (access_token, menu) => {
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
  const { data } = await axios.post(url, menu);
  return data;
};

module.exports = {
  createMenu
};


// 测试数据
{
     "button":[
     {    
          "type":"click",
          "name":"今日歌曲",
          "key":"V1001_TODAY_MUSIC"
      },
      {
           "name":"菜单",
           "sub_button":[
           {    
               "type":"view",
               "name":"搜索",
               "url":"http://www.baidu.com/"
            },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
       }]
 }
