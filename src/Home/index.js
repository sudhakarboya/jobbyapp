import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Find The Job That Fits Your Life</h1>
          <img src="" alt="" />
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potentiality.
          </p>
          <Link to="/jobs">
            <button type="button" className="shop-now-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
