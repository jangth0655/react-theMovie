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

const GoogleBtn = styled.button``;

const GithubBtn = styled.button``;

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

  console.log(auth.currentUser);
  return (
    <div>
      <div>
        <GoogleBtn onClick={onSocialClick} name="google">
          Continue width Google
        </GoogleBtn>
        <GithubBtn onClick={onSocialClick} name="github">
          Continue width Github
        </GithubBtn>
      </div>
    </div>
  );
};

export default Auth;
