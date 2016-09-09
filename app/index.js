var USER_DATA = {
  name: 'Thomas Luong',
  username: 'luongthomas',
  image: 'https://avatars1.githubusercontent.com/u/11577853?v=3&s=140'
}


/*
  Focused
  Independent
  Reusable
  Small
  Testable
*/


var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePic = React.createClass({
  render: function() {
    return <img src={this.props.imgUrl} style={{height: 100, width: 100}} />
  }
})

var ProfileLink = React.createClass({
  render: function() {
    return <div>
            <a href={'https://github.com/' + this.props.username}>
            {this.props.username}
            </a>
          </div>
  }
})

var ProfileName = React.createClass({
  render: function() {
    return (
      <div>{this.props.name}</div>
    )
  }
})


var Avatar = React.createClass({
  render: function () {
    return (
      <div>
        <ProfilePic imgUrl={this.props.user.image} />
        <ProfileName name={this.props.user.name} />
        <ProfileLink username={this.props.user.username} />
      </div>
    )
  }
})

ReactDOM.render(
  <Avatar user={USER_DATA} />,
  document.getElementById('app')
)
