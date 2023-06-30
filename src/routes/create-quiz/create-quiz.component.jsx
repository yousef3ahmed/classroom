import "./create-quiz.styles.css";

const CreateQuiz = () => {
  return (
    <div>
      <div>
        <span>qution in side</span>
      </div>
      <div>
        <h2>MY first Quiz</h2>

        <div>
          <textarea></textarea>
        </div>

        <div>
          <span>To mark an option as correct, simply double-click on it.</span>

          <div>
            <div>
              <button>option 1</button>
              <button>option 2</button>
            </div>
            <div>
              <button>option 3</button>
              <button>option 4</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
