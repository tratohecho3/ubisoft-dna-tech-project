export default () => ({
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    token: process.env.TWITCH_TOKEN
  },
  pubnub: {
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    secretKey: process.env.PUBNUB_SECRET_KEY
  }
})
