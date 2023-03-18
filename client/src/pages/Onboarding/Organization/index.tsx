import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

export default function Organization() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <OnboardingContainer>
        <OnboardingHeader>
          <h1>Complete Registration</h1>
          <p>Tell us a little more about your organization.</p>
        </OnboardingHeader>

        <OnboardingForm>
          <OnboardingInputDiv>
            <OnboardingLabel>Organization Name</OnboardingLabel>
            <OnboardingInput type="text" placeholder="Organization Name" />
          </OnboardingInputDiv>

          <OnboardingInputDiv>
            <OnboardingLabel>Organization Size</OnboardingLabel>
            <OnboardingInput type="text" placeholder="Organization Name" />
          </OnboardingInputDiv>

          <OnboardingInputDiv>
            <OnboardingLabel>Industry</OnboardingLabel>
            <OnboardingSelect>
              <OnboardingOption value="1">Real Estate</OnboardingOption>
              <OnboardingOption value="3">Sales & Marketing</OnboardingOption>
              <OnboardingOption value="2">Technology</OnboardingOption>
              <OnboardingOption value="3">Healthcare</OnboardingOption>
              <OnboardingOption value="3">Other</OnboardingOption>
            </OnboardingSelect>
          </OnboardingInputDiv>

          <OnboardingButton>Submit</OnboardingButton>
        </OnboardingForm>
      </OnboardingContainer>
    </>
  );
}

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OnboardingHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const OnboardingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  width: fit-content;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const OnboardingInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
`;

const OnboardingLabel = styled.label`
  font-size: 1rem;
`;

const OnboardingInput = styled.input`
  display: flex;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  width: 300px;

  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

const OnboardingSelect = styled.select`
  display: flex;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  width: 320px !important;

  @media screen and (max-width: 768px) {
    width: 270px !important;
  }
`;

const OnboardingOption = styled.option`
  display: flex;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  width: 300px;
  gap: 10px;
`;

const OnboardingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  background-color: #1a91da;
  color: #fff;
  cursor: pointer;
  width: 100%;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #1a91da;
  }
`;
