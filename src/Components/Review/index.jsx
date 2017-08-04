/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import {grey400} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
// Material Component: Layout (Grid)
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { humanReadableDate, humanRelativeDate, translateDayOffset } from '../../shared/helpers'
import ReviewCard from './ReviewCard'
import Spacer from '../Shared/Spacer'
//--
import { updatesList } from './store'



class Review extends React.PureComponent {
    render () {
          return (
            <div>
                <h2>Crowd Review</h2>
                <div>

			        <div class="mdc-layout-grid">
			          <div class="mdc-layout-grid__inner">
			            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-4-phone">
	                    {
	                        updatesList.map((item, i) => {
	                            return (
	                            	<div style={{marginBottom: '16px'}}>
	                                    <ReviewCard
		                                    id={i}
		                                    primaryText={item.primaryText}
		                                    secondaryText={item.secondaryText}
		                                    fromUsername={item.fromUsername}
		                                    datetime={humanRelativeDate(item.timestamp)}
		                                    gridColumnsFull={4}
		                                    gridColumnsTablet={3}
		                                    gridColumnsPhone={1}
		                                />
	                            	</div>
	                            )
	                        })
	                    }
	    		        </div>
		              </div>
	                </div>

                </div>
                <Spacer />
            </div>
          )
    }
}

export default Review
