import { useTheme } from "styled-components";

const Bold = () => {
  const { colors } = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill={colors.neutral900}>
      <path d="M12.15 37.85V7.3H26.7q3.65 0 6.325 2.4 2.675 2.4 2.675 6 0 1.95-1 3.65t-2.75 2.5V22q2.2.8 3.45 2.775 1.25 1.975 1.25 4.375 0 3.75-2.875 6.225Q30.9 37.85 27.05 37.85Zm6.15-18.1h7.35q1.55 0 2.65-1.075 1.1-1.075 1.1-2.625t-1.1-2.625q-1.1-1.075-2.65-1.075H18.3Zm0 13h7.75q1.7 0 2.925-1.15 1.225-1.15 1.225-2.85 0-1.7-1.225-2.875T26.05 24.7H18.3Z" />
    </svg>
  );
};

export default Bold;
