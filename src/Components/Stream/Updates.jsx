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

import { humanReadableDate, humanRelativeDate, classifyByDateAgo, translateDayOffset } from '../../common/helpers'
import Update from './Update'
import Spacer from '../Shared/Spacer'
// --
import { updatesList } from './store'


class Updates extends React.PureComponent {
    categorize(updatesList) {
        // console.log(updatesList)
        const annotatedList = updatesList.map(obj => {
            return classifyByDateAgo(obj)
        })
        // console.log(annotatedList)
        let categorizedList = []
        annotatedList.forEach(obj => {
            if (categorizedList[obj.daysAgo]) {
                categorizedList[obj.daysAgo].push(obj)
            } else {
                categorizedList[obj.daysAgo] = [obj]
            }
        })
        // console.log(categorizedList)
        return categorizedList
    }
    render () {
        const categorizedUpdates = this.categorize(updatesList)
        return (
            <div>
                <h2>Updates</h2>
                    {
                        categorizedUpdates.map((group, daysAgo) => {
                            return (
                                <div>
                                    <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                    <Divider />
                                    <div class="mdc-layout-grid">
                                        <div class="mdc-layout-grid__inner">
                                        {
                                            group.map((item, i) => (
                                              <Update
                                                id={i}
                                                primaryText={item.primaryText}
                                                secondaryText={item.secondaryText}
                                                fromUsername={item.fromUsername}
                                                datetime={humanRelativeDate(item.timestamp)}
                                                gridColumnsFull={4}
                                                gridColumnsTablet={3}
                                                gridColumnsPhone={1}
                                              />
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                <Spacer />
            </div>
        )
    }
}

export default Updates
