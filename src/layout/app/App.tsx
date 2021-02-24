import { Layout } from "antd";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import TopNav from "../topNav";
import { QueryParamProvider } from "use-query-params";
import { flatRoute } from "src/utils/flatRoutes";
import ContentSkeleton from "src/components/contentSkeleton";
import { routeItems } from "src/pages/routes";

const { Content, Header: LayoutHeader } = Layout;

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout className="app-container ">
          <LayoutHeader className="topNav">
            <TopNav routeItems={routeItems} />
          </LayoutHeader>
          <Layout className="content-layout">
            <Content className="app-content">
              <Suspense fallback={<ContentSkeleton />}>
                <Switch>
                  {flatRoute(routeItems).map((router) => (
                    <Route {...router} key={router.path as string} />
                  ))}
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </QueryParamProvider>
    </Router>
  );
}

export default App;
