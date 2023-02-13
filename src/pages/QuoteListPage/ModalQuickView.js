import { Button, IndexTable } from "@shopify/polaris";

function ModalQuickView(id, index, image, product, quantity, price) {
    console.log(123321, id);
    return (
        <IndexTable.Row id={id} key={index} position={index}>
            <IndexTable.Cell>{image}</IndexTable.Cell>
            <IndexTable.Cell>
                <Button plain removeUnderline>
                    {product}
                </Button>
                <br />
                Default Title
            </IndexTable.Cell>
            <IndexTable.Cell>{quantity}</IndexTable.Cell>
            <IndexTable.Cell>{price}</IndexTable.Cell>
            <IndexTable.Cell>{price * quantity}</IndexTable.Cell>
        </IndexTable.Row>
    );
}

export default ModalQuickView;
