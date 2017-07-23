import React from 'react'


const ajaxLoaderStyleContainer = {
	marginTop: '30px',
	marginBottom: '30px',
}
const ajaxLoaderStyle = {
	width: '50px',
	height: '50px',
	margin: 'auto auto',
	backgroundColor: '#999',
}


class AjaxLoader extends React.Component {
    render() {
    	return (
		    <div style={ajaxLoaderStyleContainer}>
			    <div style={ajaxLoaderStyle}>.load.</div>
		    </div>
	    )
    }
}

export default AjaxLoader
