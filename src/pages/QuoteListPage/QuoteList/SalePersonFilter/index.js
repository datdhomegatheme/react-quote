// noinspection BadExpressionStatementJS

import {Popover, Stack, RadioButton, Box} from "@shopify/polaris";
import {useState, useCallback} from "react";

const DataSalePersons = [
    "Hieu@gmail.com",
    "Dat@gmail.com",
    "Admin",]

export const SalePersonFilter = ({handleTogglePopoverActiveFilter, setSalePersonValue}) => {
    const [value, setValue] = useState();

    const handleChange = (_checked, item) => {
        setValue(_checked);
        handleTogglePopoverActiveFilter();
        setSalePersonValue(_checked)
    }


    return
    <div>
        <Box padding={"5"}>
            <Stack vertical>
                {DataSalePersons.map((item, index) => (
                    <RadioButton
                        key={index}
                        label={item}
                        checked={value === item}
                        onChange={() =>
                            handleChange(item)
                        }
                        value={item}
                    />
                ))}
            </Stack>
        </Box>

    </div>
}