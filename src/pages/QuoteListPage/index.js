import {
    ActionList,
    Badge,
    Button,
    ButtonGroup,
    Card,
    DatePicker,
    Divider,
    IndexTable,
    List,
    Modal,
    Page,
    Popover,
    Select,
    Tabs,
    Text,
    TextContainer,
    TextField,
    useIndexResourceState,
} from "@shopify/polaris";
import {
    CalendarMinor,
    SettingsMinor,
    PlusMinor,
    DeleteMinor,
    ViewMinor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";
import {
    DataQuoteLists,
    DataQuoteProductsInformation,
    OptionsPageIndex,
} from "./DataItemQuoteList";

function QuoteListPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedIndexTable, setSelectedIndexTable] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const handleChangeModal = () => {
        setShowModal(!showModal);
    };

    const handleSelectIndexPageChange = useCallback(
        (value) => setSelectedIndexTable(value),
        []
    );

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event);
    };
    const handleTabChange = useCallback((selectedTabIndex) =>
        setSelectedTab(selectedTabIndex)
    );
    const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
        end: new Date("Mon Mar 12 2018 00:00:00 GMT-0500 (EST)"),
    });

    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        []
    );

    const handleClickCalendar = () => {
        setOnShowCalendar(!showCalendar);
    };

    const resourceName = {
        singular: "customer",
        plural: "customers",
    };
    const tabs = [
        {
            id: "quote-list",
            content: "Quote List",
        },
        {
            id: "quote-trashed",
            content: "Trashed Quote",
        },
        {
            id: "quote-abandon",
            content: "Abandon Quote",
        },
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(DataQuoteLists);
    const rowMarkupQuoteProductsInformation = DataQuoteProductsInformation.map(
        (item, index) => (
            <IndexTable.Row id={item.id} key={index} position={index}>
                <IndexTable.Cell>{item.image}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Button plain removeUnderline>
                        {item.product}
                    </Button>
                    <br />
                    Default Title
                </IndexTable.Cell>
                <IndexTable.Cell>{item.quantity}</IndexTable.Cell>
                <IndexTable.Cell>{item.price}</IndexTable.Cell>
                <IndexTable.Cell>{item.price * item.quantity}</IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const rowMarkupQuoteLists = DataQuoteLists.map((item, index) => (
        <IndexTable.Row
            id={item.id}
            key={index}
            selected={selectedResources.includes(item.id)}
        >
            <IndexTable.Cell>{item.id}</IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    <Text as="span" fontWeight="bold">
                        Name:
                    </Text>
                    <br />
                    {item.customerInformation.name}
                    <br />
                </Text>
                <Modal
                    large
                    activator={
                        <Button
                            removeUnderline
                            onClick={() => setShowModal(true)}
                            plain
                        >
                            Quick View
                        </Button>
                    }
                    open={showModal}
                    onClose={handleChangeModal}
                    title={"Quick View Quote Information"}
                >
                    <Modal.Section>
                        <Card.Section title="Products">
                            <Divider borderStyle="base" />
                            <IndexTable
                                headings={[
                                    { title: "Image" },
                                    { title: "Product" },
                                    { title: "Quantity" },
                                    { title: "Price" },
                                    { title: "Total Price" },
                                ]}
                                selectable={false}
                                itemCount={DataQuoteProductsInformation.length}
                            >
                                {rowMarkupQuoteProductsInformation}
                            </IndexTable>
                        </Card.Section>
                    </Modal.Section>
                    <Modal.Section>
                        <Card.Section title="Customer Information">
                            <Divider borderStyle="base" />
                            <Text variant="headingSm" as="h6">
                                Name:{" "}
                                <Text variant="bodySm" as="span">
                                    {item.customerInformation.name}
                                </Text>
                            </Text>
                            <Text variant="headingSm" as="h6">
                                Email:{" "}
                                <Text variant="bodySm" as="span">
                                    {item.customerInformation.email}
                                </Text>
                            </Text>
                            <Text variant="headingSm" as="h6">
                                Message:{" "}
                                <Text variant="bodySm" as="span">
                                    {item.customerInformation.message}
                                </Text>
                            </Text>
                        </Card.Section>
                    </Modal.Section>
                </Modal>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {item.assignSalesperson + ` `}
                </Text>
                <Button plain>Change</Button>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {item.createTime.date}
                    <br />
                    {item.createTime.time}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {item.status === "read" && (
                    <Badge progress="incomplete" status="attention">
                        <Text variant="bodyMd" as="p">
                            {item.status}
                        </Text>
                    </Badge>
                )}
                {item.status === "Purchased" && (
                    <Badge progress="incomplete" status="success">
                        <Text variant="bodyMd" as="p">
                            {item.status}
                        </Text>
                    </Badge>
                )}
            </IndexTable.Cell>
            <IndexTable.Cell>
                {item.logs === `Send Email Successful` && (
                    <List.Item>
                        <Text variant="bodyMd" as="span">
                            {item.logs}
                        </Text>
                    </List.Item>
                )}
                {item.logs === `Email has not been sent to customer` && (
                    <List.Item>
                        <Text color="warning" variant="bodyMd" as="span">
                            {item.logs}
                        </Text>
                    </List.Item>
                )}
            </IndexTable.Cell>
            <IndexTable.Cell>
                <ButtonGroup>
                    <div className="data-table__btn-view">
                        <Button plain icon={ViewMinor} />
                    </div>
                    <Button plain icon={DeleteMinor} />
                </ButtonGroup>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    const buttonSelect = (
        <Button onClick={togglePopoverActive} icon={SettingsMinor}></Button>
    );

    const buttonCalendar = (
        <div className="card-wrapper__btn-calendar">
            <Button
                fullWidth
                icon={CalendarMinor}
                onClick={handleClickCalendar}
            >
                Choose time
            </Button>
        </div>
    );

    return (
        <section className="quote-list">
            <Page fullWidth>
                <Tabs
                    tabs={tabs}
                    selected={selectedTab}
                    onSelect={handleTabChange}
                >
                    <Card title={tabs[selectedTab].content}>
                        <Card.Section>
                            <div className="quote-list__card-wrapper">
                                <div className="card-wrapper__btn-search">
                                    <TextField
                                        placeholder={"search by Quote Id"}
                                        value={textFieldValue}
                                        onChange={handleTextFieldChange}
                                    />
                                </div>
                                <ButtonGroup>
                                    <div className="quote-list__popover-calendar">
                                        <Popover
                                            active={showCalendar}
                                            activator={buttonCalendar}
                                        >
                                            <div className="quote-list__date-picker">
                                                <DatePicker
                                                    month={month}
                                                    year={year}
                                                    onChange={setSelectedDates}
                                                    onMonthChange={
                                                        handleMonthChange
                                                    }
                                                    selected={selectedDates}
                                                    multiMonth
                                                    allowRange
                                                />
                                                <div className="quote-list__date-picker__btn-group">
                                                    <ButtonGroup>
                                                        <Button>Reset</Button>
                                                        <Button primary>
                                                            Apply
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>

                                    <Popover
                                        active={popoverActive}
                                        activator={buttonSelect}
                                        onClose={togglePopoverActive}
                                    >
                                        <ActionList
                                            actionRole="menuitem"
                                            items={[
                                                { content: "Refresh data" },
                                                {
                                                    content:
                                                        "Export quote list",
                                                },
                                            ]}
                                        />
                                    </Popover>
                                    <Button primary icon={PlusMinor}>
                                        Create a quote
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <Card.Section>
                                <div className="quote-list__data-table">
                                    <IndexTable
                                        resourceName={resourceName}
                                        itemCount={DataQuoteLists.length}
                                        selectedItemsCount={
                                            allResourcesSelected
                                                ? "All"
                                                : selectedResources.length
                                        }
                                        onSelectionChange={
                                            handleSelectionChange
                                        }
                                        headings={[
                                            { title: "Quote Id" },
                                            { title: "Customer Information" },
                                            { title: "Assign Salesperson" },
                                            { title: "Create Time" },
                                            { title: "Status" },
                                            { title: "Logs" },
                                            { title: "Actions" },
                                        ]}
                                        sortable={[
                                            true,
                                            false,
                                            false,
                                            false,
                                            true,
                                            true,
                                            false,
                                        ]}
                                    >
                                        {rowMarkupQuoteLists}
                                    </IndexTable>
                                    <div
                                        className={
                                            "quote-list__select-index-table"
                                        }
                                    >
                                        <Select
                                            options={OptionsPageIndex}
                                            onChange={
                                                handleSelectIndexPageChange
                                            }
                                            value={selectedIndexTable}
                                        ></Select>
                                    </div>
                                </div>
                            </Card.Section>
                        </Card.Section>
                    </Card>
                </Tabs>
            </Page>
        </section>
    );
}

export default QuoteListPage;
