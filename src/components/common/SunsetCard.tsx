import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Color } from "../../constants/constants";
import { SunsetItem } from "../../util/api";
import { formatTimestamp } from "./common";

const Metadata = styled.p`
  margin: 0;
  margin-top: 4px;
  font-size: 0.9rem;
  color: ${Color.WARM_GREY};
  transition: color 0.2s ease;
`;

const Caption = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  color: ${Color.WARM_GREY};
  transition: color 0.2s ease;
`;

const SunsetImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  transition: opacity 0.2s ease;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover ${Metadata},
  &:hover ${Caption} {
    color: ${Color.WHITE};
  }

  &:hover ${SunsetImage} {
    opacity: 0.8;
  }
`;

interface SunsetCardProps {
  sunset: SunsetItem;
}

function SunsetCard({ sunset }: SunsetCardProps) {
  const navigate = useNavigate();

  const metadataParts = [];
  if (sunset.userName) {
    metadataParts.push(`${sunset.userName}'s sunset`);
  }
  if (sunset.sunsetLocationName) {
    metadataParts.push(sunset.sunsetLocationName);
  }
  metadataParts.push(formatTimestamp(sunset.sunsetTimestamp));

  const handleClick = () => {
    navigate(`/?index=${sunset.index}`);
  };

  return (
    <Card onClick={handleClick}>
      <SunsetImage src={sunset.sunsetUrl} alt={sunset.sunsetCaption || "sunset"} />
      <Metadata>{metadataParts.join(" • ")}</Metadata>
      {sunset.sunsetCaption && <Caption>{sunset.sunsetCaption}</Caption>}
    </Card>
  );
}

export default SunsetCard;

