import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { isLogging, isLogout } from "../slices/IsLoginSlice";
import { useAppDispatch } from "../store";

const GOOGLE = "google";
const GITHUB = "github";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  & button:first-child {
    margin-bottom: var(--margin-size-large);
  }
`;
const ProviderBtn = styled.button`
  font-size: var(--font-size-regular);
  cursor: pointer;
  padding: var(--padding-size-large);
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.main};
  border: 0;
  outline: 0;
  color: white;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.color.darkColor};
  }
`;

const Auth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(isLogging(true));
      } else {
        dispatch(isLogout(false));
      }
    });
  }, [dispatch]);
  console.log(auth.currentUser);

  const onSocialClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    authProvider(name);
  };

  const authProvider = async (providerName: string) => {
    let provider;
    switch (providerName) {
      case GOOGLE:
        provider = new GoogleAuthProvider();

        break;
      case GITHUB:
        provider = new GithubAuthProvider();
        break;
      default:
        return;
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <Main>
      <ButtonBox>
        <ProviderBtn onClick={onSocialClick} name="google">
          Continue width Google
        </ProviderBtn>
        <ProviderBtn onClick={onSocialClick} name="github">
          Continue width Github
        </ProviderBtn>
      </ButtonBox>
    </Main>
  );
};

export default Auth;
