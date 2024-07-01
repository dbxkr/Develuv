import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Message = ({
  oneMessage,
  user_id,
  oppoProfile,
  oppoName,
  blur,
  setDInfo,
  dInfo,
}) => {
  const [who, setWho] = useState("me");
  // console.log("el : ", oneMessage[0]);
  useEffect(() => {
    setWho(user_id === oneMessage.user_id ? "me" : "other");
  }, [user_id, oneMessage.user_id]);
  const blurLevel = [50, 70, 90, 140, 4000];

  return (
    <MessageContainer who={who}>
      {who === "other" && (
        <Avatar
          src={oppoProfile + "4000" + "&blur=QU2/^23ZzX"}
          onContextMenu={(event) => {
            event.preventDefault();
          }}
          style={{ filter: `blur(${(4 - blur) * 0.8}px)` }}
          onClick={() => {
            if (dInfo) {
              setDInfo(false);
            } else {
              setDInfo(true);
            }
          }}
        />
      )}
      {/* <MessageRead>{oneMessage.message_read ? null : 1}</MessageRead> */}
      <MessageWrapper who={who}>
        {who === "other" && <Author who={who}>{oppoName}</Author>}
        <MessageBody who={who}>
          <MessageText>{oneMessage.message_content}</MessageText>
        </MessageBody>
        <Time who={who}>{oneMessage.message_time}</Time>
      </MessageWrapper>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who === "me" ? "flex-end" : "flex-start")};
  padding: 5px 10px;
  box-sizing: border-box;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ who }) => (who === "me" ? "flex-end" : "flex-start")};
`;

const MessageBody = styled.div`
  max-width: 550px;
  background-color: ${({ who }) => (who === "me" ? "#3d4a79" : "#f2f7fb")};
  color: ${({ who }) => (who === "me" ? "#ffffff" : "#000000")};
  padding: 10px;
  border-radius: ${({ who }) =>
    who === "me" ? "10px 10px 0 10px" : "10px 10px 10px 0"};
  margin-bottom: 5px;
  position: relative;
`;

const MessageText = styled.p`
  margin: 0;
`;

const MessageRead = styled.p`
  margin: 0;
`;

const Time = styled.span`
  font-size: 12px;
  color: #888888;
  margin-top: 5px;
  align-self: ${({ who }) => (who === "me" ? "flex-end" : "flex-start")};
`;

const Author = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #3d4a79;
  text-align: left;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
