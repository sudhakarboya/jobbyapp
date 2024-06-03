import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobHeader from '../JobsHeader'
import JobCard from '../JobCard'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileUrl = 'https://apis.ccbp.in/profile'

class Jobs extends Component {
  state = {
    profileData = {},
    jobList: [],
    isLoading: true,
    employmentType: employmentTypesList[0].employmentTypeId,
    minimumPackage: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    isRequest: true,
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfile()
  }

  getProfile = async () => {
    const response = await fetch(profileUrl)
    const data = await response.json()
    const updatedProfile = {
      name: data.profile_details.name,
      imageUrl: data.profile_details.profile_image_url,
      bio: data.profile_details.short_bio,
    }
    this.setState({profileData: updatedProfile})
  }

  getJobsList = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        jobList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isRequest: false})
    }
  }

  updateEmploymentType = employmentType => {
    this.setState({employmentType})
  }
  updateMinimumPackage = minimumPackage => {
    this.setState({minimumPackage})
  }
  changeInput = event => {
    this.setState({searchInput = event.target.value})
  }

  renderLoader = () => {
    return (
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  renderJobsList = () => {
    const {profileData, jobList, employmentType, minimumPackage} = this.state
    const {name, imageUrl, bio} = profileData
    return (
      <div>
        <div>
          <img src={imageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
        <input
          type="search"
          palceholder="search here"
          onChange={this.changeInput}
        />
        <JobHeader
          employmentType={employmentType}
          minimumPackage={minimumPackage}
          updateEmploymentType={this.updateEmploymentType}
          updateMinimumPackage={this.updateMinimumPackage}
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />

        <ul>
          {jobList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }
  render() {
    const {isLoading, isRequest} = this.state
    if (isRequest === false) {
      return (
        <div>
          <JobHeader
            employmentType={employmentType}
            minimumPackage={minimumPackage}
            updateEmploymentType={this.updateEmploymentType}
            updateMinimumPackage={this.updateMinimumPackage}
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
          />

          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button>retry</button>
        </div>
      )
    }
    return (
      <div>
        <Header />
        {isLoading ? renderLoader() : renderJobsList()}
      </div>
    )
  }
}
export default Jobs
