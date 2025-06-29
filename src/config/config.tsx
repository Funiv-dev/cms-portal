const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  apiTimeout: 5000,
  apiToken: "your-api-token",
};

export default function getConfig() {
  return config;
}