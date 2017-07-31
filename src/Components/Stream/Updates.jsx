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

import { humanReadableDate, humanRelativeDate, classifyByDateAgo } from '../../shared/helpers'
import Update from './Update'
import Spacer from '../Shared/Spacer'


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)
const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

function translateDayOffset(offset) {
    const dayNames = [
        'Today',
        'Yesterday',
    ]
    if (!dayNames[offset]) {
        return `${offset} days ago`
    } else {
        return dayNames[offset]
    }
}


const updatesList = [
    {
        primaryText: "Brunch this weekend?",
        secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
        fromUsername: "Brandan Lim",
        timestamp: 1501229377,
    },
    {
        primaryText: "Oui oui",
        secondaryText: "Do you have Paris recommendations? Have you ever been?",
        fromUsername: "Grace Ng",
        timestamp: 1501229177,
    },
    {
        primaryText: "Birdthday gift",
        secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
        fromUsername: "Kerem Suer",
        timestamp: 1501229077,
    },
    {
        primaryText: "Recipe to try",
        secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
        fromUsername: "Raquel Parrado",
        timestamp: 1501220077,
    },
    {
        primaryText: "Brunch this weekend?",
        secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
        fromUsername: "Brandan Lim",
        timestamp: 1501200077,
    },
    {
        primaryText: "Oui oui",
        secondaryText: "Do you have Paris recommendations? Have you ever been?",
        fromUsername: "Grace Ng",
        timestamp: 1501000077,
    },
    {
        primaryText: "Birdthday gift",
        secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
        fromUsername: "Kerem Suer",
        timestamp: 1501000057,
    },
    {
        primaryText: "Recipe to try",
        secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
        fromUsername: "Raquel Parrado",
        timestamp: 1500000057,
    },
]


//    <Divider />
//      <Subheader>Yesterday</Subheader>

class Updates extends React.PureComponent {
    categorize(updatesList) {
        // console.log(updatesList)
        let annotatedList = updatesList.map(obj => {
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
        let categorizedUpdates = this.categorize(updatesList)
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
