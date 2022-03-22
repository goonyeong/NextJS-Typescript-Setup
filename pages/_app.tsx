import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import Layout from "../components/layout";
import GlobalStyle from "../styles/globalStyles";
import GlobalFont from "../styles/globalFonts";
import Seo from "../components/seo";
import { useEffect, useState } from "react";
import { rootStore, StoreProvider, useStore } from "../shared/Store";
import { observer } from "mobx-react-lite";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeStore } = useStore();

  useEffect(() => {
    const reHydrate = async () => {
      // await trunk.init();
    };
    reHydrate();

    console.log(themeStore.theme);
  }, []);

  return (
    <>
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
    </>
  );
}

export default observer(MyApp);
