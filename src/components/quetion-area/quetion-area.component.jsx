import "./quetion-area.styles.css";

const QuestionArea = ({ label, ...otherProps }) => {
  return (
    <div>
      <textarea {...otherProps} placeholder={label} />
    </div>
  );
};

export default QuestionArea;
