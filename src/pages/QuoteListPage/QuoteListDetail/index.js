import { Page, Card, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

function QuoteListDetail() {
    //login text field search
    const [textValueSearch, setTextValueSearch] = useState("");
    const handleTextValueSearchChange = useCallback(
        (value) => setTextValueSearch(value),
        []
    );

    return (
        <Page title="Quote #id" subtitle="update by Admin Otc 11, 10:13 pm">
            <Card title="Products">
                <TextField
                    placeholder="Search products"
                    value={textValueSearch}
                    onChange={handleTextValueSearchChange}
                />
            </Card>
        </Page>
    );
}

export default QuoteListDetail;
