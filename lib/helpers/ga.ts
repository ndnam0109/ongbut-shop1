import { AnalyticConfig } from "../repo/shop-config.repo";

export const pageview = (url) => {
  const config = sessionStorage.getItem("analyticConfig");
  const analyticConfig: AnalyticConfig = config ? JSON.parse(config) : null;
  if ((window as any).gtag && analyticConfig?.googleAnalytic) {
    (window as any).gtag("config", analyticConfig.googleAnalytic, {
      page_path: url,
    });
  }
};
