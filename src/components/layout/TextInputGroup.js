import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = ({ label, name, value, placeholder, type, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} onChange={onChange} value={value} className={"form-control form-control-lg " + (error ? 'is-invalid' : 'is-valid')} placeholder={placeholder} />
            {error && <div className="invalid-feedback">{error}</div>}
            
        </div>
    );
};

TextInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

TextInputGroup.defaultProps = {
    type: 'text'
}

export default TextInputGroup;
