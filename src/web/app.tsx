import { Route, Switch, useLocation } from "wouter";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { useEffect } from "react";
import { ModalProvider } from "./components/ModalContext";

import Home from "./pages/index";
import ProductsPage from "./pages/products";
import StitchingPage from "./pages/product/stitching-engine";
import KillSwitchPage from "./pages/product/kill-switch";
import ZombieDetectorPage from "./pages/product/zombie-detector";
import TaxLinkPage from "./pages/product/tax-link";
import CashFlowOraclePage from "./pages/product/cash-flow-oracle";
import PriceGuardianPage from "./pages/product/price-guardian";
import UseCasesPage from "./pages/use-cases";
import DevelopersPage from "./pages/developers";
import DocsPage from "./pages/developers/documentation";
import QuickstartPage from "./pages/developers/quickstart";
import SecurityPage from "./pages/developers/security";
import PrivacyPage from "./pages/legal/privacy";
import TermsPage from "./pages/legal/terms";
import GDPRPage from "./pages/legal/gdpr";
import CustomersPage from "./pages/customers";
import PricingPage from "./pages/pricing";
import CareersPage from "./pages/careers";
import RoadmapPage from "./pages/roadmap";
import ZombieUseCasePage from "./pages/usecase/zombie-subscriptions";
import TaxUseCasePage from "./pages/usecase/tax-automation";
import SkuUseCasePage from "./pages/usecase/sku-intelligence";
import CardUseCasePage from "./pages/usecase/card-control";

function RouteTracker() {
  const [loc] = useLocation();
  useEffect(() => {
    const prev = sessionStorage.getItem("recekon_last_route") || "/";
    if (prev !== "/" && loc === "/") {
      const count = parseInt(sessionStorage.getItem("recekon_hero_visit") || "0");
      sessionStorage.setItem("recekon_hero_visit", String(count + 1));
    }
    sessionStorage.setItem("recekon_last_route", loc);
  }, [loc]);
  return null;
}

function App() {
  return (
    <Provider>
      <ModalProvider>
        <RouteTracker />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/products/stitching-engine" component={StitchingPage} />
          <Route path="/products/kill-switch" component={KillSwitchPage} />
          <Route path="/products/zombie-detector" component={ZombieDetectorPage} />
          <Route path="/products/tax-link" component={TaxLinkPage} />
          <Route path="/products/cash-flow-oracle" component={CashFlowOraclePage} />
          <Route path="/products/price-guardian" component={PriceGuardianPage} />
          <Route path="/use-cases" component={UseCasesPage} />
          <Route path="/use-cases/zombie-subscriptions" component={ZombieUseCasePage} />
          <Route path="/use-cases/tax-automation" component={TaxUseCasePage} />
          <Route path="/use-cases/sku-intelligence" component={SkuUseCasePage} />
          <Route path="/use-cases/card-control" component={CardUseCasePage} />
          <Route path="/developers" component={DevelopersPage} />
          <Route path="/developers/documentation" component={DocsPage} />
          <Route path="/developers/quickstart" component={QuickstartPage} />
          <Route path="/developers/security" component={SecurityPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/gdpr" component={GDPRPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/roadmap" component={RoadmapPage} />
        </Switch>
        {import.meta.env.DEV && <AgentFeedback />}
        {<RunableBadge />}
      </ModalProvider>
    </Provider>
  );
}

export default App;
