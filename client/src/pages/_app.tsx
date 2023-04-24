import { type AppType } from "next/app";

import { api } from "../utils/api";
import "../styles/globals.css";
import AppProvider from "../components/providers/AppProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default api.withTRPC(MyApp);
