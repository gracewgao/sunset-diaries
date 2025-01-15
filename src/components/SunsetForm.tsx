import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectLocation, { SunsetLocationCoords } from "./SelectLocation";
import { API_URL } from "../constants/constants";
import Spacer from "./common/Spacer";
import TopBar from "./TopBar";
import { IoAdd, IoImage } from "react-icons/io5";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

import ExifReader from "exifreader";
import {
  AutofillCheck,
  Button,
  Checkbox,
  Container,
  GlowingText,
  TextArea,
  TextInput,
  TextLink,
  UploadDisplay,
  UploadSunset,
} from "./common/common";
import TextLabel from "./common/TextLabel";
import validator from "validator";

const SunsetForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [sunsetCaption, setSunsetCaption] = useState<string>("");
  const [sunsetLocationName, setSunsetLocationName] = useState<string>("");
  const [sunsetLocationCoords, setSunsetLocationCoords] =
    useState<SunsetLocationCoords | null>(null);
  const [sunsetTimestamp, setSunsetTimestamp] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [autofill, setAutofill] = useState<boolean>(true);

  const [complete, setComplete] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [newForm, setNewForm] = useState<boolean>(true);

  const toUnixTimestamp = (date: string) =>
    Math.floor(new Date(date).getTime() / 1000);

  const handleAutofill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutofill(e.target.checked);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      if (autofill) {
        fillExifData(selectedFile);
      }
    }
  };

  const fillExifData = async (file: File) => {
    const tags = await ExifReader.load(file);

    // sunset timestamp
    if (tags["DateTimeOriginal"]) {
      const imageDate = tags["DateTimeOriginal"]!!.description;
      const isoDate = imageDate.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
      setTimestamp(isoDate);
      setSunsetTimestamp(toUnixTimestamp(isoDate));
    }

    // sunset location
    if (tags["GPSLatitude"] && tags["GPSLongitude"]) {
      const latRef = tags["GPSLatitudeRef"]!!.description;
      const lngRef = tags["GPSLongitudeRef"]!!.description;
      var lat =
        parseFloat(tags["GPSLatitude"]!!.description) *
        (latRef === "North latitude" ? 1 : -1);
      var lng =
        parseFloat(tags["GPSLongitude"]!!.description) *
        (lngRef === "East longitude" ? 1 : -1);
      setSunsetLocationCoords({ lat: lat, lng: lng });
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
    setSunsetTimestamp(toUnixTimestamp(e.target.value));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    if (!complete) {
      return;
    }

    setLoading(true);

    const imageBase64 = await convertBase64(image!!);
    const payload = {
      sunset_caption: validator.escape(sunsetCaption),
      sunset_location_coords: sunsetLocationCoords,
      sunset_location_name: validator.escape(sunsetLocationName),
      sunset_timestamp: sunsetTimestamp,
      user_name: validator.escape(userName),
      access_code: validator.escape(accessCode),
      sunset_image: imageBase64,
    };

    try {
      await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      setResponse("thanks! your sunset was delivered safely<3");
    } catch (error) {
      console.error("error uploading sunset:", error);
      setResponse("hmm something went wrong, please try again...");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setNewForm(true);
    setImage(null);
    setAutofill(true);
    setSunsetCaption("");
    setSunsetLocationName("");
    setSunsetLocationCoords(null);
    setSunsetTimestamp(0);
    setTimestamp("");
  };

  useEffect(() => {
    const validateInput = () => {
      if (newForm) {
        setMessage("");
        setNewForm(false);
        return false;
      }
      setResponse("");
      if (image === null) {
        setMessage("please select an image first!");
        return false;
      }
      if (image.type !== 'image/jpeg') {
        setMessage("only jpeg images allowed!");
        return false;
      }
      if (sunsetTimestamp === 0) {
        setMessage("missing sunset timestamp!");
        return false;
      } else if (sunsetTimestamp > Math.floor(Date.now() / 1000)) {
        setMessage("sunset timestamp is in the future!");
        return false;
      }
      if (sunsetLocationCoords === null) {
        setMessage("please select location on the map!");
        return false;
      }
      if (accessCode === "") {
        setMessage("access code is required!");
        return false;
      }
      setMessage("");
      return true;
    };
    setComplete(validateInput());
  }, [image, sunsetTimestamp, sunsetLocationCoords, accessCode]);

  return (
    <>
      <TopBar />
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
        <Spacer height={1} />
        <AutofillCheck>
          <Checkbox
            type="checkbox"
            checked={autofill}
            onChange={handleAutofill}
          />
          {autofill ? <BsCheckCircleFill size={18} /> : <BsCircle size={18} />}
          autofill from image
        </AutofillCheck>
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
          value={sunsetLocationName}
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
          value={userName}
          type="text"
          placeholder="olivia"
          onChange={handleUserNameChange}
        />
        <Spacer height={1.5} />
        <TextLabel required>access code</TextLabel>
        <Spacer height={0.25} />
        posting is currently limited, please reach out to{" "}
        <TextLink href="mailto:gracewgao@gmail.com">
          gracewgao@gmail.com
        </TextLink>{" "}
        for the code!
        <Spacer height={0.5} />
        <TextInput
          value={accessCode}
          type="text"
          placeholder=""
          onChange={handleAccessCodeChange}
        />
        <Spacer height={1.5} />
        <Button onClick={handleSubmit} disabled={!complete} loading={loading}>
          {loading ? "sending..." : "submit"}
        </Button>
        <p>{message}</p>
        <p>{response}</p>
        <Spacer height={2} />
      </Container>
    </>
  );
};

export default SunsetForm;
