export default {
  port: process.env.PORT ?? 4000,
  host: process.env.HOST ?? "localhost",
  nodeEnv: process.env.NODE_ENV ?? "",
  whiteListedOrigin: process.env.WHITE_LISTED_ORIGIN ?? "http://localhost:3000",
};
