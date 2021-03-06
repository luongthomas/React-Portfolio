// Mainly here to provide easier import pathing
// import via
//  import { MainContainer } from '../containers'

export MainContainer from './Main/MainContainer'

// not valid javascript, babel allows us to do this,
// if want valid JS then:
// export { default as MainContainer } from './Main/Container'

export HomeContainer from './Home/HomeContainer'
export AuthenticateContainer from './Authenticate/AuthenticateContainer'
export FeedContainer from './Feed/FeedContainer'
export LogoutContainer from './Logout/LogoutContainer'
export ModalContainer from './Modal/ModalContainer'
export DuckContainer from './Duck/DuckContainer'
export UserContainer from './User/UserContainer'
export DuckDetailsContainer from './DuckDetails/DuckDetailsContainer'
export RepliesContainer from './Replies/RepliesContainer'
