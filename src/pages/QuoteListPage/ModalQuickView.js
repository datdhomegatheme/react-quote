import {
    Button,
    IndexTable,
    Modal,
    Card,
    Divider,
    Text,
} from "@shopify/polaris";

function ModalQuickView({ handleChangeModal, showModal, quote }) {
    return (
        <div>
            <Modal
                large
                open={showModal}
                onClose={handleChangeModal}
                title={"Quick View Quote Information"}
            >
                {quote?.assignSalesperson && (
                    <div>
                        <Modal.Section>
                            <Card.Section title="Products">
                                <Divider borderStyle="base" />
                                <IndexTable
                                    headings={[
                                        { title: "Image" },
                                        { title: "Product" },
                                        { title: "Quantity" },
                                        { title: "Price" },
                                        { title: "Total Price" },
                                    ]}
                                    selectable={false}
                                    itemCount={
                                        quote.dataQuoteProductsInformation
                                            .length
                                    }
                                >
                                    {quote.dataQuoteProductsInformation?.map(
                                        (itemProduct, index) => (
                                            <IndexTable.Row
                                                id={itemProduct.id}
                                                key={index}
                                                position={index}
                                            >
                                                <IndexTable.Cell>
                                                    {itemProduct.image}
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    <Button
                                                        plain
                                                        removeUnderline
                                                    >
                                                        {itemProduct.product}
                                                    </Button>
                                                    <br />
                                                    Default Title
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    {itemProduct.quantity}
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    {itemProduct.price}
                                                </IndexTable.Cell>
                                                <IndexTable.Cell>
                                                    {itemProduct.price *
                                                        itemProduct.quantity}
                                                </IndexTable.Cell>
                                            </IndexTable.Row>
                                        )
                                    )}
                                </IndexTable>
                            </Card.Section>
                        </Modal.Section>
                        <Modal.Section>
                            <Card.Section title="Customer Information">
                                <Divider borderStyle="base" />

                                <Text variant="headingSm" as="h6">
                                    Name:{" "}
                                    <Text variant="bodySm" as="span">
                                        {quote.customerInformation.name}
                                    </Text>
                                </Text>
                                <Text variant="headingSm" as="h6">
                                    Email:{" "}
                                    <Text variant="bodySm" as="span">
                                        {quote.customerInformation.email}
                                    </Text>
                                </Text>
                                <Text variant="headingSm" as="h6">
                                    Message:{" "}
                                    <Text variant="bodySm" as="span">
                                        {quote.customerInformation.message}
                                    </Text>
                                </Text>
                            </Card.Section>
                        </Modal.Section>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ModalQuickView;
