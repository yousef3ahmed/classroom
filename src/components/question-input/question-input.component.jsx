import "./question-input.styles.css";

const QuestionInput = ({ label, ...otherProps }) => {
  return (
    <div>
      <input {...otherProps} placeholder={label} />
    </div>
  );
};

export default QuestionInput;
