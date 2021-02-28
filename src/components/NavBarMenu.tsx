import { Button, Menu, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { FC, Fragment, MouseEvent } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navBarButton: {
            color: 'white'
        },
        icon: {
            marginRight: theme.spacing(1)
        }
    })
);

type NavBarMenuProps = {
    menuItems: JSX.Element[];
    menuContent: JSX.Element;
};

const NavBarMenu: FC<NavBarMenuProps> = ({ menuItems, menuContent }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Button
                className={classes.navBarButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {menuContent}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {menuItems &&
                    menuItems.map((menuItem: JSX.Element) => (
                        <MenuItem key={menuItem.key} onClick={menuItem.props.onClick}>
                            {menuItem}
                        </MenuItem>
                    ))}
            </Menu>
        </Fragment>
    );
};

NavBarMenu.propTypes = {
    menuItems: PropTypes.array.isRequired,
    menuContent: PropTypes.element.isRequired
};

export default NavBarMenu;
