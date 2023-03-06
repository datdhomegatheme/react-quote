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
import {
    deleteQuoteApi,
    getQuoteListApi,
    updateQuoteApi,
} from "../../../redux/quoteListSlice";
import {getDataProducts} from "../../../redux/dataProductsSlice";
import {
    oldSetting,
    currentSetting,
    updateCurrentSetting,
} from "../../../redux/quoteSettingSlice";

function QuoteListDetail() {
    const dispatch = useDispatch();
    //get data quote detail

    const quoteId = useParams();

    const quoteList = useSelector((state) => state.quoteList.quote);
    const quoteDetail = useMemo(() => quoteList.filter((quote) => quote.id === Number(quoteId.id)), [quoteList]);
    const dataProducts = useSelector((state) => state.dataProducts.product);
    const oldSettingValue = useSelector(
        (state) => state.quoteSetting.oldSettingValue
    );

    const currentSettingValue = useSelector(
        (state) => state.quoteSetting.currentSettingValue
    );
    const currentSettingDetail = useMemo(() => currentSettingValue.filter(
        (quote) => quote.id === Number(quoteId.id), [currentSettingValue])
    );

    const quoteDetailItem = useMemo(() =>
        currentSettingValue[0]?.dataQuoteProductsInformation, [currentSettingValue]
    )

    const [loading, setLoading] = useState(false)
    const getAllApi = async () => {
        setLoading(true)
        await
            dispatch(getQuoteListApi());
        dispatch(getDataProducts())
        setLoading(false)
    }

    useEffect(() => {
        getAllApi()
    }, []);


    // ---> update thay doi -> set lai store -> check json old + new

    useEffect(() => {
        dispatch(oldSetting(quoteList));
        dispatch(currentSetting(quoteList));
    }, [quoteList]);

    const showUnsavedChanges =
        JSON.stringify(oldSettingValue) === JSON.stringify(currentSettingValue);

    // -----> function tinh sum subtotal

    let subTotal = 0;
    const subTotalFunction = () => {
        for (let i in quoteDetailItem) {
            subTotal =
                subTotal +
                quoteDetailItem[i].price * quoteDetailItem[i].quantity;
        }
    };
    subTotalFunction();

    //logic expired day checkbox
    const [checkExpiredDay, setCheckExpiredDay] = useState(false);
    const handleCheckExpiredDay = () => {
        setCheckExpiredDay(!checkExpiredDay);
    };

    // ---------> checkbox add discount code
    const [checkAddDiscountCode, setCheckAddDiscountCode] = useState(false);
    const handleCheckAddDiscountCode = useCallback(
        (value) => {
            setCheckAddDiscountCode(value);
        },
        [setCheckAddDiscountCode]
    );

    // ---------> checkbox add shipping code
    const [checkAddShippingCode, setCheckAddShippingCode] = useState(false);
    const handleCheckAddShippingCode = useCallback(
        (value) => {
            setCheckAddShippingCode(value);
        },
        [setCheckAddShippingCode]
    );

    //logic modal discount
    const [activeModalDiscount, setActiveModalDiscount] = useState(false);
    const handleActiveModalDiscount = () => {
        setActiveModalDiscount(!activeModalDiscount);
    };
    //logic modal shipping
    const [activeModalShipping, setActiveModalShipping] = useState(false);
    const handleActiveModalShipping = () => {
        setActiveModalShipping(!activeModalShipping);
    };

    //logic sale person account
    const [selectedAccount, setSelectedAccount] = useState(
        currentSettingDetail[0]?.assignSalesperson
    );
    const handleSelectAccount = (e) => {
        setSelectedAccount(e);
        const termArray = {...currentSettingDetail[0], assignSalesperson: e};
        dispatch(updateCurrentSetting(termArray));
    };

    const optionsAccount = [
        {label: "Admin", value: "Admin"},
        {label: "employee", value: "employee"},
    ];

    //logic handle Discount Type
    const [selectedDiscountType, setSelectedDiscountType] = useState({
        label: "Amount",
        value: "Amount",
    });
    const handleDiscountType = (value) => {
        setSelectedDiscountType({label: value, value: value});
    };

    const OptionsDiscountType = [
        {label: "Amount", value: "Amount"},
        {label: "Percentage", value: "Percentage"},
    ];

    //logic quantity
    const handleQuantity = (value, id) => {
        const quantityData = quoteDetailItem?.filter((item) => item.id === id);
        const updateQuantity = {
            ...quantityData.quantity,
            quantity: value,
        };
        const newQuantityData = {
            ...quantityData[0],
            ...updateQuantity,
        };
        const termArrayDetail = quoteDetailItem.map((t1) => ({
            ...t1,
            ...[newQuantityData].find((t2) => t2.id === t1.id),
        }));
        const termObject = {
            ...currentSettingDetail[0],
            dataQuoteProductsInformation: termArrayDetail,
        };
        dispatch(updateCurrentSetting(termObject));
    };

    //logic product's price
    const handleProductPrice = (value, id) => {
        const productPriceData = quoteDetailItem?.filter(
            (item) => item.id === id
        );
        const updateProductPrice = {
            ...productPriceData.price,
            price: value,
        };
        const newProductPriceData = {
            ...productPriceData[0],
            ...updateProductPrice,
        };

        const termArrayDetail = quoteDetailItem.map((t1) => ({
            ...t1,
            ...[newProductPriceData].find((t2) => t2.id === t1.id),
        }));
        const termObject = {
            ...currentSettingDetail[0],
            dataQuoteProductsInformation: termArrayDetail,
        };
        dispatch(updateCurrentSetting(termObject));
    };

    //logic combobox search product
    const deSelectedOptionsProductSearch = [];
    dataProducts?.map((item) =>
        deSelectedOptionsProductSearch.push({
            value: item.product,
            label: item.product,
        })
    );

    const [valueProductSearch, setValueProductSearch] = useState("");
    const [optionsProductSearch, setOptionsProductSearch] = useState(
        deSelectedOptionsProductSearch
    );
    const [selectedOptionsProductSearch, setSelectedOptionProductSearch] =
        useState();

    const updateValueProductSearch = useCallback(
        (value) => {
            setValueProductSearch(value);
            if (value === "") {
                setOptionsProductSearch(deSelectedOptionsProductSearch);
            }
            const filterRegex = new RegExp(value, "i");
            const resultOptions = deSelectedOptionsProductSearch.filter(
                (option) => option.label.match(filterRegex)
            );
            setOptionsProductSearch(resultOptions);
        },
        [deSelectedOptionsProductSearch]
    );

    const updateSelection = (selected) => {
        const matchedOption = optionsProductSearch.find((option) => {
            return option.value.match(selected);
        });
        setSelectedOptionProductSearch(selected);
        setValueProductSearch((matchedOption && matchedOption.label) || "");
        const dataProductsSelected = dataProducts.filter(
            (item) => item.product === selected
        );
        let termArrayDuplicate = [
            ...quoteDetail[0].dataQuoteProductsInformation,
            dataProductsSelected[0],
        ];
        let termArray = [...quoteDetail[0].dataQuoteProductsInformation];
        const valueArr = termArrayDuplicate.map(function (item) {
            return item.product;
        });
        const isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item) !== idx;
        });
        const dataProductsOldDuplicate =
            quoteDetail[0].dataQuoteProductsInformation.filter(
                (item) => item.product === selected
            );
        const index = termArray.findIndex((item) => item.product === selected);
        let termObject = {};
        let term = {};
        if (isDuplicate) {
            term = {
                ...dataProductsOldDuplicate[0],
                quantity: Number(dataProductsOldDuplicate[0].quantity) + 1,
            };
            termArray[index] = {
                ...termArray[index],
                quantity: term.quantity,
            };
            termObject = {
                ...quoteDetail[0],
                dataQuoteProductsInformation: termArray,
            };
            updateQuote(termObject);
        } else {
            termObject = {
                ...quoteDetail[0],
                dataQuoteProductsInformation: termArrayDuplicate,
            };
            updateQuote(termObject);
        }
    };

    const optionsMarkup =
        optionsProductSearch.length > 0 &&
        optionsProductSearch.map((option) => {
            const {label, value} = option;
            return (
                <div className={"test"}>
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={selectedOptionsProductSearch === value}
                    >
                        {label}
                    </Listbox.Option>
                </div>
            );
        });

    //handle add discount
    const [valueDiscount, setValueDiscount] = useState(0);
    const handleChangeDiscount = useCallback((value) => {
        setValueDiscount(value);
    }, []);
    //save value discount
    const [submitValueDiscount, setSubmitValueDiscount] = useState(0);

    //handle add shipping
    const [valueShipping, setValueShipping] = useState(0);
    const handleChangeShipping = useCallback((value) => {
        setValueShipping(value);
    }, []);
    //save value shipping
    const [submitValueShipping, setSubmitValueShipping] = useState(0);

    // post new quote
    const AddProduct = () => {
        // dispatch(
        //     postQuoteApi({
        //         customerInformation: quoteDetail[0].customerInformation,
        //         assignSalesperson: quoteDetail[0].assignSalesperson,
        //         createTime: quoteDetail[0].createTime,
        //         status: quoteDetail[0].status,
        //         logs: quoteDetail[0].logs,
        //         dataQuoteProductsInformation: quoteDetail[0].dataQuoteProductsInformation,
        //         comments: quoteDetail[0].comments,
        //     })
        // )

        alert("add quote!");
    };

    // handle comment
    const handleSubmitComment = () => {
        const termArray = {
            ...quoteDetail[0],
            comments: [
                ...quoteDetail[0].comments,
                {
                    date: new Date().toLocaleDateString(),
                    comment: valueComment,
                },
            ],
        };

        updateQuote(termArray);
        setValueComment("");
    };

    //-------------> update quote
    const updateQuote = (value) => {
        dispatch(updateQuoteApi(quoteId.id, value));
    };

    //handle delete quote
    const handleDeleteQuote = () => {
        dispatch(deleteQuoteApi(quoteId.id));
        alert("Quote deleted !");
    };

    // ---> handle discard changes button
    const handleDiscard = () => {
        updateQuote(oldSettingValue[quoteId.id]);
    };

    // ---> handle save changes button
    const handleSave = () => {
        updateQuote(currentSettingValue[quoteId.id]);
    };

    // ---> handle comment
    const [valueComment, setValueComment] = useState("");
    const handleValueComment = useCallback((value) => {
        setValueComment(value);
    }, []);

    // -----> tao ham tinh phan tram
    function percent(quantity, percent) {
        return (quantity * percent) / 100;
    }

    // xu ly xoa product
    const handleDeleteProduct = (id) => {
        const termArray = quoteDetailItem.filter((item) => item.id !== id);
        const termObject = {
            ...quoteDetail[0],
            dataQuoteProductsInformation: termArray,
        };
        updateQuote(termObject);
    };

    return (
        <div className="quote-view-detail">
            {!showUnsavedChanges && (
                <div className={"save-changes-confirm w-100"}>
                    <Box>
                        <AlphaStack fullWidth align={"center"}>
                            <div
                                className={
                                    "save-changes-confirm__container d-flex align-items-center justify-content-around "
                                }
                            >
                                <div className={"save-changes-confirm__text"}>
                                    <Text as={"h1"} variant={"headingMd"}>
                                        Unsaved changes
                                    </Text>
                                </div>
                                <ButtonGroup>
                                    <Button outline onClick={handleDiscard}>
                                        <div
                                            className={
                                                "save-changes-confirm__text"
                                            }
                                        >
                                            <Text
                                                as={"h1"}
                                                variant={"headingSm"}
                                            >
                                                Discard
                                            </Text>
                                        </div>
                                    </Button>
                                    <Button primary onClick={handleSave}>
                                        save
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </AlphaStack>
                    </Box>
                </div>
            )}

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
                                    handleDeleteQuote();
                                },
                            },
                        ],
                    },
                ]}
                primaryAction={{
                    content: "Create draft order",
                    onAction() {
                        AddProduct();
                    },
                }}
            >
                <Page fullWidth>
                    <Grid columns={{xs: 6}}>
                        <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                            <div className="quote-view-detail__product">
                                <Card
                                    title={
                                        <Text variant="headingLg" as="h1">
                                            Products
                                        </Text>
                                    }
                                >
                                    <Card.Section>
                                        <div className="w-100">
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
                                                        value={
                                                            valueProductSearch
                                                        }
                                                        onChange={
                                                            updateValueProductSearch
                                                        }
                                                    />
                                                }
                                            >
                                                {optionsProductSearch.length >
                                                0 ? (
                                                    <div className={"list-box"}>
                                                        <Listbox
                                                            onSelect={
                                                                updateSelection
                                                            }
                                                        >
                                                            {optionsMarkup}
                                                        </Listbox>
                                                    </div>
                                                ) : null}
                                            </Combobox>
                                        </div>
                                        <div className="product__heading">
                                            <Grid>
                                                <Grid.Cell
                                                    columnSpan={{
                                                        xs: 3,
                                                        lg: 6,
                                                    }}
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
                                                    columnSpan={{
                                                        xs: 3,
                                                        lg: 6,
                                                    }}
                                                >
                                                    <Grid>
                                                        <Grid.Cell
                                                            columnSpan={{
                                                                xs: 3,
                                                                sm: 2,
                                                                lg: 3,
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
                                                                sm: 4,
                                                                lg: 9,
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
                                        {quoteDetailItem?.map((item, index) => (
                                            <div
                                                className="product__list"
                                                key={index}
                                            >
                                                <Grid>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 3,
                                                            lg: 6,
                                                        }}
                                                    >
                                                        <div
                                                            className="products__list__cell-product d-flex justify-items-center align-items-center">
                                                            <img
                                                                className="cell-product__image"
                                                                alt="white-background-product-photography-example"
                                                                src={item.image}
                                                            />
                                                            <div className="cell-product__content">
                                                                <Button plain>
                                                                    <Text
                                                                        variant="bodyLg"
                                                                        as="h1"
                                                                    >
                                                                        {
                                                                            item.product
                                                                        }
                                                                    </Text>
                                                                </Button>
                                                                <Text
                                                                    variant="bodyMd"
                                                                    as="h1"
                                                                >
                                                                    {
                                                                        item.variant
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    variant="bodyMd"
                                                                    as="h1"
                                                                >
                                                                    SKU:{" "}
                                                                    {item.sku}
                                                                </Text>
                                                            </div>
                                                        </div>
                                                    </Grid.Cell>

                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 3,
                                                            lg: 6,
                                                        }}
                                                    >
                                                        <div className="product__list__quantity-price">
                                                            <Grid>
                                                                <Grid.Cell
                                                                    columnSpan={{
                                                                        xs: 2,
                                                                        lg: 3,
                                                                    }}
                                                                >
                                                                    <div className="products__list__quantity w-100">
                                                                        <input
                                                                            onKeyDown={(
                                                                                evt
                                                                            ) =>
                                                                                [
                                                                                    "e",
                                                                                    "E",
                                                                                    "+",
                                                                                    "-",
                                                                                    ".",
                                                                                ].includes(
                                                                                    evt.key
                                                                                ) &&
                                                                                evt.preventDefault()
                                                                            }
                                                                            className={
                                                                                "quantity__input input-number"
                                                                            }
                                                                            value={
                                                                                item.quantity
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleQuantity(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    item.id
                                                                                );
                                                                            }}
                                                                            type={
                                                                                "number"
                                                                            }
                                                                        />
                                                                    </div>
                                                                </Grid.Cell>

                                                                <Grid.Cell
                                                                    columnSpan={{
                                                                        xs: 2,
                                                                        lg: 3,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="products__list__price w-100 input-number">
                                                                        <input
                                                                            onKeyDown={(
                                                                                evt
                                                                            ) =>
                                                                                [
                                                                                    "e",
                                                                                    "E",
                                                                                    "+",
                                                                                    "-",
                                                                                    ".",
                                                                                ].includes(
                                                                                    evt.key
                                                                                ) &&
                                                                                evt.preventDefault()
                                                                            }
                                                                            className={
                                                                                "price__input"
                                                                            }
                                                                            value={
                                                                                item.price
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleProductPrice(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    item.id
                                                                                );
                                                                            }}
                                                                            type={
                                                                                "number"
                                                                            }
                                                                        />
                                                                    </div>
                                                                </Grid.Cell>

                                                                <Grid.Cell
                                                                    columnSpan={{
                                                                        xs: 1,
                                                                        lg: 3,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={
                                                                            "products__list__total"
                                                                        }
                                                                    >
                                                                        <Text
                                                                            variant="bodyMd"
                                                                            as="h1"
                                                                        >
                                                                            {item.quantity *
                                                                                item.price}
                                                                            $
                                                                        </Text>
                                                                    </div>
                                                                </Grid.Cell>
                                                                <Grid.Cell
                                                                    columnSpan={{
                                                                        xs: 1,
                                                                        lg: 3,
                                                                    }}
                                                                >
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDeleteProduct(
                                                                                item.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            source={
                                                                                DeleteMinor
                                                                            }
                                                                        />
                                                                    </Button>
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
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 3,
                                                            lg: 6,
                                                        }}
                                                    >
                                                        <AlphaStack>
                                                            <TextContainer>
                                                                <Text
                                                                    variant={
                                                                        "bodyLg"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    Subtotal
                                                                </Text>
                                                                <Text
                                                                    variant={
                                                                        "bodyLg"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    <Button
                                                                        onClick={
                                                                            handleActiveModalDiscount
                                                                        }
                                                                        plain
                                                                    >
                                                                        Add
                                                                        discount
                                                                    </Button>
                                                                </Text>
                                                                <Text
                                                                    variant={
                                                                        "bodyLg"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    <Button
                                                                        onClick={
                                                                            handleActiveModalShipping
                                                                        }
                                                                        plain
                                                                    >
                                                                        Add
                                                                        shipping
                                                                    </Button>
                                                                </Text>
                                                                <Text
                                                                    variant={
                                                                        "headingMd"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    Total
                                                                </Text>
                                                            </TextContainer>
                                                        </AlphaStack>
                                                    </Grid.Cell>
                                                    <Grid.Cell
                                                        columnSpan={{
                                                            xs: 3,
                                                            lg: 6,
                                                        }}
                                                    >
                                                        <AlphaStack
                                                            align={"end"}
                                                        >
                                                            <TextContainer>
                                                                <Text
                                                                    variant={
                                                                        "bodyLg"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    {subTotal}
                                                                </Text>
                                                                {selectedDiscountType.label ===
                                                                    "Amount" && (
                                                                        <Text
                                                                            variant={
                                                                                "bodyLg"
                                                                            }
                                                                            as={
                                                                                "h1"
                                                                            }
                                                                        >
                                                                            {
                                                                                submitValueDiscount
                                                                            }
                                                                            $
                                                                        </Text>
                                                                    )}
                                                                {selectedDiscountType.label ===
                                                                    "Percentage" && (
                                                                        <Text
                                                                            variant={
                                                                                "bodyLg"
                                                                            }
                                                                            as={
                                                                                "h1"
                                                                            }
                                                                        >
                                                                            {
                                                                                submitValueDiscount
                                                                            }
                                                                            %
                                                                        </Text>
                                                                    )}
                                                                <Text
                                                                    variant={
                                                                        "bodyLg"
                                                                    }
                                                                    as={"h1"}
                                                                >
                                                                    {
                                                                        submitValueShipping
                                                                    }
                                                                    $
                                                                </Text>

                                                                {selectedDiscountType.label ===
                                                                    "Amount" && (
                                                                        <Text
                                                                            variant={
                                                                                "headingMd"
                                                                            }
                                                                            as={
                                                                                "h1"
                                                                            }
                                                                        >
                                                                            {Number(
                                                                                    submitValueShipping
                                                                                ) +
                                                                                subTotal -
                                                                                submitValueDiscount}
                                                                            $
                                                                        </Text>
                                                                    )}
                                                                {selectedDiscountType.label ===
                                                                    "Percentage" && (
                                                                        <Text
                                                                            variant={
                                                                                "headingMd"
                                                                            }
                                                                            as={
                                                                                "h1"
                                                                            }
                                                                        >
                                                                            {Number(
                                                                                    submitValueShipping
                                                                                ) +
                                                                                subTotal -
                                                                                percent(
                                                                                    subTotal,
                                                                                    submitValueDiscount
                                                                                )}
                                                                            $
                                                                        </Text>
                                                                    )}
                                                            </TextContainer>
                                                        </AlphaStack>
                                                    </Grid.Cell>
                                                </Grid>
                                            </Box>
                                        </Card.Section>
                                        <Card.Section>
                                            <div className="d-flex justify-content-end">
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
                                            <div className="card__viewed-product-list d-flex">
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
                                            <FormLayout>
                                                <TextField
                                                    label={"comment"}
                                                    labelHidden={true}
                                                    autoComplete="off"
                                                    placeholder="leave a comment..."
                                                    value={valueComment}
                                                    onChange={
                                                        handleValueComment
                                                    }
                                                />
                                                <div className="d-flex flex-row-reverse ">
                                                    <Button
                                                        onClick={
                                                            handleSubmitComment
                                                        }
                                                        submit
                                                    >
                                                        Post
                                                    </Button>
                                                </div>
                                            </FormLayout>
                                        </div>
                                        {currentSettingDetail[0]?.comments.map(
                                            (item, index) => (
                                                <div
                                                    className="timeline__status"
                                                    key={index}
                                                >
                                                    <Text
                                                        variant="headingSm"
                                                        as="h1"
                                                    >
                                                        {item.date}
                                                    </Text>
                                                    <Text
                                                        variant="bodyMd"
                                                        as="p"
                                                    >
                                                        {item.comment}
                                                    </Text>
                                                    <Button plain>
                                                        Show Details
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                    </Box>
                                </div>
                            </div>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
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
                                            {
                                                currentSettingDetail[0]
                                                    ?.createTime.date
                                            }
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Name
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            {
                                                currentSettingDetail[0]
                                                    ?.customerInformation.name
                                            }
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Email
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            {
                                                currentSettingDetail[0]
                                                    ?.customerInformation.email
                                            }
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Pickup & Return
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            {
                                                currentSettingDetail[0]
                                                    ?.pickupReturn
                                            }
                                        </Text>
                                        <Text
                                            variant="headingSm"
                                            fontWeight="bold"
                                            as="h1"
                                        >
                                            Message
                                        </Text>
                                        <Text variant="bodyMd" as="p">
                                            {
                                                currentSettingDetail[0]
                                                    ?.customerInformation
                                                    .message
                                            }
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
                                            {
                                                currentSettingDetail[0]
                                                    ?.termsConditions
                                            }
                                        </Text>
                                    </TextContainer>
                                </Card.Section>
                            </Card>
                            <Card title={"Salesperson Account"}>
                                <Card.Section>
                                    <Select
                                        label={"Salesperson Account"}
                                        labelHidden={true}
                                        options={optionsAccount}
                                        value={selectedAccount}
                                        onChange={handleSelectAccount}
                                    />
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
            <Modal
                open={activeModalDiscount}
                title={"Add discount"}
                onClose={handleActiveModalDiscount}
                primaryAction={{
                    content: "Apply",
                    onAction() {
                        handleActiveModalDiscount();
                        setSubmitValueDiscount(valueDiscount);
                    },
                }}
                secondaryActions={[
                    {
                        content: "Cancel",
                        onAction() {
                            handleActiveModalDiscount();
                        },
                    },
                ]}
            >
                {/*//discount*/}
                <Modal.Section>
                    <div className={"quote-view-detail__modal-discount"}>
                        <Form>
                            <FormLayout>
                                <Checkbox
                                    label="Add discount code"
                                    checked={checkAddDiscountCode}
                                    onChange={handleCheckAddDiscountCode}
                                />
                                <div
                                    className={
                                        "modal-discount__type-cost d-flex justify-content-between"
                                    }
                                >
                                    <div className={"type-cost__type"}>
                                        <Select
                                            options={OptionsDiscountType}
                                            value={selectedDiscountType.value}
                                            onChange={(e) =>
                                                handleDiscountType(e)
                                            }
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

                                <TextField
                                    autoComplete={"off"}
                                    label={"Discount title"}
                                />
                            </FormLayout>
                        </Form>
                    </div>
                </Modal.Section>
            </Modal>
            <Modal
                open={activeModalShipping}
                title={"Add shipping"}
                onClose={handleActiveModalShipping}
                primaryAction={{
                    content: "Apply",
                    onAction() {
                        setSubmitValueShipping(valueShipping);
                        handleActiveModalShipping();
                    },
                }}
                secondaryActions={[
                    {
                        content: "Cancel",
                        onAction() {
                            handleActiveModalShipping();
                        },
                    },
                ]}
            >
                {/*//shipping*/}
                <Modal.Section>
                    <FormLayout>
                        <Checkbox
                            label="Add custom shipping cost"
                            checked={checkAddShippingCode}
                            onChange={handleCheckAddShippingCode}
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
                </Modal.Section>
            </Modal>
        </div>
    );
}

export default QuoteListDetail;
