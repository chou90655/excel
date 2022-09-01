import mqtt from 'mqtt'
export default {
  subscription: { topic: 'topic/mqttx', qos: 0 },
  publish: {
    topic: 'topic/browser',
    qos: 0,
    payload: '{ "msg": "Hello, I am browser." }'
  },
  receiveNews: '',
  qosList: [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 }
  ],
  subscribeSuccess: false,
  init() {
    const options = {
      host: 'broker.emqx.io',
      port: 8083,
      endpoint: '/mqtt',
      clean: true, // 保留会话
      connectTimeout: 4000, // 超时时间
      reconnectPeriod: 4000, // 重连时间间隔
      // 认证信息
      clientId: 'mqttjs_3be2c321',
      username: 'emqx_test',
      password: 'emqx_test'
    }
    this.client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', options)
    this.client.on('connect', e => {
      console.log(this.qosList, 999)
      console.log('Connection successed:', e)
    })
    this.client.on('error', error => {
      console.log('Connection failed', error)
    })
    this.client.on('message', (topic, message) => {
      console.log(`Received message ${message} from topic ${topic}`)
    })
  }
}
