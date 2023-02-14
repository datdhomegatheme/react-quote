import {
    Page,
    Card,
    TextField,
    Icon,
    IndexTable,
    Text,
    Button,
    Grid,
    Divider,
    ButtonGroup,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { SearchMajor } from "@shopify/polaris-icons";

function QuoteListDetail() {
    //login text field search
    const [textValueSearch, setTextValueSearch] = useState("");
    const handleTextValueSearchChange = useCallback(
        (value) => setTextValueSearch(value),
        []
    );

    return (
        <div className="quote-view-detail">
            <Page title="Quote #id" subtitle="update by Admin Otc 11, 10:13 pm">
                <Card
                    title={
                        <Text variant="headingLg" as="h1">
                            Products
                        </Text>
                    }
                >
                    <Card.Section>
                        <div className="quote-view-detail__search">
                            <div className="search__icon">
                                <Icon source={SearchMajor} />
                            </div>
                            <div className="search__text">
                                <TextField
                                    placeholder="Search products"
                                    value={textValueSearch}
                                    onChange={handleTextValueSearchChange}
                                />
                            </div>
                        </div>
                    </Card.Section>
                </Card>

                <div className="quote-view-detail__payment">
                    <Card
                        title={
                            <Text variant="headingLg" as="h1">
                                Payment
                            </Text>
                        }
                    >
                        <Card.Section>
                            <table className="payment__table">
                                <th>
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            Subtotal
                                        </Text>
                                    </tr>
                                    <tr className="content__title">
                                        <Button plain>
                                            <Text variant="bodyLg" as="h1">
                                                Add discount
                                            </Text>
                                        </Button>
                                    </tr>
                                    <tr className="content__title">
                                        <Button plain>
                                            <Text variant="bodyLg" as="h1">
                                                Add shipping
                                            </Text>
                                        </Button>
                                    </tr>
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            Total
                                        </Text>
                                    </tr>
                                </th>
                                <th className="payment__content__value">
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            600$
                                        </Text>
                                    </tr>
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            0$
                                        </Text>
                                    </tr>
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            0$
                                        </Text>
                                    </tr>
                                    <tr className="content__title">
                                        <Text variant="bodyLg" as="h1">
                                            600$
                                        </Text>
                                    </tr>
                                </th>
                            </table>
                        </Card.Section>
                        <Card.Section>
                            <div className="payment__buttons">
                                <ButtonGroup>
                                    <Button primary>Send Email</Button>
                                    <Button>Mark as purchased</Button>
                                    <Button>Mark as unread</Button>
                                </ButtonGroup>
                            </div>
                        </Card.Section>
                    </Card>
                </div>
            </Page>
        </div>
    );
}

export default QuoteListDetail;
