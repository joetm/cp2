 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'


const styles = {
    leaderBoardContainer: {
        width: '400px',
        marginLeft: '20px',
    },
}


const Leaderboard = (props) => {
    return (
        <div>
            <h3>Leaderboard</h3>
            TODO
        </div>
    )
}

const mapStateToProps = (state) => ({
    userid: state.currentUser.id,
})

export default Leaderboard
