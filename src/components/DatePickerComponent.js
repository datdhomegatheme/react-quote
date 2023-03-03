import {ActionList, Button, ButtonGroup, DatePicker, Popover, Tag} from "@shopify/polaris";
import {FilterMajor} from "@shopify/polaris-icons";
import {useCallback, useState} from "react";

export const DatePickerComponent = (...props) => {
    const [togglePopoverActiveFilter, setTogglePopoverActive] = useState(false);

    const [{month, year}, setDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [selectedDates, setSelectedDates] = useState({
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    const [selectedTagFilter, setSelectedTagFilter] = useState([])


    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        []
    );

    console.log(selectedTagFilter)

    const handleTogglePopoverActiveFilter = () => {

        setTogglePopoverActive(!togglePopoverActiveFilter)
    }

    const handleRemoveTagFilter = (tag) => {
        setSelectedTagFilter((previousTags) =>
            previousTags.filter((previousTags) => previousTags !== tag))
    }



    const handleDateResetButton = () => {
        setSelectedTagFilter([]);
        setTogglePopoverActive(false);
    };


    const handleDateApplyButton = () => {
        if (selectedDates.start.toLocaleDateString("en-US") === selectedDates.end.toLocaleDateString("en-US")) {
            setSelectedTagFilter([selectedDates.start.toLocaleDateString("en-US")])
        }else {
            setSelectedTagFilter([selectedDates.start.toLocaleDateString("en-US") +
            "-" +
            selectedDates.end.toLocaleDateString("en-US"),])
        }

        setTimeout(() => {
        }, 500)
        setTogglePopoverActive(false);


    };

    return (
        <div>
            <Popover
                active={togglePopoverActiveFilter}
                onClose={handleTogglePopoverActiveFilter}
                activator={
                    <Tag
                        onRemove={() => handleRemoveTagFilter()}>
                        <Button plain onClick={handleTogglePopoverActiveFilter}>{selectedTagFilter}</Button>
                    </Tag>}

            >
                <div className="date-picker">
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

            </Popover>

        </div>
    )
}