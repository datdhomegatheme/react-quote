import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    Combobox,
    Divider,
    Form,
    FormLayout,
    Grid,
    Icon,
    Modal,
    Page,
    Select,
    Text,
    TextContainer,
    TextField,
} from "@shopify/polaris";
import {useCallback, useMemo, useState} from "react";
import {DeleteMinor, ImportMinor, SearchMajor} from "@shopify/polaris-icons";
import Images from "../../../assets/Images";
import {useParams} from "react-router-dom";

function QuoteListDetail() {

    //get data quote detail
    const quoteId = useParams();

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
    const handleDatePickerExpiredDay = () => {
    };

    //logic search comboBox
    const dataSelectedOptions = useMemo(
        () => [
            {value: 'rustic', label: 'Rustic'},
            {value: 'antique', label: 'Antique'},
            {value: 'vinyl', label: 'Vinyl'},
            {value: 'vintage', label: 'Vintage'},
            {value: 'refurbished', label: 'Refurbished'},
        ],
        [],
    );

    //logic modal discount
    const [activeModalDiscount, setActiveModalDiscount] = useState(false);
    const handleActiveModalDiscount = () => {
        setActiveModalDiscount(!activeModalDiscount);
    }
    //logic modal shipping
    const [activeModalShipping, setActiveModalShipping] = useState(false);
    const handleActiveModalShipping = () => {
        setActiveModalShipping(!activeModalShipping);
    }

    return (
        <div className="quote-view-detail">
            <Page
                fullWidth
                breadcrumbs={[{url: "/quote/list"}]}
                title={"Quote #" + quoteId.id}
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
                    <Grid columns={{xs: 12}}>
                        <Grid.Cell columnSpan={{lg: 8}}>
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
                                                        placeholder="Search"
                                                        prefix={
                                                            <Icon
                                                                source={
                                                                    SearchMajor
                                                                }
                                                            />
                                                        }

                                                    />
                                                }
                                            ></Combobox>
                                        </div>
                                        <div className="product__heading">
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{xs: 6}}
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
                                                    columnSpan={{xs: 6}}
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
                                                    columnSpan={{xs: 6}}
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
                                                    columnSpan={{xs: 6}}
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
                                                        <Button onClick={handleActiveModalDiscount} plain>
                                                            <Text
                                                                variant="bodyLg"
                                                                as="h1"
                                                            >
                                                                Add discount
                                                            </Text>
                                                        </Button>
                                                    </tr>
                                                    <tr className="content__title">
                                                        <Button onClick={handleActiveModalShipping} plain>
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
                                        <div className={"timeline__heading"}>
                                            <Text variant="headingMd" as="h1">
                                                Timeline
                                            </Text>
                                        </div>

                                        <Divider borderStyle="base"/>
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
                        <Grid.Cell columnSpan={{lg: 4}}>
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
                                    <Select/>
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
            <Modal open={activeModalDiscount} title={"Add discount"} onClose={handleActiveModalDiscount}
                   primaryAction={{
                       content: "Apply",

                   }}
                   secondaryActions={[
                       {
                           content: 'Cancel',

                       },
                   ]}>
                <Modal.Section>
                    <Form>
                        <FormLayout>
                            <Checkbox
                                label="Add custom shipping cost"
                            />
                            <TextField
                                requiredIndicator={true}
                                label="Shipping cost"
                                type="currency"
                            />
                        </FormLayout>

                    </Form>
                </Modal.Section>
            </Modal>
            <Modal open={activeModalShipping} title={"Add discount"} onClose={handleActiveModalShipping}
                   primaryAction={{
                       content: "Apply",

                   }}
                   secondaryActions={[
                       {
                           content: 'Cancel',
                       },
                   ]}>
                <Modal.Section>
                    <div className={"quote-view-detail__modal-discount"}>
                        <Form>
                            <FormLayout>
                                <Checkbox
                                    label="Add discount code"
                                />
                                <div className={"modal-discount__type-cost"}>
                                    <div className={"type-cost__type"}>
                                        <Select

                                            label={"Discount type"}
                                        />
                                    </div>
                                    <div className={"type-cost__cost"}>
                                        <TextField
                                            requiredIndicator={true}
                                            label="Shipping cost"
                                            type="currency"
                                        />
                                    </div>

                                </div>

                                <TextField label={"Discount title"}/>
                            </FormLayout>
                        </Form>
                    </div>
                </Modal.Section>
            </Modal>
        </div>
    );
}

export default QuoteListDetail;
