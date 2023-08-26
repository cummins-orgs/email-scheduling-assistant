module.exports = {
  env: {
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    GOOGLE_CALENDAR_API_KEY: process.env.GOOGLE_CALENDAR_API_KEY,
    GPT3_API_KEY: process.env.GPT3_API_KEY,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};