import {
    AlphaStack,
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
    Listbox,
    Modal,
    Page,
    Select,
    Text,
    TextContainer,
    TextField,
} from "@shopify/polaris";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DeleteMinor, ImportMinor, SearchMajor} from "@shopify/polaris-icons";
import Images from "../../../assets/Images";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteQuoteApi, getQuoteListApi, postQuoteApi, updateQuoteApi} from "../../../redux/quoteListSlice";
import {getTrashedQuoteList} from "../../../redux/trashedQuoteListSlice";
import axios from "axios";

function QuoteListDetail() {
    //get data quote detail
    const quoteId = useParams();
    const quoteList = useSelector((state) => state.quoteList.quote);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuoteListApi());
        dispatch(getTrashedQuoteList());
    }, [quoteId]);

    // eslint-disable-next-line eqeqeq
    const quoteDetail = quoteList.filter((quote) => quote.id == quoteId.id);
    //logic expired day checkbox
    const [checkExpiredDay, setCheckExpiredDay] = useState(false);
    const handleCheckExpiredDay = () => {
        setCheckExpiredDay(!checkExpiredDay);
    };


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

    //logic sale person account
    const [selectedAccount, setSelectedAccount] = useState();
    const handleSelectAccount = useCallback((value) => setSelectedAccount(value), [])
    const optionsAccount = [
        {label: 'Admin', value: 'Admin'},
        {label: 'employee', value: 'employee'},

    ];

    //logic handle Discount Type
    const [selectedDiscountType, setSelectedDiscountType] = useState();
    const handleDiscountType = useState((value) => {
        setSelectedDiscountType(value)
    })
    const OptionsDiscountType = [
        {label: "50%", value: "50%"},
        {label: "20%", value: "20%"}
    ]


    //logic quantity
    const [valueQuantity, setValueQuantity] = useState();
    const handleQuantity = useCallback((value) => setValueQuantity(value), []);
    const dataList = [];
    //logic product's price
    const [valueProductPrice, setValueProductPrice] = useState([]);

    const handleProductPrice = useCallback((value) => {
            // const priceData = quoteDetail[0]?.dataQuoteProductsInformation.filter(item => (item.id === id))
            // const updatePrice = {
            //     ...priceData[0].price,
            //     value
            // }
            console.log(value)
            // setValueProductPrice(value)
        }
        , [])

    //logic combobox search product
    const deSelectedOptionsProductSearch = useMemo(
        () => [
            {value: 'rustic', label: 'Rustic'},
            {value: 'antique', label: 'Antique'},
            {value: 'vinyl', label: 'Vinyl'},
            {value: 'vintage', label: 'Vintage'},
            {value: 'refurbished', label: 'Refurbished'},
        ],
        [],);

    const [valueProductSearch, setValueProductSearch] = useState("");
    const [optionsProductSearch, setOptionsProductSearch] = useState(deSelectedOptionsProductSearch)
    const [selectedOptionsProductSearch, setSelectedOptionProductSearch] = useState();

    const updateValueProductSearch = useCallback((value) => {
            setValueProductSearch(value);

            if (value === "") {
                setOptionsProductSearch(deSelectedOptionsProductSearch);
            }

            const filterRegex = new RegExp(value, "i");
            const resultOptions = deSelectedOptionsProductSearch.filter((option) => option.label.match(filterRegex));
            setOptionsProductSearch(resultOptions);
        },
        [deSelectedOptionsProductSearch]
    )

    const updateSelection = useCallback((selected) => {
        const matchedOption = optionsProductSearch.find((option) => {
            return option.value.match(selected);
        });
        setSelectedOptionProductSearch(selected);
        setValueProductSearch((matchedOption && matchedOption.label) || "");
    }, [optionsProductSearch],);

    const optionsMarkup =
        optionsProductSearch.length > 0
            ? optionsProductSearch.map((option) => {
                const {label, value} = option;

                return (
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={selectedOptionsProductSearch === value}
                        accessibilityLabel={label}
                    >
                        {label}
                    </Listbox.Option>
                );
            })
            : null;

    // handle comment
    const handleSubmitComment = (quoteId, params) => {
        dispatch(updateQuoteApi(quoteId))
    }

    //handle add discount
    const [valueDiscount, setValueDiscount] = useState(0)
    const handleChangeDiscount = useCallback((value) => {
        setValueDiscount(value)
    }, [])
    //save value discount
    const [submitValueDiscount, setSubmitValueDiscount] = useState(0)

    //handle add shipping
    const [valueShipping, setValueShipping] = useState(0)
    const handleChangeShipping = useCallback((value) => {
        setValueShipping(value)
    }, [])
    //save value shipping
    const [submitValueShipping, setSubmitValueShipping] = useState(0);

    const AddProduct = () => {
        dispatch(
            postQuoteApi({
                id: 10,
                customerInformation: quoteDetail[0].customerInformation,
                assignSalesperson: quoteDetail[0].assignSalesperson,
                createTime: quoteDetail[0].createTime,
                status: quoteDetail[0].status,
                logs: quoteDetail[0].logs,
                dataQuoteProductsInformation: quoteDetail[0].dataQuoteProductsInformation,
                comments: quoteDetail[0].comments,
            })
        )


        alert("Quote deleted !")

    }

    //handle delete quote

    const handleDeleteQuote = () => {
        dispatch(deleteQuoteApi(quoteId.id))
        alert("Quote deleted !")
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
                                onAction: () => {
                                    handleDeleteQuote()
                                },
                            },
                        ],
                    },
                ]}
                primaryAction={{
                    content: "Create draft order",
                    onAction() {
                        AddProduct()
                    }
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
                                                        label={"Search"}
                                                        labelHidden
                                                        value={valueProductSearch}
                                                        onChane={updateValueProductSearch}
                                                    />
                                                }
                                            >
                                                {optionsProductSearch.length > 0 ? (
                                                    <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
                                                ) : null}

                                            </Combobox>
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
                                        {quoteDetail[0]?.dataQuoteProductsInformation.map((item, index) => (
                                            <div className="product__list" key={index}>
                                                <Grid>
                                                    <Grid.Cell
                                                        columnSpan={{xs: 6}}
                                                    >
                                                        <div className="products__list__cell-product">
                                                            <img
                                                                className="cell-product__image"
                                                                alt="white-background-product-photography-example"
                                                                src={
                                                                    item.image
                                                                }
                                                            />
                                                            <div className="cell-product__content">
                                                                <Button plain>
                                                                    <Text
                                                                        variant="bodyLg"
                                                                        as="h1"
                                                                    >
                                                                        {item.product}
                                                                    </Text>
                                                                </Button>
                                                                <Text
                                                                    variant="bodyMd"
                                                                    as="h1"
                                                                >
                                                                    {item.variant}
                                                                </Text>
                                                                <Text
                                                                    variant="bodyMd"
                                                                    as="h1"
                                                                >
                                                                    SKU: {item.sku}
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
                                                                            label={"quantity"}
                                                                            labelHidden={true}
                                                                            type="number"
                                                                            autoComplete="off"
                                                                            value={item?.quantity}
                                                                            onChange={handleQuantity}

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
                                                                            label={"price"}
                                                                            labelHidden={true}
                                                                            type="number"
                                                                            autoComplete="off"
                                                                            value={item?.price}
                                                                            onChange={handleProductPrice}
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
                                                                            {valueQuantity * valueProductPrice}$
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
                                        ))}

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
                                            <Box padding={"2"}>
                                                <Grid>
                                                    <Grid.Cell columnSpan={{xs: 6}}>
                                                        <AlphaStack>
                                                            <TextContainer>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    Subtotal
                                                                </Text>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    <Button onClick={handleActiveModalDiscount} plain>Add
                                                                        discount</Button>
                                                                </Text>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    <Button onClick={handleActiveModalShipping} plain>Add
                                                                        shipping</Button>
                                                                </Text>
                                                                <Text variant={"headingMd"} as={"h1"}>
                                                                    Total
                                                                </Text>
                                                            </TextContainer>
                                                        </AlphaStack>
                                                    </Grid.Cell>
                                                    <Grid.Cell columnSpan={{xs: 6}}>
                                                        <AlphaStack align={"end"}>
                                                            <TextContainer>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    600$
                                                                </Text>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    {submitValueDiscount}$
                                                                </Text>
                                                                <Text variant={"bodyLg"} as={"h1"}>
                                                                    {submitValueShipping}$
                                                                </Text>
                                                                <Text variant={"headingMd"} as={"h1"}>
                                                                    {submitValueShipping + (600 - (600 / 100 * submitValueDiscount))}$
                                                                </Text>
                                                            </TextContainer>
                                                        </AlphaStack>
                                                    </Grid.Cell>
                                                </Grid>
                                            </Box>


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
                                                        label={"comment"}
                                                        labelHidden={true}
                                                        autoComplete="off"
                                                        placeholder="leave a comment..."
                                                    />
                                                    <div className="status__btn">
                                                        <Button onClick={handleSubmitComment} submit>
                                                            Post
                                                        </Button>
                                                    </div>
                                                </FormLayout>
                                            </Form>
                                        </div>
                                        {quoteDetail[0]?.comments.map((item, index) => (
                                            <div className="timeline__status" key={index}>
                                                <Text variant="headingSm" as="h1">
                                                    {item.date}
                                                </Text>
                                                <Text variant="bodyMd" as="p">
                                                    {item.comment}
                                                </Text>
                                                <Button plain>Show Details</Button>
                                            </div>
                                        ))}

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
                                    <Select label={"Salesperson Account"} labelHidden={true} options={optionsAccount}
                                            value={selectedAccount} onChange={handleSelectAccount}/>
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
                                            autoComplete={"off"}
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
                       onAction() {
                           handleActiveModalDiscount()
                           setSubmitValueDiscount(valueDiscount)
                       }
                   }}
                   secondaryActions={[
                       {
                           content: 'Cancel',
                           onAction() {
                               handleActiveModalDiscount()
                           }

                       },
                   ]}>
                {/*//discount*/}
                <Modal.Section>
                    <div className={"quote-view-detail__modal-discount"}>
                        <Form>
                            <FormLayout>
                                <Checkbox
                                    label="Add discount code"
                                />
                                <div className={"modal-discount__type-cost"}>
                                    <div className={"type-cost__type"}>
                                        <Select options={OptionsDiscountType} value={selectedDiscountType}
                                                onChange={handleDiscountType}
                                                label={"Discount type"}
                                        />
                                    </div>
                                    <div className={"type-cost__cost"}>
                                        <TextField
                                            autoComplete={"off"}
                                            requiredIndicator={true}
                                            label="Discount value"
                                            type="number"
                                            value={valueDiscount}
                                            onChange={handleChangeDiscount}
                                        />
                                    </div>

                                </div>


                                <TextField autoComplete={"off"} label={"Discount title"}/>
                            </FormLayout>
                        </Form>
                    </div>
                </Modal.Section>

            </Modal>
            <Modal open={activeModalShipping} title={"Add shipping"} onClose={handleActiveModalShipping}
                   primaryAction={{
                       content: "Apply",
                       onAction() {
                           setSubmitValueShipping(valueShipping);
                           handleActiveModalShipping()
                       }
                   }}
                   secondaryActions={[
                       {
                           content: 'Cancel',
                           onAction() {
                               handleActiveModalShipping()
                           }
                       },
                   ]}>
                {/*//shipping*/}
                <Modal.Section>
                    <Form>
                        <FormLayout>
                            <Checkbox
                                label="Add custom shipping cost"
                            />
                            <TextField
                                autoComplete={"off"}
                                requiredIndicator={true}
                                label="Shipping cost"
                                type="number"
                                value={valueShipping}
                                onChange={handleChangeShipping}
                            />
                        </FormLayout>

                    </Form>
                </Modal.Section>
            </Modal>
        </div>
    );
}

export default QuoteListDetail;
