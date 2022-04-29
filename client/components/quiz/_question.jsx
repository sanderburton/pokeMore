export const Question = ({ questionId, question }) => {
  const { prompt, options } = question;
  return (
    <div className="question">
      <div className="prompt">{prompt}</div>
      {options ? (
        options.map((option, index) => (
          <div key={`${questionId}-${index}`} className="option">
            <input type="radio" id={`${questionId}-${index}`} name={questionId} />
            <label className="radio-label" htmlFor={`${questionId}-${index}`}>
              {option.text}
            </label>
          </div>
        ))
      ) : (
        <div className="option">
          <input type="date" id={`${questionId}-0`} name={questionId} />
        </div>
      )}
    </div>
  );
};
