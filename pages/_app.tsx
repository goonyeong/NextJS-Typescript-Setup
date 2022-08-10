// React & Next
import { useEffect } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Style
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyle from "styles/globalStyles";
import GlobalFont from "styles/globalFonts";
// Mobx
import { observer } from "mobx-react-lite";
import { rootStore, StoreProvider, useStore } from "store";
import { AsyncTrunk } from "mobx-sync";
// Components
import Layout from "components/layout";
import Seo from "components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeStore } = useStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    const reHydrate = async () => {
      if (typeof window !== "undefined") {
        const trunk = new AsyncTrunk(rootStore, {
          storage: localStorage,
        });
        await trunk.init();
      }
    };
    reHydrate();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StoreProvider value={rootStore}>
            <ThemeProvider
              theme={themeStore.theme === "light" ? lightTheme : darkTheme}
            >
              <GlobalFont />
              <GlobalStyle />
              <Layout>
                <Seo title="Next app" />
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StoreProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default observer(MyApp);
