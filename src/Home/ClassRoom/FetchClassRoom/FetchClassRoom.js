import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import styles from "./FetchClassRoom.module.css";
import apis from "../../../apis/auth";
import LoadingForHoem from "../../../components/Loading/Loading For Home/LoadingForHoem";

function FetchClassRoom() {
  const [classroom, setClassroom] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    apis
      .ownedClassRoom()
      .then((response) => {
        const result = response.data;
        console.log(result);
        setClassroom(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setisLoading(false);
      });
  }, []);

  return isLoading ? (
    <LoadingForHoem />
  ) : (
    <>
      <section className={styles.gameContainer} style={{ marginTop: "20px" }}>
        {classroom &&
          classroom.map(
            (oneclass) => oneclass.name && <Card ClassRoom={oneclass} />
          )}
      </section>
    </>
  );
}

export default FetchClassRoom;
