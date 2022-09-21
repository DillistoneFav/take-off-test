import React, {FC, useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

interface LoginInputProps {
    password: string;
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void,
}

const PasswordInput: FC<LoginInputProps> = ({password, handleChange}) => {
    const {t} = useTranslation()
    const [passwordShown, setPasswordShown] = useState<boolean>(false)
    const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPasswordShown(!passwordShown);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ width: '300px'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={passwordShown ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={`${t("authPage.password")}`}
            />
        </FormControl>
    );
};

export default PasswordInput;