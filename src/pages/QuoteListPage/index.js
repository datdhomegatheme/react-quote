import {
    ActionList,
    Badge,
    Button,
    ButtonGroup,
    Card,
    DatePicker,
    IndexTable,
    List,
    Modal,
    Page,
    Popover,
    Select,
    Tabs,
    Text,
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

const DataQuoteLists = [
    {
        id: 0,
        customerInformation: {
            name: "Hieu",
            email: "hieu@gmail.com",
            message: "hi",
        },
        assignSalesperson: "Admin",
        createTime: {
            date: "02/07/2023",
            time: "04:47:00",
        },
        status: "read",
        logs: "Send Email Successful",
    },
    {
        id: 1,
        customerInformation: {
            name: "Hieu111",
            email: "hieu111@gmail.com",
            message: "hi111",
        },
        assignSalesperson: "Admin",
        createTime: {
            date: "02/07/2023",
            time: "04:47:00",
        },
        status: "Purchased",
        logs: "Send Email Successful",
    },
    {
        id: 2,
        customerInformation: {
            name: "Hieu222",
            email: "hieu222@gmail.com",
            message: "hi222",
        },
        assignSalesperson: "Admin",
        createTime: {
            date: "02/07/2023",
            time: "04:47:00",
        },
        status: "read",
        logs: "Email has not been sent to customer",
    },
];

// const sortCurrency = (rows, index, direction) => {
//     return [...rows].sort((rowA, rowB) => {
//         const amountA = parseFloat(rowA[index].substring(1));
//         const amountB = parseFloat(rowB[index].substring(1));

//         return direction === "descending"
//             ? amountB - amountA
//             : amountA - amountB;
//     });
// };

function QuoteListPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedIndexTable, setSelectedIndexTable] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const HandleChangeModal = () => {
        setShowModal(!showModal);
    };
    // const [sortedRows, setSortedRows] = useState(null);

    // const rows = sortedRows ? sortedRows : DataQuoteLists;

    // const handleSort = useCallback(
    //     (index, direction) =>
    //         setSortedRows(sortCurrency(rows, index, direction)),
    //     [rows]
    // );

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

    const options = [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "50", value: "50" },
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(DataQuoteLists);

    const rowMarkup = DataQuoteLists.map((item, index) => (
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
                    activator={
                        <Button onClick={() => setShowModal(true)} plain>
                            Quick View
                        </Button>
                    }
                    open={showModal}
                    onClose={HandleChangeModal}
                    title={"Quick View Quote Information"}
                >
                    <Modal.Section></Modal.Section>
                </Modal>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {item.assignSalesperson + ` `}
                </Text>
                <Button onClick={() => console.log(111)} plain>
                    Change
                </Button>
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
                                        // rows={rows}
                                        sortable={[
                                            true,
                                            false,
                                            false,
                                            false,
                                            true,
                                            true,
                                            false,
                                        ]}
                                        // defaultSortDirection="descending"
                                        // onSort={handleSort}
                                    >
                                        {rowMarkup}
                                    </IndexTable>
                                    <div
                                        className={
                                            "quote-list__select-index-table"
                                        }
                                    >
                                        <Select
                                            options={options}
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
