import React, {FC} from 'react';
import {Popover} from "@mui/material";
import './Popover.scss'
import {useTranslation} from "react-i18next";

interface IPopoverCompProps {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl(arg0: object | null): void;
    popoverText: string;
    func(): void;
}

const PopoverComp: FC<IPopoverCompProps> = ({anchorEl, setAnchorEl, popoverText, func}) => {
    const {t} = useTranslation()
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = () => {
        func()
        setAnchorEl(null)
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div className={"popover-content"}>
                {popoverText}
                <div className={"buttonsConfirmContainer"}>
                    <button onClick={handleClick} className={"confirmButton"}>{`${t("popoverContent.button")}`}</button>
                </div>
            </div>
        </Popover>
    );
};

export default PopoverComp;