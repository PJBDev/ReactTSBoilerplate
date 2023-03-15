import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100vh;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const AuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  h2 {
    font-size: 2rem;
    font-weight: bolder;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 50px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background: none;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background: #eaeaea;
  }
  img {
    width: 25px;
    height: 25px;
  }
`;

export const AuthBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: fit-content;
  width: 75%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const OrDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: #a3a3a3;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const AuthTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 10%;
  text-align: center;
  p {
    font-size: 0.9rem;
    color: #a3a3a3;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
  /* change input focus */
  input:focus {
    outline: 1px solid #788fa1;
  }
`;

export const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AuthNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AuthNameInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  height: 35px;
  padding: 15px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const AuthLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.9rem;
`;

export const AuthInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  height: 35px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const AuthFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  h2 {
    font-size: 2rem;
    font-weight: bolder;
    margin: 0;
  }
`;

export const AuthButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  background-color: #1d9bf0;
  color: #fafafa;
  font-weight: 600;
  font-size: 1rem;
  height: 55px;
  width: 100%;
  transition: 0.2s ease-in-out;
  border-radius: 5px;
  &:hover {
    background-color: #1a91da;
    color: #fafafa;
  }
  cursor: pointer;
`;

export const ForgotPassword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 10%;
  font-size: 0.9rem;
  a {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const LinkText = styled.span`
  color: #1d9bf0;
  font-weight: bold;
  a {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    text-decoration: underline;
  }
`;
