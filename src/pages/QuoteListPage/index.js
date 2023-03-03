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
    Page, Pagination,
    Popover,
    Select,
    Tabs,
    Text,
    TextContainer,
    TextField,
    useIndexResourceState,
    Stack,
    Tag

} from "@shopify/polaris";
import {
    CircleDownMajor,
    DeleteMinor,
    PlusMinor,
    SettingsMinor,
    ViewMinor,
    FilterMajor, CalendarTickMajor,
} from "@shopify/polaris-icons";

import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteQuoteApi, getQuoteListFilterApi} from "../../redux/quoteListSlice";
import {AssignSalesperson, OptionsPageIndex} from "./DataItemQuoteList";
import ModalQuickView from "../QuoteListPage/ModalQuickView";
import {useNavigate} from "react-router-dom";
import Images from "../../assets/Images";
import {
    deleteTrashedQuote,
    getTrashedQuoteList,
} from "../../redux/trashedQuoteListSlice";
import {QuoteList} from "./QuoteList";
import {DatePickerComponent} from "../../components/DatePickerComponent";
import {SalePersonFilter} from "./QuoteList/SalePersonFilter";
import {SalePersonFilterTag} from "./QuoteList/SalePersonFilterTag";

function QuoteListPage() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState("");
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedIndexTable, setSelectedIndexTable] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [quoteDetail, setQuoteDetail] = useState({});
    const [currentPage, setCurrentPage] = useState(1);


    // xu ly popover filter date
    const [togglePopoverActiveFilter, setTogglePopoverActive] = useState(false);
    const [togglePopoverActiveFilter2, setTogglePopoverActive2] = useState(false);
    const [showCalendar2, setOnShowCalendar2] = useState(false);

    const handleTogglePopoverActiveFilter = () => {
        setTimeout(() => {
            setOnShowCalendar(false);
            setShowFilterSalePerson(false);
        }, 100)

        setTogglePopoverActive(!togglePopoverActiveFilter)
    }
    const handleTogglePopoverActiveFilter2 = () => {
        setTimeout(() => {
            setOnShowCalendar2(false);
        }, 100)
        setTogglePopoverActive2(!togglePopoverActiveFilter2)
    }

    const handleToggleTagDateFilter = () => {
        setOnShowCalendar2(true);
        setTogglePopoverActive2(true);
    }


    const handleDateApplyButton = () => {
        setSelectedTagFilter([selectedDates.start.toLocaleDateString("en-US") +
        "-" +
        selectedDates.end.toLocaleDateString("en-US"),])

        setTimeout(() => {
            setOnShowCalendar(false);
        }, 500)

        setTogglePopoverActive(false);

        setTimeout(() => {
            setOnShowCalendar2(false);
        }, 500)

        setTogglePopoverActive2(false);


    };

    const handleDateResetButton = () => {

        setSelectedTagFilter([]);

        setTimeout(() => {
            setOnShowCalendar(false);
        }, 500)

        setTogglePopoverActive(false);

        setTimeout(() => {
            setOnShowCalendar2(false);
        }, 500)

        setTogglePopoverActive2(false);
    };

    //xu ly tag filter date va salePerson

    const [selectedTagFilter, setSelectedTagFilter] = useState([])

    // xu ly filter saleperson


    const handleRemoveTagFilter = (tag) => {
        setSelectedTagFilter((previousTags) =>
            previousTags.filter((previousTags) => previousTags !== tag))
    }

    //get data from redux global state
    const quoteList = useSelector((state) => state.quoteList.quote);
    const trashedQuoteList = useSelector(
        (state) => state.trashedQuoteList.data
    );

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
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
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

    // show salePerson filter

    const [showFilterSalePerson, setShowFilterSalePerson] = useState(false)
    const handleClickSalesperson = () => {
        setShowFilterSalePerson(!showFilterSalePerson)
    }


    let {selectedResources, allResourcesSelected, handleSelectionChange, clearSelection, removeSelectedResources} =
        useIndexResourceState(quoteList)


    const [quoteId, setQuoteId] = useState();
    //-------> logic modal delete
    const [showModalQuoteDelete, setShowModalQuoteDelete] = useState(false);
    const handleModalQuoteDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setQuoteId(id);
        setShowModalQuoteDelete(!showModalQuoteDelete);
    };
    // --------> logic delete quote
    const handleDeleteQuote = () => {
        setShowModalQuoteDelete(false);
        dispatch(deleteQuoteApi(quoteId));
    };

    // --------> logic modal delete trashed quote
    const [showModalTrashedQuoteDelete, setShowModalTrashedQuoteDelete] =
        useState(false);
    const handleModalTrashedQuoteDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setQuoteId(id);
        setShowModalTrashedQuoteDelete(!showModalTrashedQuoteDelete);
    };
    // --------> logic delete trashed quote
    const handleDeleteTrashedQuote = () => {
        setShowModalTrashedQuoteDelete(false);
        dispatch(deleteTrashedQuote(quoteId));
    };

    const buttonSelect = (
        <Button onClick={togglePopoverActive} icon={SettingsMinor}></Button>
    );


    const dispatch = useDispatch();
    //call api update global state


    //row of each tab quote's table
    const rowMarkupQuoteLists = quoteList?.map((quote, index) => (
        <IndexTable.Row
            id={quote.id}
            key={index}
            selected={selectedResources.includes(quote.id)}
            position={index}
        >
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
                {quote.assignSalesperson + " "}
                <Button
                    plain
                    onClick={(e) => {
                        const element = document.getElementById(
                            `quote-list__assign-btn-${quote.id}`
                        );
                        element.classList.toggle("show-element-visibility");
                        // setShowChangeAssign(true);
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    Change
                </Button>

                <div
                    id={`quote-list__assign-btn-${quote.id}`}
                    className={"hide-element-visibility"}
                >
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
                                const element = document.getElementById(
                                    `quote-list__assign-btn-${quote.id}`
                                );
                                element.classList.toggle(
                                    "show-element-visibility"
                                );
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const element = document.getElementById(
                                    `quote-list__assign-btn-${quote.id}`
                                );
                                element.classList.toggle(
                                    "show-element-visibility"
                                );
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
                            onClick={() => navigate(`${quote.id}`)}
                            plain
                            icon={ViewMinor}
                        />
                    </div>
                    <Button
                        plain
                        icon={DeleteMinor}
                        onClick={(e) => handleModalQuoteDelete(e, quote.id)}
                    />
                </ButtonGroup>
            </IndexTable.Cell>
            {/*----Modal delete-----*/}
        </IndexTable.Row>
    ));
    const rowMarkupTrashedQuoteLists = trashedQuoteList?.map((quote, index) => (
        <IndexTable.Row
            id={quote.id}
            key={index}
            selected={selectedResources.includes(quote.id)}
            position={index}
        >
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
            <IndexTable.Cell>{quote.assignSalesperson + " "}</IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" as="p">
                    {quote.createTime.date}
                    <br/>
                    {quote.createTime.time}
                </Text>
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
                                navigate(`${quote.id}`);
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            plain
                            icon={ViewMinor}
                        />
                    </div>
                    <div
                        className={
                            "data-table__btn-restore d-flex justify-content-center "
                        }
                    >
                        <Button
                            plain
                            icon={CircleDownMajor}
                            onClick={(e) => {
                                alert("quote restored !!");
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                    </div>
                    <Button
                        plain
                        icon={DeleteMinor}
                        onClick={(e) =>
                            handleModalTrashedQuoteDelete(e, quote.id)
                        }
                    />
                </ButtonGroup>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    const [salePersonValue, setSalePersonValue] = useState('');


    const handleSelectedAllQuotes = () => {
        // quoteList.map(item => {
        //     !selectedResources.includes(item.id) && (
        //         selectedResources = [...selectedResources, item.id])
        // })
        // console.log(selectedResources)

        let ele=document.getElementsByClassName('Polaris-Checkbox__Input');
        for(let i=0; i<ele.length; i++){
            if(ele[i].type=='checkbox')
                ele[i].checked=true;
        }


    }

    useEffect(() => {
        dispatch(getQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
    }, [currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue]);
    //tab route
    const tabs = [
        {
            id: "quote-list",
            content: "Quote List",
            ui: (
                <>
                    {quoteList.length !== 0 ?
                        <Box padding={"4"}>
                            <Card>
                                <Card.Section>
                                    <ModalQuickView
                                        handleChangeModal={handleChangeModal}
                                        showModal={showModal}
                                        quote={quoteDetail}
                                    />

                                    <div className="quote-list__card-wrapper d-flex justify-content-between">
                                        {selectedResources.length === 0 ?
                                            <>
                                                <div className="card-wrapper__btn-search">
                                                    <TextField
                                                        placeholder={"search by Quote Id"}
                                                        value={textFieldValue}
                                                        onChange={handleTextFieldChange}
                                                    />


                                                </div>
                                                <ButtonGroup>
                                                    <Stack spacing={"tight"}>
                                                        {salePersonValue && <SalePersonFilterTag
                                                            setSalePersonValue={setSalePersonValue}
                                                            salePersonValue={salePersonValue}
                                                            handleTogglePopoverActiveFilter={handleTogglePopoverActiveFilter}
                                                        />}

                                                        {selectedTagFilter.map((item, index) => (
                                                            <div key={index}>
                                                                <Popover
                                                                    active={
                                                                        togglePopoverActiveFilter2
                                                                    }
                                                                    onClose={handleTogglePopoverActiveFilter2}
                                                                    activator={
                                                                        <Tag key={index}
                                                                             onRemove={() => handleRemoveTagFilter(item)}>
                                                                            <Button icon={CalendarTickMajor} monochrome
                                                                                    removeUnderline plain
                                                                                    onClick={handleToggleTagDateFilter}>
                                                                                {item}
                                                                            </Button>
                                                                        </Tag>
                                                                    }
                                                                >
                                                                    <div className="quote-list__popover-calendar">
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
                                                                            <div
                                                                                className="quote-list__date-picker__btn-group">
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
                                                                    </div>

                                                                </Popover>
                                                            </div>


                                                        ))}
                                                    </Stack>

                                                    <Popover
                                                        active={togglePopoverActiveFilter}
                                                        activator=
                                                            {
                                                                <Button
                                                                    onClick={handleTogglePopoverActiveFilter}
                                                                    icon={FilterMajor}/>
                                                            }
                                                        onClose={handleTogglePopoverActiveFilter}

                                                    >
                                                        <div>
                                                            {showCalendar &&
                                                                <div className="quote-list__popover-calendar">
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
                                                                        <div
                                                                            className="quote-list__date-picker__btn-group">
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
                                                                </div>}

                                                            {showFilterSalePerson && (
                                                                <SalePersonFilter
                                                                    handleTogglePopoverActiveFilter={handleTogglePopoverActiveFilter}
                                                                    setSalePersonValue={setSalePersonValue}
                                                                />)
                                                            }

                                                            {!showCalendar && !showFilterSalePerson && (
                                                                <ActionList
                                                                    actionRole="menuitem"
                                                                    items={[
                                                                        {
                                                                            content: "Create at",
                                                                            onAction: handleClickCalendar

                                                                        },
                                                                        {
                                                                            content:
                                                                                "Salesperson",
                                                                            onAction: handleClickSalesperson
                                                                        },
                                                                    ]}
                                                                />
                                                            )
                                                            }

                                                        </div>
                                                    </Popover>


                                                    <Popover
                                                        active={popoverActive}
                                                        activator={buttonSelect}
                                                        onClose={togglePopoverActive}
                                                    >
                                                        <ActionList
                                                            actionRole="menuitem"
                                                            items={[
                                                                {
                                                                    content: "Refresh data",
                                                                    onAction() {
                                                                        dispatch(getQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
                                                                    }
                                                                },
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
                                            </>
                                            : <ButtonGroup segmented>
                                                <Button disabled><Text as={"h1"}
                                                                       variant={"bodyMd"}>{selectedResources.length + " "}
                                                    selected</Text></Button>
                                                <Button><Text as={"h1"} variant={"bodyMd"}>Export
                                                    Selected</Text></Button>
                                                <Button><Text as={"h1"}
                                                              variant={"bodyMd"}>Delete Selected</Text></Button>
                                                {selectedResources.length > 0 && selectedResources.length !== quoteList.length &&
                                                    <Box paddingInlineStart={"4"}>
                                                        <Button onClick={handleSelectedAllQuotes} removeUnderline plain>
                                                            <Text as={"h1"} variant={"bodyMd"}>Selected all quotes
                                                            </Text>
                                                        </Button>
                                                    </Box>
                                                }
                                                {selectedResources.length === quoteList.length &&
                                                    <Box paddingInlineStart={"4"}>
                                                        <Button onClick={clearSelection} removeUnderline plain>
                                                            <Text as={"h1"} variant={"bodyMd"}>
                                                                Unselected all quotes
                                                            </Text>
                                                        </Button>
                                                    </Box>}
                                            </ButtonGroup>

                                        }


                                    </div>
                                    <Card.Section>
                                        <div className="quote-list__data-table w-100">
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
                                            <Box paddingBlockStart={"10"}>
                                                <Stack>
                                                    <Stack.Item fill>
                                                        <Pagination
                                                            hasPrevious
                                                            onPrevious={() => {
                                                                if (currentPage === 1) {
                                                                    setCurrentPage(1)
                                                                } else {
                                                                    setCurrentPage(currentPage - 1)
                                                                }
                                                            }}
                                                            hasNext
                                                            onNext={() => {
                                                                setCurrentPage(currentPage + 1)
                                                            }}
                                                        />
                                                    </Stack.Item>
                                                    <Stack.Item>
                                                        <Select
                                                            label={"select"}
                                                            labelHidden
                                                            options={OptionsPageIndex}
                                                            onChange={
                                                                handleSelectIndexPageChange
                                                            }
                                                            value={selectedIndexTable}
                                                        />
                                                    </Stack.Item>

                                                </Stack>
                                            </Box>

                                        </div>
                                    </Card.Section>
                                </Card.Section>
                            </Card>
                        </Box>
                        : <QuoteList/>}
                </>
            ),
        },
        {
            id: "quote-trashed",
            content: "Trashed Quote",
            ui: (
                <>
                    {trashedQuoteList.length !== 0 ? (
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
                                                placeholder={
                                                    "search by Quote Id"
                                                }
                                                value={textFieldValue}
                                                onChange={handleTextFieldChange}
                                            />
                                        </div>
                                        <ButtonGroup>
                                            <div className="quote-list__popover-calendar">
                                                <Popover
                                                    active={showCalendar}
                                                >
                                                    <div className="quote-list__date-picker">
                                                        <DatePicker
                                                            month={month}
                                                            year={year}
                                                            onChange={
                                                                setSelectedDates
                                                            }
                                                            onMonthChange={
                                                                handleMonthChange
                                                            }
                                                            selected={
                                                                selectedDates
                                                            }
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
                                                        {
                                                            content:
                                                                "Refresh data",
                                                        },
                                                        {
                                                            content:
                                                                "Export quote list",
                                                        },
                                                    ]}
                                                />
                                            </Popover>
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
                                                    {
                                                        title: "Customer Information",
                                                    },
                                                    {
                                                        title: "Assign Salesperson",
                                                    },
                                                    {title: "Create Time"},
                                                    {title: "Logs"},
                                                    {title: "Actions"},
                                                ]}
                                                sortable={[
                                                    true,
                                                    false,
                                                    false,
                                                    false,
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
                        </Box>
                    ) : (
                        <Box padding={"10"}>
                            <AlphaStack fullWidth align={"center"}>
                                <Card>
                                    <Card.Section>
                                        <Box
                                            paddingBlockEnd={"12"}
                                            paddingBlockStart={"4"}
                                        >
                                            <AlphaStack align={"center"}>
                                                <img
                                                    alt={"empty quote"}
                                                    src={Images.emptyQuote}
                                                />
                                                <Text
                                                    variant={"headingMd"}
                                                    as={"h1"}
                                                >
                                                    This is where you'll manage
                                                    your trashed quote
                                                </Text>
                                                <Text
                                                    variant={"bodySm"}
                                                    as={"p"}
                                                    fontWeight={"regular"}
                                                >
                                                    You can edit and restore
                                                    quote that you trashed
                                                </Text>
                                            </AlphaStack>
                                        </Box>
                                    </Card.Section>
                                </Card>
                            </AlphaStack>
                        </Box>
                    )}
                </>
            ),
        },
        {
            id: "quote-abandon",
            content: "Abandon Quote",
            ui: (
                <Box padding={"10"}>
                    <AlphaStack fullWidth align={"center"}>
                        <Card>
                            <Card.Section>
                                <Box
                                    paddingBlockEnd={"12"}
                                    paddingBlockStart={"4"}
                                >
                                    <AlphaStack align={"center"}>
                                        <img
                                            alt={"empty quote"}
                                            src={Images.emptyQuote}
                                        />
                                        <Text variant={"headingMd"} as={"h1"}>
                                            This is where you'll manage your
                                            Abandon quote
                                        </Text>
                                        <Text
                                            variant={"bodySm"}
                                            as={"p"}
                                            fontWeight={"regular"}
                                        >
                                            When your customer has not submitted
                                            a quote request, a abandoned quote
                                            will be created
                                        </Text>
                                    </AlphaStack>
                                </Box>
                            </Card.Section>
                        </Card>
                    </AlphaStack>
                </Box>
            ),
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

            </Page>
            {/*-------> Modal delete quote list*/}
            <Modal
                open={showModalQuoteDelete}
                title={"Delete this quote"}
                onClose={handleModalQuoteDelete}
            >
                <div className="quote-list__modal-delete">
                    <Modal.Section>
                        <TextContainer>
                            <Text variant={"bodyLg"} as={"p"}>
                                Are you sure you want to delete this quote?
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                Or move this quote to trash?
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                The quote has been in 60 days if it's in trashed
                                box.
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                This action cannot be undone.
                            </Text>
                        </TextContainer>
                    </Modal.Section>
                    <Modal.Section>
                        <div className="d-flex flex-row-reverse">
                            <ButtonGroup>
                                <Button>Move to Trashed</Button>
                                <Button destructive onClick={handleDeleteQuote}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Modal.Section>
                </div>
            </Modal>
            {/*-------> modal delete trashed quote list */}
            <Modal
                open={showModalTrashedQuoteDelete}
                title={"Delete this quote"}
                onClose={handleModalTrashedQuoteDelete}
            >
                <div className="quote-list__modal-delete">
                    <Modal.Section>
                        <TextContainer>
                            <Text variant={"bodyLg"} as={"p"}>
                                Are you sure you want to delete this trashed
                                quote?
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                Or move this quote to trash?
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                The quote has been in 60 days if it's in trashed
                                box.
                            </Text>
                            <Text variant={"bodyLg"} as={"p"}>
                                This action cannot be undone.
                            </Text>
                        </TextContainer>
                    </Modal.Section>
                    <Modal.Section>
                        <div className="d-flex flex-row-reverse">
                            <ButtonGroup>
                                <Button>Move to Trashed</Button>
                                <Button
                                    destructive
                                    onClick={handleDeleteTrashedQuote}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Modal.Section>
                </div>
            </Modal>
        </section>
    );
}

export default QuoteListPage;
