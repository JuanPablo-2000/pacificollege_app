import { useEffect, useState } from "react";
import { ModalStudentsProps } from "../interfaces/ModalUser";

import InfiniteScroll from "react-infinite-scroll-component";

import "../styles/ModalLateStudents.css";
import CardUser from "./CardUser";
import UserServices from "../services/UserServices";
import ModalUser from "./ModalUser";
import { ForModalUser } from "../interfaces/ModalUser";
import User from "../interfaces/User";
import { SubmitHandler } from "react-hook-form";

const service = new UserServices();

export const ModalLateStudents = ({
  showModal,
  closeModal,
}: ModalStudentsProps) => {

    const [page, setPage] = useState(0);
    const [finish, setFinish] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [users, setusers] = useState<any[]>([])
    const [selectUser, setselectUser] = useState();
    const [userSelected, setUserSelected] = useState<User>();

  useEffect(() => {
    chargeInitial();
    if (showModal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [showModal]);

  const modalFuntion: SubmitHandler<ForModalUser> = (data) => {
    // if () {

    // } else {

    // }
  }

  const getLateStudents = async () => {
    const data: any = await service.getLateStudentsForPageable(page);
    return data?.content;
  };

  const chargeInitial = async () => {
    const infoLateStudents: any = await getLateStudents();

    setPage(1);
    setusers(infoLateStudents);
  };

  const toggleModal = (selected: any) => {
    setselectUser(selected.id);
    setUserSelected(selected);
    setModal(true);
  };

  const toggleCloseModal = () => {
    closeModal(!showModal)
  }

  const handleChangePages = async () => {
    let usersInfo = [];
    usersInfo = await getLateStudents();

    setusers([...users, ...usersInfo])
    setPage(page + 1);

    if (usersInfo?.length < 10) {
        setFinish(true);
    }
  }

  return (
    <>
      <form className="modal" style={{ zIndex: 2 }}>
        <div>
          <div className="overlay">
            <div className="modal-content">
              <h2 className="title-modal">Possible Inactive Students</h2>
              <div className="modal-content-grid">
                <InfiniteScroll
                    dataLength={users.length}
                    hasMore={!finish}
                    next={handleChangePages}
                    loader={""}
                >
                    <div className="margin-card-students">
                        {users?.map((card, num) => {
                            return (
                                <CardUser
                                    clickHandler={(selected) => toggleModal(selected)}
                                    key={num}
                                    data={card}
                                />
                            );
                        })}
                    </div>
                </InfiniteScroll>
              </div>
              <div className="close-modal" onClick={toggleCloseModal}>
                <h3>X</h3>
              </div>
            </div>
          </div>
        </div>
      </form>
      {modal && (
        <ModalUser
          showModal={modal}
          closeModal={setModal}
          handleOnSubmit={modalFuntion}
          register={userSelected}
          idUserSelect={selectUser}
          refreshInfo={() => {}}
        />
      )}
    </>
  );
};
