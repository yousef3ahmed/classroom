import "./quetion-area.styles.css";

const QuestionArea = ({ label, ...otherProps }) => {
  return (
    <div className="textarea-container">
      <textarea className="question-area" {...otherProps} placeholder={label} />
    </div>
  );
};

export default QuestionArea;
