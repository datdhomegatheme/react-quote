import {AlphaStack, Card, Grid, Text, Box, TextContainer, ButtonGroup, Button, Link, AlphaCard} from "@shopify/polaris";

export const QuoteList = () => {
    return (
        <Box paddingBlockStart={"12"}>
            <AlphaStack align={"center"}>
                <div className={"quote-list-empty"}>
                    <Card>
                        <Box padding={"8"}>
                            <Grid>
                                <Grid.Cell columnSpan={{xs: 3, lg: 6}}>
                                    <Box padding={"4"}>
                                        <TextContainer>
                                            <Text as={"h1"} variant={"headingMd"}>
                                                You can Manage your quotes here.
                                            </Text>
                                            <Text as={"p"} variant={"bodyMd"} fontWeight={"regular"}>
                                                Quote list show all quotes from your customers and manually created
                                                quotes.
                                                You
                                                can
                                                create draft orders from quotes, notify your customers, change quote
                                                status,
                                                etc.
                                            </Text>

                                            <Box paddingBlockStart={"6"} paddingBlockEnd={"4"}>
                                                <ButtonGroup>
                                                    <Button primary>Create a quote</Button>
                                                    <Button>Contact support</Button>
                                                </ButtonGroup>
                                            </Box>


                                            <Text as={"p"} variant={"bodyMd"}>
                                                If you have any issues in setting app, please <Button plain>contact
                                                support</Button> or <Link
                                                    url="https://help.omegatheme.com/en/category/request-a-quote-hide-prices-ut3g14/">
                                                    contact us
                                                </Link>


                                            </Text>
                                        </TextContainer>
                                    </Box>


                                </Grid.Cell>
                                <Grid.Cell columnSpan={{xs: 3, lg: 6}}>
                                    <Box padding={"4"}>

                                        <iframe
                                            className={"quote-list-empty__video"}
                                            title={"How to create manual quotes ?"}
                                            src={"https://www.youtube.com/embed/dLVJClegxzI"}
                                        />
                                        <Box paddingBlockStart={"4"}>
                                            <TextContainer>
                                                <Text as={"p"} variant={"bodyMd"}>
                                                    How to create manual quotes ?
                                                </Text>
                                                <Link
                                                    url={"https://help.omegatheme.com/en/category/request-a-quote-hide-prices-ut3g14/"}>Learn
                                                    more</Link>
                                            </TextContainer>
                                        </Box>
                                    </Box>
                                </Grid.Cell>
                            </Grid>
                        </Box>
                    </Card>
                </div>
            </AlphaStack>
        </Box>


    )


}