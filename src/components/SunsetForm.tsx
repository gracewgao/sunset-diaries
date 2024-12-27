import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectLocation, { SunsetLocationCoords } from "./SelectLocation";
import { Color } from "../constants/constants";
import { styled } from "styled-components";
import Spacer from "./common/Spacer";
import TopBar from "./TopBar";
import { IoAdd, IoImage } from "react-icons/io5";

const Container = styled.div`
  width: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

const GlowingText = styled.div`
  font-size: 2rem;
  color: ${Color.YELLOW};
  text-shadow: 0 0 10px ${Color.ORANGE};
`;

const OrangeGlowingText = styled.div`
  font-size: 1.5rem;
  color: ${Color.YELLOW};
  text-shadow: 0 0 8px ${Color.ORANGE};
`;

const Button = styled.button`
  background-color: ${Color.BACKGROUND};
  color: ${Color.WARM_GREY};
  font-family: "Inclusive Sans";
  border: none;
  padding: 0;
  display: inline-block;
  cursor: pointer;
`;

const UploadSunset = styled.div`
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

const UploadDisplay = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// todo: the date picker icon lookin a little ugly
const TextInput = styled.input`
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

const TextArea = styled.textarea`
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

function TextLabel(props: { required?: boolean; children: React.ReactNode }) {
  const Label = styled.span`
    color: ${Color.WHITE};
    font-size: 1rem;
  `;
  const Required = styled.span`
    color: ${Color.ORANGE};
    font-size: 1rem;
  `;

  return (
    <>
      <Label>{props.children}</Label>
      {props.required ? <Required>{" *"}</Required> : null}
    </>
  );
}

const SunsetForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [sunsetUrl, setSunsetUrl] = useState<string>("");
  const [sunsetCaption, setSunsetCaption] = useState("");
  const [sunsetLocationName, setSunsetLocationName] = useState("");
  const [sunsetLocationCoords, setSunsetLocationCoords] =
    useState<SunsetLocationCoords | null>(null);
  const [sunsetTimestamp, setSunsetTimestamp] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dmw7198oi/image/upload";
  const UPLOAD_PRESET = "sunset-diaries";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSunsetCaption(e.target.value);
  };

  const handleLocationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSunsetLocationName(e.target.value);
  };

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
    const unixTimestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
    setSunsetTimestamp(unixTimestamp);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    if (sunsetUrl != "" && submitted) {
      handleSubmit();
    }
  }, [sunsetUrl]);

  const handleImageUpload = async () => {
    setSubmitted(true);

    if (!image) {
      console.error("please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      setSunsetUrl(response.data.secure_url);
      console.log("image uploaded!");
    } catch (error) {
      console.error("error uploading image:", error);
    }
  };

  const API_URL =
    "https://szkvjn0so9.execute-api.us-east-1.amazonaws.com/sunsets/new";

  const handleSubmit = async () => {
    const payload = {
      sunset_url: sunsetUrl,
      sunset_caption: sunsetCaption,
      sunset_location_coords: sunsetLocationCoords,
      sunset_location_name: sunsetLocationName,
      sunset_timestamp: sunsetTimestamp,
      user_name: userName,
    };

    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response:", response.data);
    } catch (error) {
      console.error("error uploading sunset:", error);
    }

    resetForm();
  };

  const resetForm = () => {
    setSunsetUrl("");
    setSunsetCaption("");
    setSunsetLocationName("");
    setSunsetLocationCoords(null);
    setSunsetTimestamp(0);
    setTimestamp("");
    setUserName("");
    setSubmitted(false);
  };

  return (
    <>
      <TopBar sharePage />
      <Container>
        <GlowingText>share your sunset</GlowingText>
        <p>welcome to the sunset diaries club B-)</p>
        <Spacer height={2} />

        <TextLabel required>upload your sunset!</TextLabel>
        <Spacer height={0.5} />
        <UploadSunset>
          <UploadDisplay>
            {image ? (
              <>
                <IoImage size={32} />
                <Spacer height={0.25} />
                {image.name}
              </>
            ) : (
              <>
                <IoAdd size={32} />
                <Spacer height={0.25} />
                upload image
              </>
            )}
          </UploadDisplay>
          <input type="file" accept="image/jpeg" onChange={handleImageChange} />
        </UploadSunset>
        <Spacer height={1.5} />

        <TextLabel required>when was your sunset?</TextLabel>
        <Spacer height={0.5} />
        <TextInput
          type="datetime-local"
          id="datetime"
          value={timestamp}
          onChange={handleTimestampChange}
        />
        <Spacer height={1.5} />

        <TextLabel required>select location on map</TextLabel>
        <Spacer height={0.5} />
        <SelectLocation
          setCoords={setSunsetLocationCoords}
          coords={sunsetLocationCoords}
        />
        <Spacer height={1.5} />

        <TextLabel>location description</TextLabel>
        <Spacer height={0.5} />
        <TextInput
          type="text"
          placeholder="ocean beach"
          onChange={handleLocationNameChange}
        />
        <Spacer height={1.5} />

        <TextLabel>add a caption</TextLabel>
        <Spacer height={0.5} />
        <TextArea
          value={sunsetCaption}
          rows={3}
          placeholder="west coast best coast!!! <3"
          onChange={handleCaptionChange}
        />
        <Spacer height={1.5} />

        <TextLabel>what's your name?</TextLabel>
        <Spacer height={0.5} />
        <TextInput
          type="text"
          placeholder="olivia"
          onChange={handleUserNameChange}
        />
        <Spacer height={1.5} />
        <Button onClick={handleImageUpload}>
          <OrangeGlowingText>submit</OrangeGlowingText>
        </Button>
        <Spacer height={2} />
        <p>{"made with <3 by grace"}</p>
      </Container>
    </>
  );
};

export default SunsetForm;
