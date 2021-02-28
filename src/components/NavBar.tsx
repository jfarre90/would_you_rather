import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { IStoreState } from '../reducers';
import NavBarMenu from './NavBarMenu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'white'
        },
        navBar: {
            justifyContent: 'space-between'
        },
        navBarButton: {
            color: 'white'
        },
        icon: {
            marginRight: theme.spacing(1)
        }
    })
);

const NavBar: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const authUser: string = useSelector((state: IStoreState) => state.authedUser);

    const handleLogout = () => {
        dispatch(setAuthedUser(''));

        history.push('/login');
    };

    const appMenuContent = (
        <Fragment>
            <AiOutlineMenu className={classes.icon} />
            Menu
        </Fragment>
    );

    const userMenuContent = (
        <Fragment>
            <BsFillPersonFill className={classes.icon} />
            {authUser}
        </Fragment>
    );

    const appMenuItems: JSX.Element[] = [
        <div
            key={1}
            onClick={() => {
                history.push('/');
            }}
        >
            Home
        </div>,
        <div
            key={2}
            onClick={() => {
                history.push('/questions/add');
            }}
        >
            New Question
        </div>,
        <div
            key={3}
            onClick={() => {
                history.push('/leaderboard');
            }}
        >
            Leaderboard
        </div>
    ];

    const userMenuItems: JSX.Element[] = [
        <div key={1} onClick={handleLogout}>
            Logout
        </div>
    ];

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar className={classes.navBar}>
                    <NavBarMenu menuContent={appMenuContent} menuItems={appMenuItems} />

                    <Typography variant="h6">Would you rather...</Typography>

                    <NavBarMenu menuContent={userMenuContent} menuItems={userMenuItems} />
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

export default NavBar;
