export interface IConfigurations {
  twitch: {
    clientId: string
    token: string
  }
}

export const configurations = (): IConfigurations => ({
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    token: process.env.TWITCH_TOKEN
  }
})
