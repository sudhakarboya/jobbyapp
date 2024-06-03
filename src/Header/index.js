import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav>
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
