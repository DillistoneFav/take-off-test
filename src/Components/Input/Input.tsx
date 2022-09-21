import React, {FC} from 'react';
import {TextField} from "@mui/material";

interface InputProps {
    placeholder: string;
    value: string;
    handleChangeInputValue(event: React.ChangeEvent<HTMLInputElement>): void,
}

const Input: FC<InputProps> = ({placeholder, handleChangeInputValue, value}) => {
    return (
        <TextField
            autoComplete="off"
            label={placeholder}
            value={value}
            onChange={handleChangeInputValue}
            sx={{ width: '300px', mb: '1rem'}}
        />
    );
};

export default Input;