import React, {FC} from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {findContactsByName} from "../../../API/ContactsApi";
import ContactsStore from "../../../Store/ContactsStore";
import {useTranslation} from "react-i18next";

interface SearchInputProps {
    name: string;
    setName(arg0: string): void;
}

const SearchInput: FC<SearchInputProps> = ({name, setName}) => {
    const {t} = useTranslation()
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        ContactsStore.setIsFiltered(true)
        findContactsByName(name)
    }

    return (
        <Paper
            component="form"
            sx={{
                borderRadius: '10px',
                background: 'var(--main-background-color)',
                border: '1px solid #2f2f2f',
                display: 'flex',
            }}
        >
            <InputBase
                placeholder={`${t("contactsPage.searchInputPlaceholder")}`}
                sx={{
                    width: '100%',
                    padding: '0 1rem',
                    color: 'var(--background-color)',
                }}
                value={name}
                onChange={handleChangeName}
            />
            <IconButton type="button" onClick={handleClick} aria-label="search">
                <SearchIcon sx={{
                    color: '#707070'
                }}
                />
            </IconButton>
        </Paper>
    );
};

export default SearchInput;