import React from "react";
import { Channel } from "../../api/dto";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, NavItem, NavLink } from "react-bootstrap";

export const ChannelBtn = ({
    btn,
    selected,
}: {
    btn: Channel;
    selected: string;
}) => {
    return btn.removable ? (
        <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>{btn.name}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>Удалить</Dropdown.Item>
                <Dropdown.Item>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ) : (
        <Button
            variant={selected === btn.id && "secondary"}
            className="w-100 rounded-0 text-start"
        >
            <span className="me-1">#</span>
            {btn.name}
        </Button>
    );
};
