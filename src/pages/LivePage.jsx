import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import NavBar from "../Components/NavBar";
const LivePage = () => {
  const rootRef = useRef(null);
  const authState = Cookies.get("_auth_state");
  const user = authState ? JSON.parse(authState) : {};
  useEffect(() => {
    function getUrlParams(url) {
      let urlStr = url.split("?")[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      const result = Object.fromEntries(urlSearchParams.entries());
      return result;
    }

    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      Math.floor(Math.random() * 10000) + "";
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = user.name + "_" + userID;
    const appID = 1584986389;
    const serverSecret = "4f20442b59bd2ca416947ab8b2d31674";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    let role = getUrlParams(window.location.href)["role"] || "Host";
    role =
      role === "Host" ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

    let config = {};
    if (role === "Host") {
      config = {
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
      };
    }

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: rootRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks: [
        {
          name: "Join as an audience",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID +
            "&role=Audience",
        },
      ],
      ...config,
    });
  }, []);

  return (
    <>
      <div ref={rootRef} style={{ width: "100vw", height: "100vh" }}></div>
    </>
  );
};

export default LivePage;
