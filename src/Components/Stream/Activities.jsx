/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import {grey400} from 'material-ui/styles/colors'

import { humanReadableDate, humanRelativeDate, classifyByDateAgo, translateDayOffset } from '../../shared/helpers'
import Activity from './Activity'
import Spacer from '../Shared/Spacer'
// --
import { activityList } from './store'


class Activities extends React.PureComponent {
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
        const categorizedActivities = this.categorize(activityList)
        return (
            <div>
                <h2>Updates</h2>
                    {
                        categorizedActivities.map((group, daysAgo) => {
                            return (
                                <div>
                                    <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                    <Divider />
                                    {
                                        group.map((item, i) => (
                                          <Activity
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
                            )
                        })
                    }
                <Spacer />
            </div>
        )
    }
}

export default Activities
