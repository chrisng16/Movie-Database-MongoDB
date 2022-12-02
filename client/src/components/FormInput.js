import "../styles/FormInput.css";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            {label &&
                <label className={`${otherProps.value.length > 0 ? "shrink" : ""} form-input-label`}>{label}</label>
            }
            <br/>
            <input className="form-input" {...otherProps} />
        </div>
    );
}

export default FormInput;