import React from 'react';

// import ToolBar from './ToolBar.jsx';
import ProfileImg from './ProfileImg.jsx';
import ProfileStats from './ProfileStats.jsx';
import Avatar from './Avatar.jsx';
import Album from './Album.jsx';
import Spacer from './Spacer.jsx';
import AjaxLoader from './AjaxLoader.jsx';


export default class Profile extends React.Component {

  state = {
      loading: true,
  };

  serverRequest = null;

	// componentDidMount() {
	// 	//fetch the data
 //    this.serverRequest = fetch(URL)
 //    .then(r => r.json())
 //    .then((dinnermenu) => {
 //        console.log('dinnermenu.json', dinnermenu);
 //        this.setState({
 //            dinnermenu: dinnermenu.menu,
 //            loading: false
 //        });
 //    });
	// }

  // abort the running ajax request, if component is unmounted
  componentWillUnmount() {
      if (this.serverRequest) {
          this.serverRequest.abort();
      }
  }

              // <ToolBar />

	render () {
		  return (
          <div>
              <ProfileImg />
              <ProfileStats />
              <Avatar mini={false} offset={true} />
              <Spacer />
              <Album />
              <Spacer />
              <AjaxLoader />
          </div>
		  );
	}

}
