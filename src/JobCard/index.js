import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobDetails} = props
  const {title, brand, price, imageUrl, rating} = jobDetails
  return (
    <Link to="/jobs/:id">
      <li>
        <img src={imageUrl} alt="job logo" />
        <h1>{title}</h1>
        <p>{brand}</p>
        <p>{price}</p>
      </li>
    </Link>
  )
}
export default JobCard
