import Loader from 'react-router-dom'
import {Component} from 'react'
import Header from '../Header'

class JobDetails extends Component {
  state = {isLoading: true, jobDetailsList: [], isRequest: true}

  componentDidMount() {
    this.getJobDetails()
  }

  jobDetails = async () => {
    const {history} = this.props
    const {match} = history
    const {params} = match
    const {id} = params
    const url = 'https://apis.ccbp.in/jobs/'

    const response = await fetch(`${url}${id}`)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(eachSkill => ({
            imgUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imgUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          id: eachJob.id,
          employmentType: eachJob.employment_type,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      this.setState({jobDetailsList: updatedData, isLoading: false})
    } else {
      this.setState({isRequest: false})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsList = () => {
    const {jobDetailsList} = this.state
    const {jobDetails, similarJobs} = jobDetailsList
    return (
      <div>
        <JobHeader />
        <img src={jobDetails.companyLogoUrl} alt="company logo" />
        <a href={jobDetails.companyWebsiteUrl} target="_blank" />
        <p>{jobDetails.employmentType}</p>
        <p>{jobDetails.location}</p>
        <p>{jobDetails.packagePerAnnum}</p>
        <hr />

        <div>
          <p>{jobDetails.jobDescription}</p>
          <p>Skills</p>
          <ul>
            {jobDetails.skills.map(eachOne => (
              <div>
                <img src={eachOne.imgUrl} alt="" /> <p>{eachOne.name}</p>
              </div>
            ))}
          </ul>

          <p>Life at Company</p>
          <p>{jobDetails.lifeAtCompany.description}</p>
          <img src={jobDetails.lifeAtCompany.imgUrl} alt="" />
        </div>
        <ul>
          {similarJobs.map(each => {
            ;<li>
              <img src={each.companyLogoUrl} alt="similar company logo" />
              <p>{each.employmentType}</p>
              <p>{each.jobDescription}</p>
              <p>{each.location}</p>
              <p>{each.rating}</p>
              <p>{each.title}</p>
            </li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, isRequest} = this.state
    if (isRequest === false) {
      return (
        <div>
          <img src="" alt="" />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find you are looking for</p>
          <button>retry</button>
        </div>
      )
    }
    return (
      <div>
        <Header />
        {isLoading ? renderLoader() : renderJobDetailsList()}
      </div>
    )
  }
}
export default JobDetails
