import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { selectCompany, addCompany } from '../../redux/company';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    selectCompany,
    addCompany,
  }, dispatch)
);

const mapStateToProps = state => ({
  companies: state.company.companies,
  pickedCompanyId: state.company.pickedCompanyId,
});

class CompaniesDropDown extends Component {
  constructor() {
    super();
    this.state = {
      newCompany: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, { value }) {
    return typeof value === 'number'
      ? this.props.selectCompany(value)
      : this.props.addCompany(value);
  }
  render() {
    const { companies, pickedCompanyId } = this.props;
    const allCompanies = companies && companies.map(company => (
      { value: company.id, key: company.id, text: company.name }
    ));
    return (
      <Dropdown
        button closeOnBlur selection fluid
        allowAdditions search
        value={pickedCompanyId ? pickedCompanyId : 0}
        options={allCompanies}
        placeholder="Choose Company"
        onChange={this.handleChange}
      />
    );
  }
}

CompaniesDropDown.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object),
  pickedCompanyId: PropTypes.number,
  selectCompany: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
};

CompaniesDropDown.defaultProps = {
  companies: null,
  pickedCompanyId: 3,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDropDown);
