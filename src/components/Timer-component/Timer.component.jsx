import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";
import clsx from "clsx";

const TimerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TimerIcon = styled(Icon)`
  padding: 1rem;
  color: darkblue;
`;

const TimerBar = styled(LinearProgress)`
  width: 100rem;
  border-radius: 10px;
`;

const QuizTimer = ({
  className,
  hasIcon,
  timerIcon,
  tickFrequency,
  initialTime,
  timeLeft,
  timerProps,
  iconProps,
  ...otherProps
}) => {
  const [progress, setProgress] = useState(initialTime);
  const time_to_subtrack = 1000;

  useEffect(() => {
    if (!progress) return;
    const progress_timer = setTimeout(() => {
      setProgress((progress) => progress - time_to_subtrack);
    }, tickFrequency);
    return () => {
      clearInterval(progress_timer);
    };
  }, [progress]);

  useEffect(() => {
    if (!timeLeft || timeLeft > initialTime) return;
    setProgress(timeLeft);
  }, [timeLeft]);

  const formatMillisToPercentage = (milliseconds) => {
    return Math.floor((milliseconds / initialTime) * 100);
  };

  return (
    <TimerContainer className={clsx(className)} {...otherProps}>
      {hasIcon ? <TimerIcon {...iconProps}>{timerIcon}</TimerIcon> : null}
      <TimerBar
        variant="determinate"
        value={formatMillisToPercentage(progress)}
        {...timerProps}
      />
    </TimerContainer>
  );
};

export default QuizTimer;
