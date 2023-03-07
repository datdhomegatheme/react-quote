import {Box, Button, ButtonGroup, IndexTable, List, Text} from "@shopify/polaris";
import {CircleDownMajor, DeleteMinor, EmailMajor, InviteMinor, ViewMinor} from "@shopify/polaris-icons";
import {useNavigate} from "react-router-dom";
import ModalSendEmail from "../ModalSendEmail";
import {useState} from "react";

export const AbandonedQuoteListRow = (props) => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleChangeModal = () => {
        setShowModal(!showModal)
    }


    return (
        <>
            {props.abandonedQuoteList?.map((quote, index) => (
                <IndexTable.Row
                    id={quote.id}
                    key={index}
                    selected={props.selectedResources.includes(quote.id)}
                    position={index}
                >
                    <IndexTable.Cell>{quote.id}</IndexTable.Cell>
                    <IndexTable.Cell>
                        <Text variant="bodyMd" as="p">
                            {quote.customerInformation.email}

                        </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Box paddingInlineStart={"4"}>
                            <List spacing={"extraTight"} type="bullet">
                                {quote.dataQuoteProductsInformation.map((item, index) => (
                                    <List.Item key={index}>{item.product}</List.Item>
                                ))}
                            </List>
                        </Box>


                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Text variant="bodyMd" as="p">
                            {quote.createTime.date + " " + quote.createTime.time}
                        </Text>
                    </IndexTable.Cell>

                    <IndexTable.Cell>

                        <Text variant="bodyMd" as="span">
                            {quote.ip}
                        </Text>

                    </IndexTable.Cell>

                    {props.selectedResources.length === 0 &&
                        <IndexTable.Cell>
                            <ButtonGroup>
                                <div
                                    className={
                                        "data-table__btn-restore d-flex justify-content-center"
                                    }
                                >
                                    <Button
                                        plain
                                        icon={InviteMinor}
                                        onClick={(e) => {
                                            handleChangeModal();
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    />
                                </div>

                                <div className="data-table__btn-view d-flex justify-content-center">
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

                                <div className="data-table__btn-delete d-flex justify-content-center">
                                    <Button
                                        plain
                                        icon={DeleteMinor}
                                        onClick={(e) =>
                                            props.handleModalAbandonedQuoteDelete(e, quote.id)
                                        }
                                    />
                                </div>
                            </ButtonGroup>
                        </IndexTable.Cell>

                    }

                </IndexTable.Row>
            ))}
                <ModalSendEmail showModal={showModal}
                                handleChangeModal={handleChangeModal}
                                quote={props.abandonedQuoteList}
                />
        </>

    )
}