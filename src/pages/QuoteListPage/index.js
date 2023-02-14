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

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuoteListApi } from "../../redux/quoteListSlice";
import { OptionsPageIndex } from "./DataItemQuoteList";
import ModalQuickView from "../QuoteListPage/ModalQuickView";

function QuoteListPage(quoteListState) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedIndexTable, setSelectedIndexTable] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [quoteDetail, setQuoteDetail] = useState({});
    const [showChangeAssign, setShowChangeAssign] = useState(false);

    const quoteList = useSelector((state) => state.quoteList.data);

    const handleChangeModal = (quote) => {
        setShowModal(!showModal);
        setQuoteDetail(quote);
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
        useIndexResourceState(quoteList);

    const rowMarkupQuoteLists = quoteList?.map((quote, index) => (
        <IndexTable.Row
            id={quote.id}
            key={index}
            selected={selectedResources.includes(quote.id)}
        >
            <IndexTable.Cell>{quote.id}</IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    <Text as="span" fontWeight="bold">
                        Name:
                    </Text>
                    <br />
                    {quote.customerInformation.name}
                    <br />
                </Text>
                <Button
                    removeUnderline
                    onClick={() => handleChangeModal(quote)}
                    plain
                >
                    Quick View
                </Button>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {/* <Text variant="bodyMd" as="p"> */}
                {quote.assignSalesperson + " "}
                <Button
                    plain
                    onClick={() => {
                        setShowChangeAssign(true);
                    }}
                >
                    Change
                </Button>
                {showChangeAssign && (
                    <ButtonGroup>
                        <div className={"quote-list__select-assign"}>
                            <Select
                                arrow
                                options={OptionsPageIndex}
                                onChange={handleSelectIndexPageChange}
                                value={selectedIndexTable}
                            ></Select>
                        </div>
                        <Button primary>Save</Button>
                        <Button onClick={() => setShowChangeAssign(false)}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                )}
                {/* </Text> */}
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {quote.createTime.date}
                    <br />
                    {quote.createTime.time}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {quote.status === "read" && (
                    <Badge progress="incomplete" status="attention">
                        <Text variant="bodyMd" as="p">
                            {quote.status}
                        </Text>
                    </Badge>
                )}
                {quote.status === "Purchased" && (
                    <Badge progress="incomplete" status="success">
                        <Text variant="bodyMd" as="p">
                            {quote.status}
                        </Text>
                    </Badge>
                )}
            </IndexTable.Cell>
            <IndexTable.Cell>
                {quote.logs === `Send Email Successful` && (
                    <List.Item>
                        <Text variant="bodyMd" as="span">
                            {quote.logs}
                        </Text>
                    </List.Item>
                )}
                {quote.logs === `Email has not been sent to customer` && (
                    <List.Item>
                        <Text color="warning" variant="bodyMd" as="span">
                            {quote.logs}
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuoteListApi());
    }, []);

    console.log(showChangeAssign);

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
                            <ModalQuickView
                                handleChangeModal={handleChangeModal}
                                showModal={showModal}
                                quote={quoteDetail}
                            />
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
                                        itemCount={2}
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
