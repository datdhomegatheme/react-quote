import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    DatePicker,
    Icon,
    IndexTable,
    List,
    Page,
    Tabs,
    Text,
    TextField,
    useIndexResourceState,
} from "@shopify/polaris";
import {
    CalendarMinor,
    SettingsMinor,
    PlusMinor,
} from "@shopify/polaris-icons";

import { useCallback, useState } from "react";

function QuoteListPage() {
    const [selected, setSelected] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const handleTextFieldChange = (event) => {
        setTextFieldValue(event);
    };
    const handleTabChange = useCallback((selectedTabIndex) =>
        setSelected(selectedTabIndex)
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
                <Button plain>Quick View</Button>
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
        </IndexTable.Row>
    ));

    return (
        <section className="quote-list">
            <Page fullWidth>
                <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleTabChange}
                >
                    <Card title={tabs[selected].content}>
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
                                    <div className="card-wrapper__btn-calendar">
                                        <Button
                                            fullWidth
                                            icon={CalendarMinor}
                                            onClick={handleClickCalendar}
                                        >
                                            Choose time
                                        </Button>
                                        {showCalendar === true && (
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
                                        )}
                                    </div>

                                    <Button icon={SettingsMinor}></Button>
                                    <div className="card-wrapper__btn-create">
                                        <Button primary icon={PlusMinor}>
                                            Create a quote
                                        </Button>
                                    </div>
                                </ButtonGroup>
                            </div>
                            <Card.Section>
                                <IndexTable
                                    resourceName={resourceName}
                                    itemCount={DataQuoteLists.length}
                                    selectedItemsCount={
                                        allResourcesSelected
                                            ? "All"
                                            : selectedResources.length
                                    }
                                    onSelectionChange={handleSelectionChange}
                                    headings={[
                                        { title: "Quote Id" },
                                        { title: "Customer Information" },
                                        { title: "Assign Salesperson" },
                                        { title: "Create Time" },
                                        { title: "Status" },
                                        { title: "Logs" },
                                        { title: "Actions" },
                                    ]}
                                >
                                    {rowMarkup}
                                </IndexTable>
                            </Card.Section>
                        </Card.Section>
                    </Card>
                </Tabs>
            </Page>
        </section>
    );
}

export default QuoteListPage;
