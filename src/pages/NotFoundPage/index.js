import {AlphaStack, Box, Card, Page, Text} from "@shopify/polaris";
import Images from "../../assets/Images";

const NotFoundPage = () => {

    return (
        <Page fullWidth breadcrumbs={[{url: "/"}]}>
                <AlphaStack fullWidth align={"center"}>
                    <Card>
                        <Card.Section>
                            <Box paddingBlockEnd={"32"} paddingBlockStart={"32"}>
                                <AlphaStack align={"center"}>
                                    <img className={"icon404"} alt={"empty quote"} src={Images.icon404page}/>
                                    <Text variant={"heading4xl"} as={"h1"}>Page Not Found</Text>
                                    <Text variant={"bodyLg"} as={"p"} fontWeight={"regular"}>We're sorry, the page you requested could not be found</Text>
                                    <Text variant={"bodyLg"} as={"p"} fontWeight={"regular"}>Please go back to the homepage</Text>
                                </AlphaStack>
                            </Box>
                        </Card.Section>
                    </Card>
                </AlphaStack>
        </Page>
    );
}

export default NotFoundPage

