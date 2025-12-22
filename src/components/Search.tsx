import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { getDisplaySunsets, SunsetItem } from "../util/api";
import SearchInput from "./common/SearchInput";
import SunsetGrid from "./common/SunsetGrid";
import Spacer from "./common/Spacer";
import { Color } from "../constants/constants";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const ResultsCount = styled.p`
  color: ${Color.WARM_GREY};
  margin: 0;
`;

const MAX_QUERY_LENGTH = 200;

const sanitizeQuery = (query: string): string => {
  return query.slice(0, MAX_QUERY_LENGTH).trim();
};

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sunsets, setSunsets] = useState<SunsetItem[]>([]);

  const queryParam = searchParams.get("q") || "";
  const searchQuery = sanitizeQuery(queryParam);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDisplaySunsets();
        response.sort((a, b) => b.sunsetTimestamp - a.sunsetTimestamp);
        setSunsets(response);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  const filteredSunsets = useMemo(() => {
    if (!searchQuery) {
      return sunsets;
    }
    const query = searchQuery.toLowerCase();
    return sunsets.filter((sunset) => {
      const userName = sunset.userName?.toLowerCase() || "";
      const locationName = sunset.sunsetLocationName?.toLowerCase() || "";
      const caption = sunset.sunsetCaption?.toLowerCase() || "";
      return (
        userName.includes(query) ||
        locationName.includes(query) ||
        caption.includes(query)
      );
    });
  }, [sunsets, searchQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeQuery(e.target.value);
    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams]);

  return (
    <PageContainer>
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="search sunsets"
      />
      <Spacer height={1} />
      <ResultsCount>
        {filteredSunsets.length} result{filteredSunsets.length !== 1 ? "s" : ""}
        {searchQuery && ` for "${searchQuery}"`}
      </ResultsCount>
      <Spacer height={1.5} />
      <SunsetGrid sunsets={filteredSunsets} />
    </PageContainer>
  );
};

export default Search;

