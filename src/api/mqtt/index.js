import mqtt from 'mqtt'
export default {
    init() {
        let options = {
          username: "xxx",
          password: "xxxx",
          cleanSession : false,
          keepAlive:60,
          clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
          connectTimeout: 4000
        }
        this.client = mqtt.connect('ws://192.168.xxx.xx:8083/mqtt',options);
        this.client.on("connect", (e) => {
            console.log("成功连接服务器:",e);
        });
    }
}
connect() {
    let options = {
      username: "xxx",
      password: "xxxx",
      cleanSession : false,
      keepAlive:60,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      connectTimeout: 4000
    }
    this.client = mqtt.connect('ws://192.168.xxx.xx:8083/mqtt',options);
    this.client.on("connect", (e)=>{
      console.log("成功连接服务器:",e);
      //订阅三个名叫'top/#', 'three/#'和'#'的主题
      this.client.subscribe(['top/#', 'three/#', '#'], { qos: 1 }, (err)=> {
        if (!err) {
          console.log("订阅成功");
          //向主题叫“pubtop”发布一则内容为'hello,this is a nice day!'的消息
          this.publish("pubtop", 'hello,this is a nice day!')
        } else {
          console.log('消息订阅失败！')
        }
      });
    });
    //重新连接
    this.reconnect()
    //是否已经断开连接
    this.mqttError()
    //监听获取信息
    this.getMessage()
  }