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
                                url: "/quote-settings/display",
                                label: "Quote settings",
                            },
                            {
                                url: "/settings/general",
                                label: "Settings",
                            },
                            {
                                url: "/pricing",
                                label: "Pricing Plan",
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
                <Route path="/quote-settings">
                    <Route path="display" element={<SettingsPage />} />
                    <Route path="quote-form" />
                    <Route path="quote-items" />
                    <Route path="quote-view&button" />
                </Route>
                <Route path="/settings">
                    <Route path="general" element={<SettingsPage />} />

                    <Route
                        path="notification&template"
                        element={<SettingsPage />}
                    />
                    <Route path="salesperson">
                        <Route path="create-salesperson-account" />
                    </Route>
                    <Route path="advanced" />
                </Route>
                <Route path="/pricing" element={<PricingPage />} />
            </Routes>
        </Frame>
    );
}

export default Sidebar;
