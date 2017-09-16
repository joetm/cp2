/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import LoginButton from '../../Shared/Buttons/LoginButton'
import SignupButton from '../../Shared/Buttons/SignupButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

import routes from '../../../routes'
import { gray } from '../../../common/colors'


const styles = {
    stickyButton: {
        position: 'fixed',
        top: '50%',
        right: 0,
        marginTop: -24,
        zIndex: 9999999,
        'border-bottom-left-radius': 48,
        'border-top-left-radius': 48,
        backgroundColor: gray,
    },
    drawer: {
        padding: '20px',
    },
}


class LoginSidebar extends React.Component {
    state = {
        open: false,
        buttonOffset: 0,
        opacity: 0.5,
    }
    toggleLoginDrawer = () => {
        this.setState({
            open: !this.state.open,
            buttonOffset: this.state.open > 0 ? 0 : 255,
            opacity: this.state.opacity !== 1 ? 1 : 0.5,
        })
    }
    render() {
        const { isAuthenticated, history } = this.props
        // TODO
        const errorMessage = 'TODO'

        if (isAuthenticated) {
            return null
        }

        const Icon = this.state.open ? CloseIcon : LockIcon

        return (
            <div style={{
                ...styles.stickyButton,
                right: this.state.buttonOffset,
                opacity: this.state.opacity
            }}>
                <IconButton
                    onTouchTap={this.toggleLoginDrawer}
                >
                    <Icon />
                </IconButton>

                <Drawer
                    open={this.state.open}
                    openSecondary={true}
                    disableSwipeToOpen={false}
                    docked={true}
                    swipeAreaWidth={30}
                >

                    <div style={styles.drawer}>
                    <div>

                        <h3 style={{margin: '10px 0'}}>Login</h3>

                        <TextField
                            floatingLabelText="Email"
                            name="email"
                        />

                        <TextField
                            floatingLabelText="Password"
                            type="password"
                            name="email"
                        />

                        <RaisedButton
                            label="Login"
                            secondary={true}
                            style={{margin: '30px 0 0 0'}}
                        />

                        <h3 style={{margin: '50px 0 40px 0'}}>Registration</h3>

                        <RaisedButton
                            label="Login"
                            primary={true}
                        />

                        {/*
                                <LoginButton
                                    errorMessage={errorMessage}
                                    onTouchTap={() => history.push(routes.LOGIN)}
                                />
                        */}

                    </div>
                    </div>

                </Drawer>
            </div>
        )
    }
}

export default withRouter(LoginSidebar)
