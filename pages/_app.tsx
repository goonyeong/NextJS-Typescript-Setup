// React & Next
import { useEffect } from "react";
import type { AppProps } from "next/app";
// Style
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyle from "styles/globalStyles";
import GlobalFont from "styles/globalFonts";
// Mobx
import { observer } from "mobx-react-lite";
import { rootStore, StoreProvider, useStore } from "shared/store";
import { AsyncTrunk } from "mobx-sync";
// Components
import Layout from "components/layout";
import Seo from "components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeStore } = useStore();

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
