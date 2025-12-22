import { styled } from "styled-components";
import { SunsetItem } from "../../util/api";
import SunsetCard from "./SunsetCard";
import { useWindowSize } from "../../util/windowSize";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: start;
`;

const SingleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface SunsetGridProps {
  sunsets: SunsetItem[];
}

function SunsetGrid({ sunsets }: SunsetGridProps) {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <SingleColumn>
        {sunsets.map((sunset) => (
          <SunsetCard key={sunset.sunsetId} sunset={sunset} />
        ))}
      </SingleColumn>
    );
  }

  const leftColumn: SunsetItem[] = [];
  const rightColumn: SunsetItem[] = [];

  sunsets.forEach((sunset, index) => {
    if (index % 2 === 0) {
      leftColumn.push(sunset);
    } else {
      rightColumn.push(sunset);
    }
  });

  return (
    <Grid>
      <Column>
        {leftColumn.map((sunset) => (
          <SunsetCard key={sunset.sunsetId} sunset={sunset} />
        ))}
      </Column>
      <Column>
        {rightColumn.map((sunset) => (
          <SunsetCard key={sunset.sunsetId} sunset={sunset} />
        ))}
      </Column>
    </Grid>
  );
}

export default SunsetGrid;
