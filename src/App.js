import "./App.css";
import React, { useState, useEffect } from "react";

const drone = new window.Scaledrone("GBfOUUmLKWQRBekz");
const room = drone.subscribe("soba");

function App() {
  const [messageList, setMessageList] = useState([]);
  let [currentInputValue, setCurrentInputValue] = useState("");

  function sendMessage() {
    if (!currentInputValue) {
      return;
    }

    drone.publish({
      room: "soba",
      message: currentInputValue,
    });

    setCurrentInputValue("");
  }

  function onInputChange(event) {
    setCurrentInputValue(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    let myName = randomName();
    let myColor = randomColor();
    let knownClients = [];

    room.on("message", (message) => {
      let isMe = message.clientId === drone.clientId;

      if (
        !isMe &&
        !knownClients.find((client) => client.clientId === message.clientId)
      ) {
        knownClients.push({
          clientId: message.clientId,
          name: randomName(),
          color: randomColor(),
        });
      }

      let client = knownClients.find(
        (client) => client.clientId === message.clientId
      );

      setMessageList((previous) => [
        ...previous,
        {
          text: message.data,
          person: isMe ? myName : client.name,
          ownMessage: isMe,
          color: isMe ? myColor : client.color,
        },
      ]);
    });
  }, []);

  return (
    <div className="app">
      <div className="chat">
        {messageList.map((message, i) => (
          <div
            key={i}
            className={"message " + (message.ownMessage ? "message-own" : "")}
          >
            <div className="person">{message.person}</div>
            <div className="text" style={{ background: message.color }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          id="input"
          name="input"
          className="input"
          value={currentInputValue}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Upisi poruku"
        />
        <button className="input-button" type="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

function randomName() {
  const adjectives = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default App;
