import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store";
import { createOrganization } from "../../../store/Organization";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface formData {
  name: string;
  size: string;
  industry: string;
}

export default function Organization() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const organization = useSelector((state: RootState) => state.organization);
  const [formData, setFormData] = useState<formData>({
    name: "",
    size: "1-10",
    industry: "real estate",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (Object.values(formData).includes("")) {
      return toast.error("All fields are required.");
    }

    dispatch(
      createOrganization({
        name: formData.name,
        size: formData.size,
        industry: formData.industry,
      })
    );
  };

  return (
    <>
      <OnboardingContainer>
        <OnboardingHeader>
          <h1>Complete Registration</h1>
          <p>Tell us a little more about your organization.</p>
        </OnboardingHeader>

        <OnboardingForm onSubmit={handleSubmit}>
          <OnboardingInputDiv>
            <OnboardingLabel>Organization Name</OnboardingLabel>
            <OnboardingInput
              type="text"
              placeholder="Organization Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </OnboardingInputDiv>

          <OnboardingInputDiv>
            <OnboardingLabel>Organization Size</OnboardingLabel>
            <OnboardingSelect
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            >
              <OnboardingOption value="1-10">1 - 10</OnboardingOption>
              <OnboardingOption value="11-50">11 - 50</OnboardingOption>
              <OnboardingOption value="51-100">51 - 100</OnboardingOption>
              <OnboardingOption value="101-500">101 - 500</OnboardingOption>
              <OnboardingOption value="501-1000">501 - 1000+</OnboardingOption>
            </OnboardingSelect>
          </OnboardingInputDiv>

          <OnboardingInputDiv>
            <OnboardingLabel>Industry</OnboardingLabel>
            <OnboardingSelect
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
            >
              <OnboardingOption value="real estate">
                Real Estate
              </OnboardingOption>
              <OnboardingOption value="sales">Sales</OnboardingOption>
              <OnboardingOption value="technology">Technology</OnboardingOption>
              <OnboardingOption value="healthcare">Healthcare</OnboardingOption>
              <OnboardingOption value="other">Other</OnboardingOption>
            </OnboardingSelect>
          </OnboardingInputDiv>

          <OnboardingButton
            disabled={
              organization.loading || Object.values(formData).includes("")
                ? true
                : false
            }
          >
            Submit
          </OnboardingButton>
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
  padding: 20px;
`;

const OnboardingHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 1.5rem;
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
  justify-content: center;
  align-items: center;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
