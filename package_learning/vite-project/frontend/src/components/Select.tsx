import SelectSearch, {
    useSelect,
    SelectSearchOption,
    SelectedOptionValue,
    SelectedOption,
    SelectSearchProps
} from "react-select-search";
import React from "react";
const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        value: 'value is required',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];

type SelectProps = {
        value?:string|string[],
        disabled?:boolean,
        multiple?:boolean,
        search?:boolean,
        options?:SelectSearchOption[],
        onChange?:(selectedValue:SelectedOptionValue|SelectedOptionValue[], selectedOption:SelectedOption|SelectedOption[], optionSnapshot:SelectSearchProps) => void,
        getOptions?:(query:string) => Promise<SelectSearchOption[]>,
        filterOptions?:(options: SelectSearchOption[]) => (query:string) => SelectSearchOption[],
        allowEmpty?:boolean,
        closeOnSelect?:boolean,
        closable?:boolean,
}

const CustomSelect = (props: SelectProps) => {
    const { value,disabled, options, multiple } = props
    const [snapshot, valueProps, optionProps] = useSelect({
        options,
        value,
        multiple,
        disabled
    })

    return (
        <div>
            <button {...valueProps}>{snapshot.displayValue ? (
                snapshot.displayValue
            ) : (
                <>
                選択
                </>
            )}</button>
            {
                snapshot.focus && (
                    <ul>
                        {snapshot.options.map(option => (
                            <li key={option.value}>
                                <button {...optionProps} value={option.value}>
                                    {option.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}




export const Select = () => {
    return (
        <div>
            <h2>SLECTSEARCH</h2>
            <CustomSelect options={options} value='value' multiple={false} disabled={false} />
        </div>
    )
}
