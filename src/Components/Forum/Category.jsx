/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import Avatar from 'material-ui/Avatar'

import { fetchCategory, fetchThreadsForCategory } from '../../actions'
import Threads from './Threads'
import Loader from '../Shared/Loader'


// const styles = {
//     categoryImg: {
//         textAlign: 'center',
//         margin: '0 auto',
//     },
// }


class Category extends React.Component {
    componentDidMount() {
        const { categoryid } = this.props
        this.props.fetchCategory(categoryid)
        this.props.fetchThreadsForCategory(categoryid)
    }
    // componentDidUpdate(prevProps) {
    // }
    render() {
        console.log('this.props.category', this.props.category)
        const { isFetching, title, content, thumb, threads = [] } = this.props.category

        const CategoryInfo = <div><InfoIcon /> {threads.length} threads</div>

        return (
            <div>
                <Loader isLoading={isFetching} />
                <List>
                  <ListItem
                    primaryText={<h2>{title}</h2>}
                    leftAvatar={<Avatar src={thumb} />}
                    rightIconButton={CategoryInfo}
                    disableKeyboardFocus={true}
                    disabled={true}
                  />
                </List>
                <div>
                    {threads && threads.length > 0 ?
                        <Threads threads={threads} />
                        :
                        <div style={{textAlign: 'center'}}>This category is empty.</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.threads.isFetching,
    category: state.category,
    categoryid: ownProps.match.params.categoryid,
})

export default connect(
    mapStateToProps,
    { fetchCategory, fetchThreadsForCategory }
)(Category)
