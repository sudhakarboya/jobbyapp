const JobHeader = props => {
  const {
    employmentType,
    minimumPackage,
    updateEmploymentType,
    updateMinimumPackage,
    employmentTypesList,
    salaryRangesList,
  } = props

  const changeEmploymentType = event => {
    updateEmploymentType(event.target.value)
  }
  const changeMinimumPackage = event => {
    updateMinimumPackage(event.target.value)
  }
  return (
    <div>
      <Select value={employmentType} onChange={changeEmploymentType}>
        {salaryRangesList.map(eachOne => (
          <Option
            key={eachOne.employmentTypeId}
            value={eachOne.employmentTypeId}
          >
            {' '}
            {eachOne.label}
          </Option>
        ))}
      </Select>

      <Select value={minimumPackage} onChange={changeMinimumPackage}>
        {employmentTypesList.map(eachOne => (
          <Option key={eachOne.salaryRangeId} value={eachOne.salaryRangeId}>
            {' '}
            {eachOne.label}
          </Option>
        ))}
      </Select>
    </div>
  )
}
export default JobHeader
