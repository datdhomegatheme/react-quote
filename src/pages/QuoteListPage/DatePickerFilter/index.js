import {Button, ButtonGroup, DatePicker} from "@shopify/polaris";
import {useCallback, useState} from "react";

export const DatePickerFilter = (props) => {
    const [{month, year}, setDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [selectedDates, setSelectedDates] = useState({
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        []
    );


    const handleDateResetButton = () => {
        props.setSelectedTagFilter();
        setTimeout(() => {
            props.setOnShowCalendar(false);
        }, 500)
        props.setTogglePopoverActive(false);

    };

    const handleDateApplyButton = () => {
        props.setSelectedTagFilter(selectedDates.start.toLocaleDateString("en-US") +
            "-" +
            selectedDates.end.toLocaleDateString("en-US"));

        props.setSelectedDates(selectedDates.start.toLocaleDateString("en-US") +
            "-" +
            selectedDates.end.toLocaleDateString("en-US"))

        setTimeout(() => {
            props.setOnShowCalendar(false);
        }, 500)
        props.setTogglePopoverActive(false);


    };

    return (
        <div className="quote-list__popover-calendar">
            <div className="quote-list__date-picker">
                <DatePicker
                    month={month}
                    year={year}
                    onChange={setSelectedDates}
                    onMonthChange={
                        handleMonthChange
                    }
                    selected={selectedDates}
                    multiMonth
                    allowRange
                />
                <div
                    className="quote-list__date-picker__btn-group">
                    <ButtonGroup>
                        <Button
                            onClick={
                                handleDateResetButton
                            }
                        >
                            Reset
                        </Button>
                        <Button
                            primary
                            onClick={
                                handleDateApplyButton
                            }
                        >
                            Apply
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )

}