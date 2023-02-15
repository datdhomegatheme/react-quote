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
    Image,
    Box,
    Form,
    FormLayout,
    TextContainer,
    Select,
    Checkbox,
    Combobox,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { SearchMajor } from "@shopify/polaris-icons";
import Images from "../../../assets/Images";
import { ImportMinor } from "@shopify/polaris-icons";

import { DeleteMinor } from "@shopify/polaris-icons";

function QuoteListDetail() {
    //logic text field search
    const [textValueSearch, setTextValueSearch] = useState("");
    const handleTextValueSearchChange = useCallback(
        (value) => setTextValueSearch(value),
        []
    );

    //logic expired day checkbox
    const [checkExpiredDay, setCheckExpiredDay] = useState(false);
    const handleCheckExpiredDay = () => {
        setCheckExpiredDay(!checkExpiredDay);
    };

    //logic expired day Datepicker
    const [datePickerExpiredDay, setDatePickerExpiredDay] = useState(
        new Date()
    );
    const handleDatePickerExpiredDay = () => {};

    //logic search comboBox
    // const

    return (
        <div className="quote-view-detail">
            <Page
                fullWidth
                breadcrumbs={[{ url: "/quote/list" }]}
                title="Quote #id"
                subtitle="update by Admin Otc 11, 10:13 pm"
                secondaryActions={[
                    {
                        icon: ImportMinor,
                        content: "Export",
                    },
                ]}
                actionGroups={[
                    {
                        title: "More actions",
                        actions: [
                            {
                                content: "Cancel Quote",
                                onAction: () => alert("Cancel Quote"),
                            },
                            {
                                content: "Delete Quote",
                                onAction: () => alert("Delete Quote"),
                            },
                        ],
                    },
                ]}
                primaryAction={{
                    content: "Create draft order",
                }}
            >
                <Page fullWidth>
                    <Grid columns={{ xs: 12 }}>
                        <Grid.Cell columnSpan={{ lg: 8 }}>
                            <div className="quote-view-detail__product">
                                <Card
                                    title={
                                        <Text variant="headingLg" as="h1">
                                            Products
                                        </Text>
                                    }
                                >
                                    <Card.Section>
                                        <div className="product__search">
                                            <Combobox
                                                activator={
                                                    <Combobox.TextField
                                                        prefix={
                                                            <Icon
                                                                source={
                                                                    SearchMajor
                                                                }
                                                            />
                                                        }
                                                        placeholder="Search"
                                                    />
                                                }
                                            ></Combobox>
                                            {/* <div className="search__icon">
                                                <Icon source={SearchMajor} />
                                            </div>
                                            <div className="search__text">
                                                <TextField
                                                    placeholder="Search products"
                                                    value={textValueSearch}
                                                    onChange={
                                                        handleTextValueSearchChange
                                                    }
                                                />
                                            </div> */}
                                        </div>
                                        <div className="product__heading">
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{ xs: 6 }}
                                                >
                                                    <div className="heading__product">
                                                        <Grid>
                                                            <Text
                                                                variant="headingMd"
                                                                as={"h1"}
                                                            >
                                                                Product
                                                            </Text>
                                                        </Grid>
                                                    </div>
                                                </Grid.Cell>
                                                <Grid.Cell
                                                    columnSpan={{ xs: 6 }}
                                                >
                                                    <Grid>
                                                        <Grid.Cell
                                                            columnSpan={{
                                                                xs: 3,
                                                            }}
                                                        >
                                                            <div className="product__quantity">
                                                                <Text
                                                                    variant="headingMd"
                                                                    as={"h1"}
                                                                >
                                                                    Quantity
                                                                </Text>
                                                            </div>
                                                        </Grid.Cell>
                                                        <Grid.Cell
                                                            columnSpan={{
                                                                xs: 3,
                                                            }}
                                                        >
                                                            <div className="product__price">
                                                                <Text
                                                                    variant="headingMd"
                                                                    as={"h1"}
                                                                >
                                                                    Price
                                                                </Text>
                                                            </div>
                                                        </Grid.Cell>
                                                    </Grid>
                                                </Grid.Cell>
                                            </Grid>
                                        </div>
                                    </Card.Section>

                                    <Card.Section>
                                        <div className="product__list">
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{ xs: 6 }}
                                                >
                                                    <div className="products__list__cell-product">
                                                        <img
                                                            className="cell-product__image"
                                                            alt="white-background-product-photography-example"
                                                            src={
                                                                Images.productExample
                                                            }
                                                        />
                                                        <div className="cell-product__content">
                                                            <Button plain>
                                                                <Text
                                                                    variant="bodyLg"
                                                                    as="h1"
                                                                >
                                                                    Product A
                                                                </Text>
                                                            </Button>
                                                            <Text
                                                                variant="bodyMd"
                                                                as="h1"
                                                            >
                                                                40 / Black
                                                            </Text>
                                                            <Text
                                                                variant="bodyMd"
                                                                as="h1"
                                                            >
                                                                SKU: 21345
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Grid.Cell>

                                                <Grid.Cell
                                                    columnSpan={{ xs: 6 }}
                                                >
                                                    <div className="product__list__quantity-price">
                                                        <Grid>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 3,
                                                                }}
                                                            >
                                                                <div className="products__list__quantity">
                                                                    <TextField
                                                                        type="number"
                                                                        autoComplete="off"
                                                                    />
                                                                </div>
                                                            </Grid.Cell>

                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 3,
                                                                }}
                                                            >
                                                                <div className="products__list__price">
                                                                    <TextField
                                                                        type="number"
                                                                        autoComplete="off"
                                                                    />
                                                                </div>
                                                            </Grid.Cell>

                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 3,
                                                                }}
                                                            >
                                                                <div className="products__list__price">
                                                                    <Text
                                                                        variant="bodyMd"
                                                                        as="h1"
                                                                    >
                                                                        200$
                                                                    </Text>
                                                                </div>
                                                            </Grid.Cell>
                                                            <Grid.Cell
                                                                columnSpan={{
                                                                    xs: 3,
                                                                }}
                                                            >
                                                                <div className="products__list__price">
                                                                    <Icon
                                                                        source={
                                                                            DeleteMinor
                                                                        }
                                                                    />
                                                                </div>
                                                            </Grid.Cell>
                                                        </Grid>
                                                    </div>
                                                </Grid.Cell>
                                            </Grid>
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>

                            <div className="quote-view-detail__card">
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
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            Subtotal
                                                        </Text>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Button plain>
                                                            <Text
                                                                variant="bodyLg"
                                                                as="h1"
                                                            >
                                                                Add discount
                                                            </Text>
                                                        </Button>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Button plain>
                                                            <Text
                                                                variant="bodyLg"
                                                                as="h1"
                                                            >
                                                                Add shipping
                                                            </Text>
                                                        </Button>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            Total
                                                        </Text>
                                                    </tr>
                                                </th>
                                                <th className="payment__content__value">
                                                    <tr className="content__title">
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            600$
                                                        </Text>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            0$
                                                        </Text>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            0$
                                                        </Text>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            600$
                                                        </Text>
                                                    </tr>
                                                </th>
                                            </table>
                                        </Card.Section>
                                        <Card.Section>
                                            <div className="payment__buttons">
                                                <ButtonGroup>
                                                    <Button primary>
                                                        Send Email
                                                    </Button>
                                                    <Button>
                                                        Mark as purchased
                                                    </Button>
                                                    <Button>
                                                        Mark as unread
                                                    </Button>
                                                </ButtonGroup>
                                            </div>
                                        </Card.Section>
                                    </Card>
                                </div>

                                <div className="quote-view-detail__card">
                                    <Card title="Viewed Product List">
                                        <Card.Section>
                                            <div className="card__viewed-product-list">
                                                <img
                                                    alt="white-background-product-photography-example"
                                                    src={Images.productExample}
                                                />
                                                <div className="viewed-product-list__content">
                                                    <Button plain>
                                                        <Text
                                                            variant="bodyLg"
                                                            as="h1"
                                                        >
                                                            Product A
                                                        </Text>
                                                    </Button>
                                                    <Text
                                                        variant="bodyMd"
                                                        as="h1"
                                                    >
                                                        Date visit: 2022-10-12
                                                        13:16:43 Viewed: 2 times
                                                    </Text>
                                                </div>
                                            </div>
                                        </Card.Section>
                                    </Card>
                                </div>

                                <div className="quote-view-detail__timeline">
                                    <Box>
                                        <Text variant="headingMd" as="h1">
                                            Timeline
                                        </Text>
                                        <Divider borderStyle="base" />
                                        <div className="timeline__comment">
                                            <Form>
                                                <FormLayout>
                                                    <TextField
                                                        autoComplete="off"
                                                        placeholder="leave a comment..."
                                                    />
                                                    <div className="status__btn">
                                                        <Button submit>
                                                            Post
                                                        </Button>
                                                    </div>
                                                </FormLayout>
                                            </Form>
                                        </div>
                                        <div className="timeline__status">
                                            <Text variant="headingSm" as="h1">
                                                13/10/2022 13:48:46
                                            </Text>
                                            <Text variant="bodyMd" as="p">
                                                Customer Sent Quote
                                            </Text>

                                            <Button plain>Show Details</Button>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ lg: 4 }}>
                            <Card title="Additional Details">
                                <Card.Section>
                                    <TextContainer>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Date
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            October 5, 2022 12:00
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Name
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            Omega test
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Email
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            lynn@omegatheme.com
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Pickup & Return
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            Delivery
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Message
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            ola ola message
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            I agree with the terms and
                                            conditions
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            yes
                                        </Text>
                                    </TextContainer>
                                </Card.Section>
                            </Card>
                            <Card title={"Salesperson Account"}>
                                <Card.Section>
                                    <Select />
                                </Card.Section>
                            </Card>
                            <Card title={"Expired Day"}>
                                <Card.Section>
                                    <TextContainer>
                                        <Checkbox
                                            label="Set expired day for this quote"
                                            checked={checkExpiredDay}
                                            onChange={handleCheckExpiredDay}
                                        />

                                        <TextField
                                            label={
                                                <Text
                                                    variant="headingSm"
                                                    as="h1"
                                                >
                                                    Expired day
                                                </Text>
                                            }
                                            type="date"
                                        />

                                        <Text variant="bodySm" as="p">
                                            {`Add this variable {order_expired_date} to email content to show expired day`}
                                        </Text>
                                    </TextContainer>
                                </Card.Section>
                            </Card>
                        </Grid.Cell>
                    </Grid>
                </Page>
            </Page>
        </div>
    );
}

export default QuoteListDetail;
