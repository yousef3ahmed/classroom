import "./question-input.styles.css";

const QuestionInput = ({ label, ...otherProps }) => {
  return (
    <input
      className="input-field-container"
      {...otherProps}
      placeholder={label}
    />
  );
};

export default QuestionInput;
