import { styled } from "styled-components";
import { Color } from "../../constants/constants";

export const Button = styled.button<{ disabled?: boolean; loading?: boolean }>`
  background-color: ${Color.BACKGROUND};
  color: ${Color.WARM_GREY};
  font-family: "Inclusive Sans";
  border: none;
  padding: 0;
  display: inline-block;

  font-size: 1.5rem;

  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
    color: ${Color.YELLOW};
    text-shadow: 0 0 8px ${Color.ORANGE};

    &:hover {
        color: ${Color.ORANGE};
        text-shadow: 0 0 12px ${Color.ORANGE};
    }
    `}

  ${(props) =>
    props.loading &&
    `
    color: ${Color.ORANGE};
    animation: pulse-glow 3s ease-in-out infinite;

    @keyframes pulse-glow {
    0% {
      text-shadow: 0 0 4px ${Color.ORANGE};
    }
    50% {
      color: ${Color.YELLOW};
      text-shadow: 0 0 8px ${Color.ORANGE};
    }
    100% {
      text-shadow: 0 0 4px ${Color.ORANGE};
    }
  }
    `}
`;

export const Container = styled.div`
  width: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

export const GlowingText = styled.div`
  font-size: 2rem;
  color: ${Color.YELLOW};
  text-shadow: 0 0 10px ${Color.ORANGE};
`;

export const UploadSunset = styled.div`
  color: ${Color.WARM_GREY};
  border: 1px dashed ${Color.WARM_GREY};
  border-radius: 8px;
  position: relative;

  input[type="file" i] {
    cursor: pointer;
    opacity: 0;
    height: 150px;
    width: 100%;
  }
`;

export const UploadDisplay = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// todo: the date picker icon lookin a little ugly
export const TextInput = styled.input`
  padding: 10px 16px;
  width: 100%;
  box-sizing: border-box;
  background: ${Color.MED_GREY};
  color: ${Color.WHITE};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Inclusive Sans";
  -webkit-appearance: none;
`;

export const TextArea = styled.textarea`
  padding: 10px 16px;
  width: 100%;
  box-sizing: border-box;
  background: ${Color.MED_GREY};
  color: ${Color.WHITE};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Inclusive Sans";
`;

export const AutofillCheck = styled.label`
  color: ${Color.WARM_GREY};
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
  display: none;
`;

export const TextLink = styled.a<{ noStyle?: boolean }>`
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.noStyle ? "inherit" : `${Color.YELLOW}`};
  text-shadow: ${(props) => props.noStyle ? "inherit" : `0 0 4px ${Color.ORANGE}`};

  &:hover {
    color: ${Color.ORANGE};
    text-shadow: 0 0 2px ${Color.ORANGE};
  }
`;

export const MainText = styled.p`
  color: ${Color.WHITE};
`;

export const Subheading = styled.div`
  font-size: 1.25rem;
  color: ${Color.YELLOW};
  text-shadow: 0 0 4px ${Color.ORANGE};
  text-transform: lowercase;
`;

export const SecondarySubheading = styled.div`
  font-size: 1.5rem;
  color: ${Color.WARM_GREY};
  text-transform: lowercase;
`;

export const Link = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  color: inherit;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
    &:hover {
      color: ${Color.ORANGE};
      -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
      filter: drop-shadow(0 0 4px ${Color.ORANGE});
    }
    `}
`;

// unix to string date formatter
export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formatter.format(date).toLowerCase();
};
