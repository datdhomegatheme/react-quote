import { List } from "@shopify/polaris";
import { Link } from "react-router-dom";

import {
    HomeMinor,
    NoteMinor,
    PlanMinor,
    DuplicateMinor,
    SettingsMinor,
} from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

function Sidebar() {
    // const location = useLocation();
    // const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

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
