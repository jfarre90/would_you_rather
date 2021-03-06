import { Button, Menu, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { FC, Fragment, MouseEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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

export type MenuItemMetadata = {
    targetUrl: string;
    itemText: string;
    key: string;
    customClickBehaviour?: () => void;
};

type NavBarMenuProps = {
    menuItems: MenuItemMetadata[];
    menuContent: JSX.Element;
};

const NavBarMenu: FC<NavBarMenuProps> = ({ menuItems, menuContent }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToTargetUrl = (target: string) => {
        if (location.pathname !== target) {
            history.push(target);
        }
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
                    menuItems.map((menuItem: MenuItemMetadata) => (
                        <MenuItem
                            key={menuItem.key}
                            onClick={
                                !menuItem.customClickBehaviour
                                    ? () => {
                                          navigateToTargetUrl(menuItem.targetUrl);
                                      }
                                    : () => {
                                          menuItem.customClickBehaviour ? menuItem.customClickBehaviour() : null;
                                      }
                            }
                        >
                            {menuItem.itemText}
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
