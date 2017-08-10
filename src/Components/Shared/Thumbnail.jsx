/** @flow */

import React from 'react'

const styles = {
    img: {
        width: '120px',
        height: '67px',
    }
}


const Thumbnail = props => (
    <div>
          <img {...props} alt="" style={styles.img} />
    </div>
)

export default Thumbnail
