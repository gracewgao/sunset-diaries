import { styled } from "styled-components";
import { Color } from "../../constants/constants";
import { IoSearch } from "react-icons/io5";

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${Color.WARM_GREY};
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px 16px 10px 44px;
  width: 100%;
  box-sizing: border-box;
  background: ${Color.MED_GREY};
  color: ${Color.WHITE};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Inclusive Sans";
  -webkit-appearance: none;

  &::placeholder {
    color: ${Color.WARM_GREY};
  }
`;

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder = "search sunsets" }: SearchInputProps) {
  return (
    <SearchWrapper>
      <SearchIcon>
        <IoSearch size={18} />
      </SearchIcon>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchWrapper>
  );
}

export default SearchInput;

