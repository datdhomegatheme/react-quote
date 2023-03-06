import {Button, ButtonGroup, IndexTable, List, Text} from "@shopify/polaris";
import {CircleDownMajor, DeleteMinor, ViewMinor} from "@shopify/polaris-icons";
import {useNavigate} from "react-router-dom";

export const TrashedQuoteListRow = (props) => {
    const navigate = useNavigate();

    return (
        props.trashedQuoteList?.map((quote, index) => (
            <IndexTable.Row
                id={quote.id}
                key={index}
                selected={props.selectedResources.includes(quote.id)}
                position={index}
            >
                <IndexTable.Cell>{quote.id}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text variant="bodyMd" as="p">
                        {quote.customerInformation.name}

                    </Text>
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

                {props.selectedResources.length === 0 &&
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
                                    props.handleModalTrashedQuoteDelete(e, quote.id)
                                }
                            />
                        </ButtonGroup>
                    </IndexTable.Cell>

                }

            </IndexTable.Row>
        ))
    )
}