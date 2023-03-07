import {
    AlphaStack,
    Box,
    Card,
    Text,
    Button,
    TextField,
    ButtonGroup,
    Stack,
    Popover,
    Icon,
    ActionList, IndexTable, Pagination, Select, useIndexResourceState, Modal, TextContainer
} from "@shopify/polaris";
import Images from "../../../assets/Images";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getAbandonedQuoteListFilterApi} from "../../../redux/abandonedQuoteListSlice";
import {useDispatch, useSelector} from "react-redux";
import ModalQuickView from "../ModalQuickView";
import {CalendarMinor, CalendarTickMajor, FilterMajor, SettingsMinor} from "@shopify/polaris-icons";
import {DatePickerFilter} from "../DatePickerFilter";
import {SalePersonFilterTag} from "../SalePersonFilterTag";
import {SalePersonFilter} from "../SalePersonFilter";
import {TrashedQuoteListRow} from "../TrashQuoteList/TrashedQuoteListRow";
import {OptionsPageIndex} from "../DataItemQuoteList";
import {getTrashedQuoteListFilterApi} from "../../../redux/trashedQuoteListSlice";
import {AbandonedQuoteListRow} from "./AbandonedQuoteListRow";

export const AbandonedQuoteList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const abandonedQuoteList = useSelector(
        (state) => state.abandonedQuoteList.abandonedQuote
    );
    const [quoteId, setQuoteId] = useState();

    const [showModal, setShowModal] = useState(false);
    const [quoteDetail, setQuoteDetail] = useState({});
    const [textFieldValue, setTextFieldValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndexTable, setSelectedIndexTable] = useState(10);
    const [togglePopoverActiveFilter, setTogglePopoverActive] = useState(false);
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);

    const [selectedTagFilter, setSelectedTagFilter] = useState()
    // xu ly popover filter date

    const [showModalQuoteDelete, setShowModalQuoteDelete] =
        useState(false);

    const handleChangeModal = (quote) => {
        setShowModal(!showModal);
        setQuoteDetail(quote);
    };

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event);
    };

    let {selectedResources, allResourcesSelected, handleSelectionChange, clearSelection, removeSelectedResources} =
        useIndexResourceState(abandonedQuoteList)


    const handleSelectIndexPageChange = useCallback(
        (value) => setSelectedIndexTable(value),
        []
    );


    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const handleTogglePopoverActiveDate = () => {
        setTimeout(() => {
            setOnShowCalendar(false);
        }, 100)

        setTogglePopoverActive(!togglePopoverActiveFilter)
    }

    const handleRefreshData = () => {
        setPopoverActive(false)
        dispatch(getAbandonedQuoteListFilterApi());
    }

    const handleDeleteSelected = () => {
        setShowModalQuoteDelete(true)
        setQuoteId(selectedResources)
        // dispatch(deleteQuoteApi2(selectedResources))
        // dispatch(getQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
    }

    const handleDeleteQuote = () => {
        setShowModalQuoteDelete(false);
        // dispatch(deleteTrashedQuote(quoteId));
    };

    const handleSelectedAllQuotes = () => {
        let ele = document.getElementsByClassName('Polaris-Checkbox__Input');
        ele[0].click();
    }

    const handleModalAbandonedQuoteDelete = (e,id) => {
        e.preventDefault();
        e.stopPropagation();
        setQuoteId(id);
        setShowModalQuoteDelete(!showModalQuoteDelete);
    }

    useEffect(() => {
        dispatch(getAbandonedQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter));
    }, [currentPage, selectedIndexTable, textFieldValue, selectedTagFilter]);

    return (
        <>
            {abandonedQuoteList?.length !== 0 ?
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
                                                placeholder={
                                                    "search by Quote Id"
                                                }
                                                value={textFieldValue}
                                                onChange={handleTextFieldChange}
                                            />
                                        </div>

                                        <ButtonGroup>
                                            <Popover
                                                active={togglePopoverActiveFilter}
                                                activator=
                                                    {
                                                        <Button
                                                            onClick={handleTogglePopoverActiveDate}>
                                                            <div
                                                                className={"flex d-flex justify-content-center align-items-center gap-2 px-4"}>
                                                                {selectedTagFilter ? selectedTagFilter : "Choose time"}
                                                                <Icon source={CalendarMinor}/>
                                                            </div>
                                                        </Button>

                                                    }
                                                onClose={handleTogglePopoverActiveDate}
                                            >
                                                <div>
                                                    <DatePickerFilter
                                                        setOnShowCalendar={setOnShowCalendar}
                                                        setTogglePopoverActive={setTogglePopoverActive}
                                                        setSelectedTagFilter={setSelectedTagFilter}
                                                    />
                                                </div>

                                            </Popover>

                                            <Popover
                                                active={popoverActive}
                                                activator={
                                                    <Button onClick={togglePopoverActive} icon={SettingsMinor}/>
                                                }
                                                onClose={togglePopoverActive}
                                            >
                                                <ActionList
                                                    actionRole="menuitem"
                                                    items={[
                                                        {
                                                            content: "Refresh data",
                                                            onAction: handleRefreshData
                                                        },
                                                        {
                                                            content:
                                                                "Export quote list",
                                                        },
                                                    ]}
                                                />
                                            </Popover>

                                        </ButtonGroup>
                                    </>
                                    :
                                    <ButtonGroup segmented>
                                        <Button disabled><Text as={"h1"}
                                                               variant={"bodyMd"}>{selectedResources.length + " "}
                                            selected</Text></Button>
                                        <Button><Text as={"h1"} variant={"bodyMd"}>Export
                                            Selected</Text></Button>
                                        <Button
                                            onClick={handleDeleteSelected}>
                                            <Text as={"h1"}
                                                  variant={"bodyMd"}>Delete Selected
                                            </Text>
                                        </Button>
                                        {selectedResources.length > 0 && selectedResources.length !== abandonedQuoteList.length &&
                                            <Box paddingInlineStart={"4"}>
                                                <Button onClick={handleSelectedAllQuotes} removeUnderline plain>
                                                    <Text as={"h1"} variant={"bodyMd"}>Selected all quotes
                                                    </Text>
                                                </Button>
                                            </Box>
                                        }
                                        {selectedResources.length === abandonedQuoteList.length &&
                                            <Box paddingInlineStart={"4"}>
                                                <Button
                                                    onClick={() => {
                                                        clearSelection();

                                                    }}
                                                    removeUnderline
                                                    plain>
                                                    <Text as={"h1"} variant={"bodyMd"}>
                                                        Unselected all quotes
                                                    </Text>
                                                </Button>
                                            </Box>}
                                    </ButtonGroup>
                                }

                            </div>
                            <Card.Section>
                                <div className="quote-list__data-table">
                                    <IndexTable
                                        itemCount={abandonedQuoteList.length}
                                        selectedItemsCount={
                                            selectedResources.length
                                        }
                                        onSelectionChange={
                                            handleSelectionChange
                                        }
                                        headings={
                                            selectedResources.length === 0
                                                ?
                                                [
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Quote Id</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Email Customer</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Product List</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Update At</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>IP</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Actions</Text>
                                                    },
                                                ]
                                                :
                                                [
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Quote Id</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Email Customer</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Product List</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>Update At</Text>
                                                    },
                                                    {
                                                        title: <Text variant={"bodyMd"} as={"h1"}
                                                                     fontWeight={"semibold"}>IP</Text>
                                                    },
                                                ]


                                        }
                                        sortable={[
                                            true,
                                            false,
                                            false,
                                            true,
                                            true,
                                            false,
                                        ]}
                                    >
                                        <AbandonedQuoteListRow
                                            abandonedQuoteList={abandonedQuoteList}
                                            handleChangeModal={handleChangeModal}
                                            handleModalAbandonedQuoteDelete={handleModalAbandonedQuoteDelete}
                                            selectedResources={selectedResources}
                                        />
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
                :
                <Box padding={"10"}>
                    <AlphaStack align={"center"}>
                        <Card>
                            <Card.Section>
                                <Box
                                    padding={"20"}
                                >
                                    <AlphaStack align={"center"}>
                                        <img
                                            alt={"empty quote"}
                                            src={Images.emptyAbandonedQuote}
                                        />
                                        <div className={"abandoned-quote-list-empty-text-heading"}>
                                            <Text variant={"headingMd"} as={"h1"} fontWeight={"medium"}>
                                                Save lost sales from unsubmitted quotes
                                            </Text>
                                        </div>

                                        <Text
                                            variant={"bodyMd"}
                                            as={"p"}
                                            color={""}
                                            fontWeight={"regular"}
                                            color={'subdued'}
                                        >
                                            Your abandoned quote list is empty. Collect more quotes with our
                                            <span> </span>
                                            <Button plain onClick={() => navigate("/")}>
                                                <Text
                                                    variant={"bodyMd"}
                                                    as={"p"}
                                                    fontWeight={"regular"}
                                                >
                                                    {"dynamic forms"}
                                                </Text>
                                            </Button>
                                        </Text>
                                    </AlphaStack>
                                </Box>
                            </Card.Section>
                        </Card>
                    </AlphaStack>
                </Box>
            }

            <Modal
                open={showModalQuoteDelete}
                title={"Delete this quote"}
                onClose={handleModalAbandonedQuoteDelete}
            >
                <div className="quote-list__modal-delete">
                    <Modal.Section>
                        <TextContainer>
                            <Text variant={"bodyLg"} as={"p"}>
                                Do you want to delete this abandoned quote?
                            </Text>
                        </TextContainer>
                    </Modal.Section>
                    <Modal.Section>
                        <div className="d-flex flex-row-reverse">
                            <ButtonGroup>
                                <Button onClick={()=> setShowModalQuoteDelete(false)}>Cancel</Button>
                                <Button
                                    destructive
                                    onClick={handleDeleteQuote}
                                >
                                    Confirm Remove
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Modal.Section>
                </div>
            </Modal>
        </>

    )


}