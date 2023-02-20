import {
    ActionList,
    AlphaStack,
    Badge,
    Box,
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
    TextContainer,
    TextField,
    useIndexResourceState,
} from "@shopify/polaris";
import {
    CalendarMinor,
    CircleDownMajor,
    DeleteMinor,
    PlusMinor,
    SettingsMinor,
    ViewMinor,
} from "@shopify/polaris-icons";

import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuoteListApi} from "../../redux/quoteListSlice";
import {AssignSalesperson, OptionsPageIndex} from "./DataItemQuoteList";
import ModalQuickView from "../QuoteListPage/ModalQuickView";
import {useNavigate} from "react-router-dom";
import Images from "../../assets/Images";
import {getTrashedQuoteList} from "../../redux/trashedQuoteListSlice";

function QuoteListPage() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedIndexTable, setSelectedIndexTable] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [quoteDetail, setQuoteDetail] = useState({});
    const [showChangeAssign, setShowChangeAssign] = useState(false);

    //get data from redux global state
    const quoteList = useSelector((state) => state.quoteList.data);
    const trashedQuoteList = useSelector((state) => state.trashedQuoteList.data)

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
    const [{month, year}, setDate] = useState({
        month: 1,
        year: new Date().getFullYear()
    });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        []
    );

    const handleClickCalendar = () => {
        setOnShowCalendar(!showCalendar);
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
        useIndexResourceState(quoteList);

    // logic delete button
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleModalDelete = (e) => {
        setShowModalDelete(!showModalDelete);
        e.preventDefault();
        e.stopPropagation();
    };


    const buttonSelect = (
        <Button onClick={togglePopoverActive} icon={SettingsMinor}></Button>
    );

    const [datePickerValue, setDatePickerValue] = useState("Choose time");

    const handleDateApplyButton = () => {
        setDatePickerValue(
            selectedDates.start.toLocaleDateString("en-US") +
            "-" +
            selectedDates.end.toLocaleDateString("en-US")
        );
        setOnShowCalendar(false);
    };

    const handleDateResetButton = () => {
        setDatePickerValue("Choose time");
        setOnShowCalendar(false);
    };
    const buttonCalendar = (
        <div className="card-wrapper__btn-calendar">
            <Button
                fullWidth
                icon={CalendarMinor}
                onClick={handleClickCalendar}
            >
                {datePickerValue}
            </Button>
        </div>
    );

    const dispatch = useDispatch();

    // logic Select Assign

    const handleClickSelectAssign = () => {

    }

    //call api update global state
    useEffect(() => {
        dispatch(getQuoteListApi());
        dispatch(getTrashedQuoteList());
    }, []);

//row of each tab quote's table
    const rowMarkupQuoteLists = quoteList?.map((quote, index) => (
        <IndexTable.Row
            id={quote.id}
            key={index}
            selected={selectedResources.includes(quote.id)}
            position={index}>
            <IndexTable.Cell>{quote.id}</IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    <Text variant={"headingSm"} as="span" fontWeight="bold">
                        Name:
                    </Text>
                    <br/>
                    {quote.customerInformation.name}
                    <br/>
                </Text>
                <Button
                    removeUnderline
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleChangeModal(quote);
                    }}
                    plain
                >
                    Quick View
                </Button>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {quote.assignSalesperson.name + " "}
                <Button
                    plain
                    onClick={(e) => {
                        const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                        element.classList.toggle("show-element")
                        // setShowChangeAssign(true);
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    Change
                </Button>

                <div id={`quote-list__assign-btn-${quote.id}`} className={"hide-element"}>
                    <ButtonGroup>
                        <div className={"quote-list__select-assign"}>
                            <Select
                                arrow
                                options={OptionsPageIndex}
                                onChange={handleSelectIndexPageChange}
                                value={selectedIndexTable}
                                label={"assign"}
                                labelHidden={true}
                            />
                        </div>
                        <Button
                            primary
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                                element.classList.toggle("show-element")
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                                element.classList.toggle("show-element")
                            }}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>


            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {quote.createTime.date}
                    <br/>
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
                        <Button
                            onClick={() => navigate(`${quote.id}`
                            )}
                            plain
                            icon={ViewMinor}
                        />
                    </div>
                    <Button plain icon={DeleteMinor} onClick={handleModalDelete}/>
                </ButtonGroup>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));
    const rowMarkupTrashedQuoteLists = trashedQuoteList?.map((quote, index) => (
        <IndexTable.Row
            id={quote.id}
            key={index}
            selected={selectedResources.includes(quote.id)}
            position={index}>
            <IndexTable.Cell>{quote.id}</IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    <Text variant={"headingSm"} as="span" fontWeight="bold">
                        Name:
                    </Text>
                    <br/>
                    {quote.customerInformation.name}
                    <br/>
                </Text>
                <Button
                    removeUnderline
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleChangeModal(quote);
                    }}
                    plain
                >
                    Quick View
                </Button>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {quote.assignSalesperson.name + " "}
                <Button
                    plain
                    onClick={(e) => {
                        const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                        element.classList.toggle("show-element")
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    Change
                </Button>


                <div id={`quote-list__assign-btn-${quote.id}`} className={"hide-element"}>
                    <ButtonGroup>
                        <div className={"quote-list__select-assign"}>
                            <Select
                                arrow
                                options={AssignSalesperson}
                                onChange={handleSelectIndexPageChange}
                                value={selectedIndexTable}
                                label={"assign"}
                                labelHidden={true}
                            />
                        </div>
                        <Button
                            primary
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                                element.classList.toggle("show-element")
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={(e) => {
                                const element = document.getElementById(`quote-list__assign-btn-${quote.id}`);
                                element.classList.toggle("show-element")
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>


            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {quote.createTime.date}
                    <br/>
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
                        <Button
                            onClick={(e) => {
                                navigate(`${quote.id}`)
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            plain
                            icon={ViewMinor}
                        />
                    </div>
                    <div className={"data-table__btn-restore"}>
                        <Button plain icon={CircleDownMajor} onClick={(e) => {
                            alert("quote restored !!")
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        }/>
                    </div>
                    <Button plain icon={DeleteMinor} onClick={handleModalDelete}/>
                </ButtonGroup>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));


//tab route
    const tabs = [
        {
            id: "quote-list",
            content: "Quote List",
            ui: <Box padding={"4"}>
                <Card>
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
                                                    <Button
                                                        onClick={
                                                            handleDateResetButton
                                                        }
                                                    >
                                                        Reset
                                                    </Button>
                                                    <Button
                                                        primary
                                                        onClick={
                                                            handleDateApplyButton
                                                        }
                                                    >
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
                                            {content: "Refresh data"},
                                            {
                                                content:
                                                    "Export quote list",
                                            },
                                        ]}
                                    />
                                </Popover>
                                <Button
                                    primary
                                    onClick={() =>
                                        navigate("/quote/create")
                                    }
                                    icon={PlusMinor}
                                >
                                    Create a quote
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Card.Section>
                            <div className="quote-list__data-table">
                                <IndexTable
                                    itemCount={quoteList.length}
                                    selectedItemsCount={
                                        allResourcesSelected
                                            ? "All"
                                            : selectedResources.length
                                    }
                                    onSelectionChange={
                                        handleSelectionChange
                                    }
                                    headings={[
                                        {title: "Quote Id"},
                                        {title: "Customer Information"},
                                        {title: "Assign Salesperson"},
                                        {title: "Create Time"},
                                        {title: "Status"},
                                        {title: "Logs"},
                                        {title: "Actions"},
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
                                    />
                                </div>
                            </div>
                        </Card.Section>
                    </Card.Section>
                </Card>
            </Box>

        },
        {
            id: "quote-trashed",
            content: "Trashed Quote",
            ui:
                <>
                    {(trashedQuoteList.length !== 0) ?
                        <Box padding={"4"}>
                            <Card>
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
                                                                <Button
                                                                    onClick={
                                                                        handleDateResetButton
                                                                    }
                                                                >
                                                                    Reset
                                                                </Button>
                                                                <Button
                                                                    primary
                                                                    onClick={
                                                                        handleDateApplyButton
                                                                    }
                                                                >
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
                                                        {content: "Refresh data"},
                                                        {
                                                            content:
                                                                "Export quote list",
                                                        },
                                                    ]}
                                                />
                                            </Popover>
                                            <Button
                                                primary
                                                onClick={() =>
                                                    navigate("/quote/create")
                                                }
                                                icon={PlusMinor}
                                            >
                                                Create a quote
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <Card.Section>
                                        <div className="quote-list__data-table">
                                            <IndexTable
                                                itemCount={quoteList.length}
                                                selectedItemsCount={
                                                    allResourcesSelected
                                                        ? "All"
                                                        : selectedResources.length
                                                }
                                                onSelectionChange={
                                                    handleSelectionChange
                                                }
                                                headings={[
                                                    {title: "Quote Id"},
                                                    {title: "Customer Information"},
                                                    {title: "Assign Salesperson"},
                                                    {title: "Create Time"},
                                                    {title: "Status"},
                                                    {title: "Logs"},
                                                    {title: "Actions"},
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
                                                {rowMarkupTrashedQuoteLists}
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
                                                />
                                            </div>
                                        </div>
                                    </Card.Section>
                                </Card.Section>
                            </Card>
                        </Box> :
                        <Box padding={"10"}>
                            <AlphaStack fullWidth align={"center"}>
                                <Card>
                                    <Card.Section>
                                        <Box paddingBlockEnd={"12"} paddingBlockStart={"4"}>
                                            <AlphaStack align={"center"}>
                                                <img alt={"empty quote"} src={Images.emptyQuote}/>
                                                <Text variant={"headingMd"} as={"h1"}>This is where you'll manage your
                                                    trashed
                                                    quote</Text>
                                                <Text variant={"bodySm"} as={"p"} fontWeight={"regular"}>You can edit
                                                    and
                                                    restore quote that you trashed</Text>
                                            </AlphaStack>
                                        </Box>
                                    </Card.Section>
                                </Card>
                            </AlphaStack>
                        </Box>}
                </>

        },
        {
            id: "quote-abandon",
            content: "Abandon Quote",
            ui:
                <Box padding={"10"}>
                    <AlphaStack fullWidth align={"center"}>
                        <Card>
                            <Card.Section>
                                <Box paddingBlockEnd={"12"} paddingBlockStart={"4"}>
                                    <AlphaStack align={"center"}>
                                        <img alt={"empty quote"} src={Images.emptyQuote}/>
                                        <Text variant={"headingMd"} as={"h1"}>This is where you'll manage your Abandon
                                            quote</Text>
                                        <Text variant={"bodySm"} as={"p"} fontWeight={"regular"}>When your customer has
                                            not submitted a quote request, a abandoned quote will be created</Text>
                                    </AlphaStack>
                                </Box>
                            </Card.Section>
                        </Card>
                    </AlphaStack>
                </Box>
        },
    ];


    return (
        <section className="quote-list">
            <Page fullWidth>
                <Tabs
                    tabs={tabs}
                    selected={selectedTab}
                    onSelect={handleTabChange}
                >

                    {tabs[selectedTab].ui}

                </Tabs>
                <Modal open={showModalDelete} title={"Delete this quote"} onClose={handleModalDelete}>
                    <div className="quote-list__modal-delete">
                        <Modal.Section>
                            <TextContainer>
                                <Text variant={"bodyLg"} as={"p"}>Are you sure you want to delete this quote?</Text>
                                <Text variant={"bodyLg"} as={"p"}>Or move this quote to trash?</Text>
                                <Text variant={"bodyLg"} as={"p"}>The quote has been in 60 days if it's in trashed
                                    box.</Text>
                                <Text variant={"bodyLg"} as={"p"}>This action cannot be undone.</Text>
                            </TextContainer>
                        </Modal.Section>
                        <Modal.Section>
                            <div className="modal-delete__btn">
                                <ButtonGroup>
                                    <Button>Move to Trashed</Button>
                                    <Button destructive>Delete</Button>
                                </ButtonGroup>
                            </div>

                        </Modal.Section>
                    </div>
                </Modal>
            </Page>
        </section>
    );
}

export default QuoteListPage;
