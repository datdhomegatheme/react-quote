import {
    ActionList, AlphaStack,
    Box,
    Button,
    ButtonGroup,
    Card,
    DatePicker,
    IndexTable, List, Modal, Pagination,
    Popover,
    Select, Stack, Tag, Text, TextContainer,
    TextField, useIndexResourceState
} from "@shopify/polaris";
import ModalQuickView from "../ModalQuickView";
import {OptionsPageIndex} from "../DataItemQuoteList";
import Images from "../../../assets/Images";
import {useDispatch, useSelector} from "react-redux";
import {
    CalendarTickMajor,
    CircleDownMajor,
    DeleteMinor,
    FilterMajor,
    PlusMinor, SettingsMinor,
    ViewMinor
} from "@shopify/polaris-icons";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteTrashedQuote, getTrashedQuoteListFilterApi} from "../../../redux/trashedQuoteListSlice";
import {TrashedQuoteListRow} from "./TrashedQuoteListRow";
import {SalePersonFilterTag} from "../SalePersonFilterTag";
import {SalePersonFilter} from "../SalePersonFilter";
import {getQuoteListFilterApi} from "../../../redux/quoteListSlice";
import {DatePickerFilter} from "../DatePickerFilter";


export const TrashQuoteList = (props) => {

    const dispatch = useDispatch();


    const trashedQuoteList = useSelector(
        (state) => state.trashedQuoteList.trashQuote
    );

    const [showModal, setShowModal] = useState(false);
    const [quoteDetail, setQuoteDetail] = useState({});
    const [textFieldValue, setTextFieldValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndexTable, setSelectedIndexTable] = useState(10);
    const [selectedTagFilter, setSelectedTagFilter] = useState();
    const [salePersonValue, setSalePersonValue] = useState('');
    const [togglePopoverActiveFilter, setTogglePopoverActive] = useState(false);
    const [showCalendar, setOnShowCalendar] = useState(false);
    const [showFilterSalePerson, setShowFilterSalePerson] = useState(false);
    const [popoverActive, setPopoverActive] = useState(false);
    // xu ly popover filter date
    const [togglePopoverActiveTagFilter, setTogglePopoverActiveTagFilter] = useState(false);
    const [showTagCalendar, setOnShowTagCalendar] = useState(false);

    const handleClickSalesperson = () => {
        setShowFilterSalePerson(!showFilterSalePerson)
    }


    const [quoteId, setQuoteId] = useState();
    // --------> logic modal delete trashed quote
    const [showModalTrashedQuoteDelete, setShowModalTrashedQuoteDelete] =
        useState(false);

    // --------> logic delete trashed quote
    const handleDeleteTrashedQuote = () => {
        setShowModalTrashedQuoteDelete(false);
        // dispatch(deleteTrashedQuote(quoteId));
    };


    const handleModalTrashedQuoteDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setQuoteId(id);
        setShowModalTrashedQuoteDelete(!showModalTrashedQuoteDelete);
    };

    const handleChangeModal = (quote) => {
        setShowModal(!showModal);
        setQuoteDetail(quote);
    };

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event);
    };

    let {selectedResources, allResourcesSelected, handleSelectionChange, clearSelection, removeSelectedResources} =
        useIndexResourceState(trashedQuoteList)


    const handleSelectIndexPageChange = useCallback(
        (value) => setSelectedIndexTable(value),
        []
    );

    const handleTogglePopoverActiveFilter = () => {
        setTimeout(() => {
            setOnShowCalendar(false);
            setShowFilterSalePerson(false);
        }, 100)

        setTogglePopoverActive(!togglePopoverActiveFilter)
    }

    const handleTogglePopoverActiveTagFilter = () => {
        setTimeout(() => {
            setOnShowTagCalendar(false);
        }, 100)
        setTogglePopoverActiveTagFilter(!togglePopoverActiveTagFilter)
    }

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );

    const handleRefreshData = () => {
        setPopoverActive(false)
        dispatch(getTrashedQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
    }

    const handleDeleteSelected = () => {
        setShowModalTrashedQuoteDelete(true)
        setQuoteId(selectedResources)
        // dispatch(deleteQuoteApi2(selectedResources))
        // dispatch(getQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
    }

    const handleClickCalendar = () => {
        setOnShowCalendar(!showCalendar);
    };

    const handleSelectedAllQuotes = () => {
        let ele = document.getElementsByClassName('Polaris-Checkbox__Input');
        ele[0].click();
    }

    const handleRemoveTagFilter = () => {
        setSelectedTagFilter()
    }

    const handleToggleTagDateFilter = () => {
        setOnShowTagCalendar(true);
        setTogglePopoverActiveTagFilter(true);
    }

    useEffect(() => {
        dispatch(getTrashedQuoteListFilterApi(currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue))
    }, [currentPage, selectedIndexTable, textFieldValue, selectedTagFilter, salePersonValue]);

    return (
        <>
            {trashedQuoteList?.length !== 0 ? (
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
                                            <Stack spacing={"tight"}>


                                                {selectedTagFilter &&
                                                    <Popover
                                                        active={
                                                            togglePopoverActiveTagFilter
                                                        }
                                                        onClose={handleTogglePopoverActiveTagFilter}
                                                        activator={
                                                            <Tag
                                                                 onRemove={() => handleRemoveTagFilter()}>
                                                                <Button icon={CalendarTickMajor} monochrome
                                                                        removeUnderline plain
                                                                        onClick={handleToggleTagDateFilter}>
                                                                    {selectedTagFilter}
                                                                </Button>
                                                            </Tag>
                                                        }
                                                    >
                                                        <DatePickerFilter
                                                            setSelectedTagFilter={setSelectedTagFilter}
                                                            setOnShowCalendar={setOnShowTagCalendar}
                                                            setTogglePopoverActive={setTogglePopoverActiveTagFilter}
                                                        />

                                                    </Popover>
                                                }

                                                {salePersonValue &&
                                                    <SalePersonFilterTag
                                                        setSalePersonValue={setSalePersonValue}
                                                        salePersonValue={salePersonValue}
                                                        handleTogglePopoverActiveFilter={handleTogglePopoverActiveFilter}
                                                    />
                                                }

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
                                                        <DatePickerFilter
                                                            setOnShowCalendar={setOnShowCalendar}
                                                            setSelectedTagFilter={setSelectedTagFilter}
                                                            setTogglePopoverActive={setTogglePopoverActive}                                                        />
                                                    }
                                                    {showFilterSalePerson && (
                                                        <SalePersonFilter
                                                            handleTogglePopoverActiveFilter={handleTogglePopoverActiveFilter}
                                                            setSalePersonValue={setSalePersonValue}
                                                        />)
                                                    }
                                                </div>

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
                                        {selectedResources.length > 0 && selectedResources.length !== trashedQuoteList.length &&
                                            <Box paddingInlineStart={"4"}>
                                                <Button onClick={handleSelectedAllQuotes} removeUnderline plain>
                                                    <Text as={"h1"} variant={"bodyMd"}>Selected all quotes
                                                    </Text>
                                                </Button>
                                            </Box>
                                        }
                                        {selectedResources.length === trashedQuoteList.length &&
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
                                        itemCount={trashedQuoteList.length}
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
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Quote Id</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Customer Information</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Assign Salesperson</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Create Time</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Logs</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Actions</Text>},
                                                ]
                                                :
                                                [
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Quote Id</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Customer Information</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Assign Salesperson</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Create Time</Text>},
                                                    {title: <Text variant={"bodyMd"} as={"h1"} fontWeight={"semibold"}>Logs</Text>},
                                                ]


                                    }
                                        sortable={[
                                            true,
                                            false,
                                            false,
                                            false,
                                            true,
                                            false,
                                        ]}
                                    >
                                        <TrashedQuoteListRow
                                            trashedQuoteList={trashedQuoteList}
                                            handleChangeModal={handleChangeModal}
                                            handleModalTrashedQuoteDelete={handleModalTrashedQuoteDelete}
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
        </>
    )

}