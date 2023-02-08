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

    // const toggleMobileNavigationActive = useCallback(
    //     () =>
    //         setMobileNavigationActive(
    //             (mobileNavigationActive) => !mobileNavigationActive
    //         ),
    //     []
    // );

    // const topBarMarkup = (
    //     <TopBar
    //         showNavigationToggle
    //         onNavigationToggle={toggleMobileNavigationActive}
    //     />
    // );
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate("/dashboard");
    // };
    return (
        <div className="sidebar">
            <List>
                <List.Item>
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to="/quote/list" className="nav-link">
                        Quote List
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to="/quote-settings" className="nav-link">
                        Quote Settings
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to="/settings" className="nav-link">
                        Settings
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to="/pricing" className="nav-link">
                        Pricing Plan
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to="/recommended-apps" className="nav-link">
                        Recommended Apps
                    </Link>
                </List.Item>
            </List>
            {/* topBar={topBarMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            navigation=
            {
                <div className="sidebar">
                    <Navigation external location={location.pathname}>
                        <Navigation.Section
                            items={[
                                {
                                    url: "javascript:void(0)",
                                    selected:
                                        location.pathname.trim() ===
                                        "/dashboard",
                                    onClick: handleClick,
                                    label: "Dashboard",
                                    icon: HomeMinor,
                                },
                                {
                                    url: "/quote/list",
                                    label: "Quote List",
                                    icon: DuplicateMinor,
                                },
                                {
                                    url: "/quote-settings/display",
                                    label: "Quote settings",
                                    icon: NoteMinor,
                                },
                                {
                                    url: "/settings/general",
                                    label: "Settings",
                                    icon: SettingsMinor,
                                },
                                {
                                    url: "/pricing",
                                    label: "Pricing Plan",
                                    icon: PlanMinor,
                                },
                            ]}
                        />
                    </Navigation>
                </div>
            } */}
        </div>
    );
}

export default Sidebar;
