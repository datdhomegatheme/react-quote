import { Frame, Navigation } from "@shopify/polaris";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import QuoteListPage from "../../pages/QuoteListPage";
import SettingsPage from "../../pages/SettingsPage";
import PricingPage from "../../pages/PricingPage";

function Sidebar() {
    const location = useLocation();
    return (
        <Frame
            navigation={
                <Navigation location={location.pathname}>
                    <Navigation.Section
                        items={[
                            {
                                url: "/dashboard",
                                label: "Dashboard",
                            },
                            {
                                url: "/quote/list",
                                label: "Quote List",
                            },
                            {
                                url: "/settings",
                                label: "settings",
                            },
                            {
                                url: "/pricing",
                                label: "Pricing",
                            },
                        ]}
                    />
                </Navigation>
            }
        >
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/quote">
                    <Route path="list" element={<QuoteListPage />}>
                        <Route path="create" />
                        <Route path=":quoteId" />
                    </Route>
                    <Route path="trash-quote" />
                    <Route path="abandoned-quote" />
                </Route>
                <Route path="/settings">
                    <Route path="/display" element={<SettingsPage />} />
                    <Route path="/quote-form" />
                    <Route path="/quote-item" />
                    <Route path="/quote-view&button" />
                </Route>
                <Route path="/pricing" element={<PricingPage />} />
            </Routes>
        </Frame>
    );
}

export default Sidebar;
