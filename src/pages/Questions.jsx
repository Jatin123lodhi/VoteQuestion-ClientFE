import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";
import { io } from "socket.io-client";
import { SERVER_BASE_URL } from "../constants";
const Questions = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const { username } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const getQuestions = async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/questions`);
      console.log(res?.data?.response);
      setAllQuestion(res?.data?.response);
    } catch (e) {
      console.log(e?.message);
    }
  };
  useEffect(() => {
    getQuestions();
    setSocket(io(SERVER_BASE_URL));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("questionVoted", () => {
        getQuestions();
      });

      socket.on("questionDeleted", () => {
        getQuestions();
      });

      socket.on("questionAdded", () => {
        getQuestions();
      });

      socket.on("questionEdited", () => {
        getQuestions();
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  const handleLike = (questionId) => {
    console.log("handle like called");
    try {
      socket.emit("upvote", questionId, username);
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div>
      {/* show list of questions  */}
      <div>
        <h2>All questions:</h2>

        <div style={{ marginTop: "20px" }}>
          {allQuestion.map((q) => {
            return (
              <div key={q?._id} style={{ marginTop: "10px" }}>
                <div>
                  <div
                    style={{
                      border: "1px solid white",
                      padding: "5px",
                      minHeight: "100px",
                    }}
                  >
                    <div>{q?.question}</div>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        justifyItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <div>
                        <button
                          onClick={() => handleLike(q?._id)}
                          style={{
                            cursor: "pointer",
                            padding: "4px",
                            width: "50px",
                          }}
                        >
                          Like
                        </button>
                      </div>
                      <div style={{ marginTop: "4px" }}>{q?.votes} Likes</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
