/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form } from "react-bootstrap";

const FormFields = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, value, onchange, errorMessage, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return inputProps?.type === "select" ? (
    <div className={`col-md-6`}>
      <section>
        <label>
          {label}
          <Form.Select
            {...inputProps}
            value={value}
            onChange={onchange}
            onBlur={handleFocus}
            focused={focused.toString()}
            required
          >
            <option>{inputProps?.placeholder}</option>
            {props.fieldData.map((data, index) => (
              <option key={index} value={data?.name ? data?.name : data}>
                {data?.name ? data?.name : data}
              </option>
            ))}
          </Form.Select>
          
          <span>{errorMessage}</span>
        </label>
      </section>
    </div>
  ) : (
    <div className={`${inputProps.fieldWidth?inputProps.fieldWidth:'col-12 col-md-6'}`}>
      <section>
        <label>{label}</label>
        {inputProps.type === "textarea" ? (
          <textarea
            {...inputProps}
            value={value}
            onChange={onchange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
        ) : (
          <input
            {...inputProps}
            value={value}
            onChange={onchange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
        )}
        <span>{errorMessage}</span>
      </section>
    </div>
  );
};

export default FormFields;