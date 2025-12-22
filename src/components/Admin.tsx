import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, Color } from "../constants/constants";
import Spacer from "./common/Spacer";
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsXCircle,
  BsXCircleFill,
} from "react-icons/bs";

import {
  Button,
  Container,
  formatTimestamp,
  GlowingText,
  Link,
  SecondarySubheading,
  Subheading,
  TextInput,
} from "./common/common";
import TextLabel from "./common/TextLabel";
import { getAdminSunsets, Status, SunsetItem } from "../util/api";
import { styled } from "styled-components";
import { Row } from "./common/Row";
import Toggle from "./common/Toggle";

const BUTTON_SIZE = 32;

const ReviewContainer = styled.div``;

const SunsetImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 10px;
`;

const ItemValue = styled.div`
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: ${Color.WHITE};
`;

export const ReviewButton = styled.button`
  text-decoration: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${Color.ORANGE};
    -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }
`;

const Admin: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");

  const [complete, setComplete] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [approved, setApproved] = useState<SunsetItem[]>([]);
  const [rejected, setRejected] = useState<SunsetItem[]>([]);
  const [pending, setPending] = useState<SunsetItem[]>([]);

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
  };

  const handleGetSunsets = async () => {
    try {
      if (!complete) {
        return;
      }
      setLoading(true);
      await fetchData();
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
      setMessage("error fetching sunsets");
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response: SunsetItem[] = await getAdminSunsets(accessCode);
      response.sort((a, b) => {
        return a.uploadTimestamp - b.uploadTimestamp;
      });
      const approved = response.filter(
        (item) => item.approved === Status.APPROVED
      );
      const rejected = response.filter(
        (item) => item.approved === Status.REJECTED
      );
      const pending = response.filter(
        (item) => item.approved === Status.PENDING
      );
      setApproved(approved);
      setRejected(rejected);
      setPending(pending);
    } catch (err) {
      console.error("error:", err);
    }
  };

  const updateApprovalStatus = async (item: SunsetItem, status: Status) => {
    try {
      if (!complete) {
        return;
      }
      await axios.patch(
        `${API_URL}/sunsets/review`,
        {
          sunset_id: item.sunsetId,
          sunset_status: status,
        },
        {
          headers: {
            "X-Access-Code": accessCode,
          },
        }
      );
      setMessage(`submission ${item.index} marked as ${status}`);
      fetchData();
    } catch (error) {
      console.error("error updating status:", error);
      setMessage("failed to update status");
    }
  };

  useEffect(() => {
    const validateInput = () => {
      if (accessCode.length === 0) {
        setMessage("access code is required");
        return false;
      }
      setMessage("");
      return true;
    };
    setComplete(validateInput());
  }, [accessCode]);

  return (
    <Container>
      <GlowingText>admin</GlowingText>
      <p>
        this admin panel is used to review submissions to sunset diaries!
      </p>
      <Spacer height={2} />
      <TextLabel required>access code</TextLabel>
      <Spacer height={0.5} />
      <TextInput
        value={accessCode}
        type="text"
        placeholder=""
        onChange={handleAccessCodeChange}
      />
      <Spacer height={1.5} />
      <Button
        onClick={handleGetSunsets}
        disabled={!complete}
        loading={loading}
      >
        {loading ? "loading..." : "get submissions"}
      </Button>
      <p>{message}</p>
      <p>{response}</p>
      <Spacer height={1.5} />
      <Toggle heading={`pending (${pending.length})`}>
        {pending.map((item, i) => (
          <>
            <ReviewItem
              key={item.sunsetId}
              updateApprovalStatus={updateApprovalStatus}
              item={item}
              complete={complete}
            />
            {i != pending.length - 1 ? <Spacer height={1} /> : null}
          </>
        ))}
        {pending.length === 0 ? "no pending submissions" : null}
      </Toggle>
      <Spacer height={1} />
      <Toggle heading={`approved (${approved.length})`}>
        {approved.map((item, i) => (
          <>
            <ReviewItem
              key={item.sunsetId}
              updateApprovalStatus={updateApprovalStatus}
              item={item}
              complete={complete}
            />
            {i != approved.length - 1 ? <Spacer height={1} /> : null}
          </>
        ))}
        {approved.length === 0 ? "no approved submissions" : null}
      </Toggle>
      <Spacer height={1} />
      <Toggle heading={`rejected (${rejected.length})`}>
        {rejected.map((item, i) => (
          <>
            <ReviewItem
              key={item.sunsetId}
              updateApprovalStatus={updateApprovalStatus}
              item={item}
              complete={complete}
            />
            {i != rejected.length - 1 ? <Spacer height={1} /> : null}
          </>
        ))}
        {rejected.length === 0 ? "no rejected submissions" : null}
      </Toggle>
      <Spacer height={2} />
    </Container>
  );
};

interface IReviewItem {
  item: SunsetItem;
  updateApprovalStatus: (item: SunsetItem, status: Status) => void;
  complete: boolean;
}

const ReviewItem: React.FC<IReviewItem> = (props: IReviewItem) => {
  return (
    <ReviewContainer>
      <Subheading>submission {props.item.index}</Subheading>
      <Spacer height={1} />
      name
      <ItemValue>{props.item.userName || "anonymous"}</ItemValue>
      submitted photo
      <Spacer height={1} />
      <SunsetImage src={props.item.sunsetUrl} />
      <Spacer height={1} />
      location name
      <ItemValue>{props.item.sunsetLocationName}</ItemValue>
      location coordinates
      <ItemValue>
        <Link
          href={`https://www.google.com/maps?q=${props.item.sunsetLocationCoords.lat},${props.item.sunsetLocationCoords.lng}`}
        >
          {`(${props.item.sunsetLocationCoords.lat.toFixed(5)}, 
        ${props.item.sunsetLocationCoords.lng.toFixed(5)})`}
        </Link>
      </ItemValue>
      photo time
      <ItemValue>{formatTimestamp(props.item.sunsetTimestamp)}</ItemValue>
      description
      <ItemValue>{props.item.sunsetCaption}</ItemValue>
      uploaded time
      <ItemValue>{formatTimestamp(props.item.uploadTimestamp)}</ItemValue>
      <Spacer height={0.5} />
      <Row>
        {props.item.approved === Status.APPROVED ? (
          <BsCheckCircleFill size={BUTTON_SIZE} />
        ) : (
          <Link
            onClick={() =>
              props.updateApprovalStatus(props.item, Status.APPROVED)
            }
            disabled={!props.complete}
          >
            <BsCheckCircle size={BUTTON_SIZE} />
          </Link>
        )}
        <Spacer width={1} />
        {props.item.approved === Status.REJECTED ? (
          <BsXCircleFill size={BUTTON_SIZE} />
        ) : (
          <Link
            onClick={() =>
              props.updateApprovalStatus(props.item, Status.REJECTED)
            }
            disabled={!props.complete}
          >
            <BsXCircle size={BUTTON_SIZE} />
          </Link>
        )}
      </Row>
      <Spacer height={1} />
    </ReviewContainer>
  );
};

export default Admin;
