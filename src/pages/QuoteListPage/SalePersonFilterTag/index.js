import {Button, Popover, Tag} from "@shopify/polaris";
import {useState} from "react";
import {SalePersonFilter} from "../SalePersonFilter";
import {CustomersMajor} from "@shopify/polaris-icons";

export const SalePersonFilterTag = ({salePersonValue, setSalePersonValue}) => {
    const [activePopover, setActivePopover] = useState(false);

    const handleShowSalePersonFilter = () => {
        setActivePopover(!activePopover)
    }
    return (
        <>
            {
                salePersonValue && (
                    <Popover
                        active={activePopover}
                        onClose={handleShowSalePersonFilter}
                        activator={
                            <Tag onRemove={() => setSalePersonValue("")}>
                                <Button icon={CustomersMajor} removeUnderline monochrome plain
                                        onClick={handleShowSalePersonFilter}>
                                    {salePersonValue}
                                </Button>
                            </Tag>
                        }
                    >
                        <SalePersonFilter
                            handleTogglePopoverActiveFilter={handleShowSalePersonFilter}
                            setSalePersonValue={setSalePersonValue}/>
                    </Popover>
                )
            }
        </>
    )

}