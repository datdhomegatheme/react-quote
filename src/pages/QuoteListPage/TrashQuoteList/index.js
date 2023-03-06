import {
    ActionList, AlphaStack,
    Box,
    Button,
    ButtonGroup,
    Card,
    DatePicker,
    IndexTable, List, Modal,
    Popover,
    Select, Text, TextContainer,
    TextField
} from "@shopify/polaris";
import ModalQuickView from "../ModalQuickView";
import {OptionsPageIndex} from "../DataItemQuoteList";
import Images from "../../../assets/Images";
import {useDispatch, useSelector} from "react-redux";
import {CircleDownMajor, DeleteMinor, ViewMinor} from "@shopify/polaris-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteTrashedQuote} from "../../../redux/trashedQuoteListSlice";


export const TrashQuoteList = (...props) => {

    console.log("render !!!")

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const trashedQuoteList = useSelector(
        (state) => state.trashedQuoteList.data
    );


    const [showModal, setShowModal] = useState(false);

    const [quoteDetail, setQuoteDetail] = useState({});

    const [quoteId, setQuoteId] = useState();

    // --------> logic modal delete trashed quote
    const [showModalTrashedQuoteDelete, setShowModalTrashedQuoteDelete] =
        useState(false);

    // --------> logic delete trashed quote
    const handleDeleteTrashedQuote = () => {
        setShowModalTrashedQuoteDelete(false);
        dispatch(deleteTrashedQuote(quoteId));
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

    // const rowMarkupTrashedQuoteLists = trashedQuoteList?.map((quote, index) => (
    //     <IndexTable.Row
    {/*        id={quote.id}*/}
    {/*        key={index}*/}
    {/*        selected={props.selectedResources.includes(quote.id)}*/}
    {/*        position={index}*/}
    //     >
    //         <IndexTable.Cell>{quote.id}</IndexTable.Cell>
    //         <IndexTable.Cell>
    //             <Text variant="bodyMd" as="p">
    //                 <Text variant={"headingSm"} as="span" fontWeight="bold">
    //                     Name:
    //                 </Text>
    //                 <br/>
    //                 {quote.customerInformation.name}
    //                 <br/>
    {/*            </Text>*/}
    {/*            <Button*/}
    {/*                removeUnderline*/}
    {/*                onClick={(e) => {*/}
    //                     e.preventDefault();
    //                     e.stopPropagation();
    //                     handleChangeModal(quote);
    //                 }}
    //                 plain
    {/*            >*/}
    //                 Quick View
    //             </Button>
    //         </IndexTable.Cell>
    //         <IndexTable.Cell>{quote.assignSalesperson + " "}</IndexTable.Cell>
    //         <IndexTable.Cell>
    //             <Text variant="bodyMd" as="p">
    //                 {quote.createTime.date}
    //                 <br/>
    {/*                {quote.createTime.time}*/}
    {/*            </Text>*/}
    {/*        </IndexTable.Cell>*/}

    {/*        <IndexTable.Cell>*/}
    {/*            {quote.logs === `Send Email Successful` && (*/}
    {/*                <List.Item>*/}
    {/*                    <Text variant="bodyMd" as="span">*/}
    {/*                        {quote.logs}*/}
    {/*                    </Text>*/}
    {/*                </List.Item>*/}
    {/*            )}*/}
    {/*            {quote.logs === `Email has not been sent to customer` && (*/}
    {/*                <List.Item>*/}
    {/*                    <Text color="warning" variant="bodyMd" as="span">*/}
    {/*                        {quote.logs}*/}
    {/*                    </Text>*/}
    {/*                </List.Item>*/}
    {/*            )}*/}
    {/*        </IndexTable.Cell>*/}
    {/*        <IndexTable.Cell>*/}
    {/*            <ButtonGroup>*/}
    {/*                <div className="data-table__btn-view">*/}
    //                     <Button
    //                         onClick={(e) => {
    //                             navigate(`${quote.id}`);
    //                             e.preventDefault();
    {/*                            e.stopPropagation();*/}
    //                         }}
    //                         plain
    //                         icon={ViewMinor}
    //                     />
    //                 </div>
    //                 <div
    //                     className={
    //                         "data-table__btn-restore d-flex justify-content-center "
    //                     }
    //                 >
    //                     <Button
    //                         plain
    //                         icon={CircleDownMajor}
    //                         onClick={(e) => {
    //                             alert("quote restored !!");
    //                             e.preventDefault();
    {/*                            e.stopPropagation();*/}
    {/*                        }}*/}
    {/*                    />*/}
    //                 </div>
    //                 <Button
    //                     plain
    //                     icon={DeleteMinor}
    //                     onClick={(e) =>
    //                         handleModalTrashedQuoteDelete(e, quote.id)
    //                     }
    //                 />
    //             </ButtonGroup>
    //         </IndexTable.Cell>
    //     </IndexTable.Row>
    // ));


    return (
        <>
            <div>he</div></>
        // <>
        //     {trashedQuoteList.length !== 0 ? (
        //         <Box padding={"4"}>
        //             <Card>
        //                 <Card.Section>
        //                     <ModalQuickView
        //                         handleChangeModal={handleChangeModal}
        //                         showModal={showModal}
        //                         quote={quoteDetail}
        //                     />
        //                     <div className="quote-list__card-wrapper">
        //                         <div className="card-wrapper__btn-search">
        //                             <TextField
        //                                 placeholder={
        //                                     "search by Quote Id"
        //                                 }
        //                                 value={props.textFieldValue}
        //                                 onChange={props.handleTextFieldChange}
        //                             />
        //                         </div>
        //                         <ButtonGroup>
        //                             <div className="quote-list__popover-calendar">
        //                                 <Popover
        //                                     active={props.showCalendar}
        //                                 >
        //                                     <div className="quote-list__date-picker">
        //                                         <DatePicker
        //                                             month={props.month}
        //                                             year={props.year}
        //                                             onChange={
        //                                                 setSelectedDates
        //                                             }
        //                                             onMonthChange={
        //                                                 handleMonthChange
        //                                             }
        //                                             selected={
        //                                                 selectedDates
        //                                             }
        //                                             multiMonth
        //                                             allowRange
        //                                         />
        //                                         <div className="quote-list__date-picker__btn-group">
        //                                             <ButtonGroup>
        //                                                 <Button
        //                                                     onClick={
        //                                                         handleDateResetButton
        //                                                     }
        //                                                 >
        //                                                     Reset
        //                                                 </Button>
        //                                                 <Button
        //                                                     primary
        //                                                     onClick={
        //                                                         handleDateApplyButton
        //                                                     }
        //                                                 >
        //                                                     Apply
        //                                                 </Button>
        //                                             </ButtonGroup>
        //                                         </div>
        //                                     </div>
        //                                 </Popover>
        //                             </div>
        //
        //                             <Popover
        //                                 active={popoverActive}
        //                                 activator={buttonSelect}
        //                                 onClose={togglePopoverActive}
        //                             >
        //                                 <ActionList
        //                                     actionRole="menuitem"
        //                                     items={[
        //                                         {
        //                                             content:
        //                                                 "Refresh data",
        //
        //                                             action: handleRefreshData
        //
        //                                         },
        //                                         {
        //                                             content:
        //                                                 "Export quote list",
        //                                         },
        //                                     ]}
        //                                 />
        //                             </Popover>
        //                         </ButtonGroup>
        //                     </div>
        //                     <Card.Section>
        //                         <div className="quote-list__data-table">
        //                             <IndexTable
        //                                 itemCount={quoteList.length}
        //                                 selectedItemsCount={
        //                                     allResourcesSelected
        //                                         ? "All"
        //                                         : selectedResources.length
        //                                 }
        //                                 onSelectionChange={
        //                                     handleSelectionChange
        //                                 }
        //                                 headings={[
        //                                     {title: "Quote Id"},
        //                                     {
        //                                         title: "Customer Information",
        //                                     },
        //                                     {
        //                                         title: "Assign Salesperson",
        //                                     },
        //                                     {title: "Create Time"},
        //                                     {title: "Logs"},
        //                                     {title: "Actions"},
        //                                 ]}
        //                                 sortable={[
        //                                     true,
        //                                     false,
        //                                     false,
        //                                     false,
        //                                     true,
        //                                     false,
        //                                 ]}
        //                             >
        //                                 {rowMarkupTrashedQuoteLists}
        //                             </IndexTable>
        //                             <div
        //                                 className={
        //                                     "quote-list__select-index-table"
        //                                 }
        //                             >
        //                                 <Select
        //                                     options={OptionsPageIndex}
        //                                     onChange={
        //                                         handleSelectIndexPageChange
        //                                     }
        //                                     value={selectedIndexTable}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </Card.Section>
        //                 </Card.Section>
        //             </Card>
        //         </Box>
        //     ) : (
        //         <Box padding={"10"}>
        //             <AlphaStack fullWidth align={"center"}>
        //                 <Card>
        //                     <Card.Section>
        //                         <Box
        //                             paddingBlockEnd={"12"}
        //                             paddingBlockStart={"4"}
        //                         >
        //                             <AlphaStack align={"center"}>
        //                                 <img
        //                                     alt={"empty quote"}
        //                                     src={Images.emptyQuote}
        //                                 />
        //                                 <Text
        //                                     variant={"headingMd"}
        //                                     as={"h1"}
        //                                 >
        //                                     This is where you'll manage
        //                                     your trashed quote
        //                                 </Text>
        //                                 <Text
        //                                     variant={"bodySm"}
        //                                     as={"p"}
        //                                     fontWeight={"regular"}
        //                                 >
        //                                     You can edit and restore
        //                                     quote that you trashed
        //                                 </Text>
        //                             </AlphaStack>
        //                         </Box>
        //                     </Card.Section>
        //                 </Card>
        //             </AlphaStack>
        //         </Box>
        //     )}
        //
        //     <Modal
        //         open={showModalTrashedQuoteDelete}
        //         title={"Delete this quote"}
        //         onClose={handleModalTrashedQuoteDelete}
        //     >
        //         <div className="quote-list__modal-delete">
        //             <Modal.Section>
        //                 <TextContainer>
        //                     <Text variant={"bodyLg"} as={"p"}>
        //                         Are you sure you want to delete this trashed
        //                         quote?
        //                     </Text>
        //                     <Text variant={"bodyLg"} as={"p"}>
        //                         Or move this quote to trash?
        //                     </Text>
        //                     <Text variant={"bodyLg"} as={"p"}>
        //                         The quote has been in 60 days if it's in trashed
        //                         box.
        //                     </Text>
        //                     <Text variant={"bodyLg"} as={"p"}>
        //                         This action cannot be undone.
        //                     </Text>
        //                 </TextContainer>
        //             </Modal.Section>
        //             <Modal.Section>
        //                 <div className="d-flex flex-row-reverse">
        //                     <ButtonGroup>
        //                         <Button>Move to Trashed</Button>
        //                         <Button
        //                             destructive
        //                             onClick={handleDeleteTrashedQuote}
        //                         >
        //                             Delete
        //                         </Button>
        //                     </ButtonGroup>
        //                 </div>
        //             </Modal.Section>
        //         </div>
        //     </Modal>
        // </>
        )

}