/** @flow */

import React from 'react'


const styles = {
    ajaxLoaderStyleContainer: {
        marginTop: '10px',
        marginBottom: '30px',
    },
    ajaxLoaderStyle: {
        width: '50px',
        height: '50px',
        margin: 'auto auto',
        backgroundColor: '#999',
    },
}


class AjaxLoader extends React.PureComponent {
    render() {
        return (
            <div style={styles.ajaxLoaderStyleContainer}>
                <div style={styles.ajaxLoaderStyle}>.loading.</div>
            </div>
        )
    }
}

export default AjaxLoader
