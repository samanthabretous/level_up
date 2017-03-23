import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectCompany } from '../../redux/company';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    selectCompany,
  }, dispatch)
);

const mapStateToProps = state => ({
  companies: state.company.companies,
});

const CompaniesDropDown = ({ companies, selectCompany }) => {
  const allCompanies = companies && companies.map(company => (
    { value: company.id, key: company.id, text: company.name }
  ))
  return (
    <Dropdown
      options={allCompanies}
      placeholder="Choose Company"
      onChange={(e, data) => selectCompany(data.value)}
    />
  );
};

CompaniesDropDown.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object),
  selectCompany: PropTypes.func.isRequired,
};

CompaniesDropDown.defaultProps = {
  companies: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDropDown);
