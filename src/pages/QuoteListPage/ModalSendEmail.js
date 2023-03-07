import {
    AlphaStack,
    Button,
    Card,
    Divider,
    IndexTable,
    Form,
    Modal,
    Text,
    Thumbnail,
    FormLayout,
    Checkbox, TextField, Stack, Box, Columns
} from "@shopify/polaris";

const ModalSendEmail = ({handleChangeModal, showModal, quote}) => {
    const handleSubmit = () => {

    }
    return (
        <Modal
            large
            open={showModal}
            onClose={handleChangeModal}
            title={<Text variant={"headingMd"} as="h1">Send an email</Text>}
        >
            <Modal.Section>
                <Form onSubmit={handleSubmit}>
                    <FormLayout>
                        <div className={"d-flex flex-column gap-3"}>
                            <Stack spacing={"extraLoose"}>
                                <Stack.Item fill>
                                    <TextField label={"To"} autoComplete/>
                                </Stack.Item>
                                <Stack.Item fill>
                                    <TextField label={"From"} autoComplete/>
                                </Stack.Item>
                            </Stack>
                            <TextField label={"Subject"} autoComplete/>
                            <TextField label={"Custom message for this customer"} autoComplete/>
                        </div>
                        <AlphaStack align={"end"}>
                            <Button primary submit>Send email</Button>
                        </AlphaStack>

                    </FormLayout>
                </Form>
            </Modal.Section>

        </Modal>
    );
}
export default ModalSendEmail;
