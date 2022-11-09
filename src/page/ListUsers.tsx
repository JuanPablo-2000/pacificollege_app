import { useEffect, useState } from "react";
import CardUser from "../container/CardUser";
import Search from "../container/Search";
import InfiniteScroll from "react-infinite-scroll-component";

import UserServices from "../services/UserServices";

import closeSession from "../assets/img/iniciar-sesion.png";
import plusSign from "../assets/img/plus-sign.png";
import downloadFile from "../assets/img/abrir-caja.png";

import "../styles/styles.css";
import ModalUser from "../container/ModalUser";
import { ForModalUser } from "../interfaces/ModalUser";
import { SubmitHandler } from "react-hook-form";

import UserFilter from "../interfaces/UserFilter";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import sweetAlert from "sweetalert";
import { ModalLateStudents } from "../container/ModalLateStudents";

const service = new UserServices();
const pageSize = 10;

const ListUsers = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalStudents, setmodalStudents] = useState<boolean>(true);
  const [finished, setFinished] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>();
  const [selectUser, setSelectUser] = useState();

  const modalFuntion: SubmitHandler<ForModalUser> = (data) => {
    /**
     * Aqui se debe de implementar el create, update & delete para poder 
     * renderizar los elementos de las card y tener la comunicacion entre padre he hijo
     */
    if (userSelected) {
      console.log("update");
      // console.log(userSelected.estado);
      // console.log(data.State);
    } else {
      console.log("create");
    }
    // console.log(userSelected + "ListUsers");
  };

  const refreshUsers = (userRefresh: User, typeAction: string) => {
    if (typeAction === "create") {
      setUsers([...users, userRefresh]);
    } else if (typeAction === "update") {
      const prevInfo = users;
      const index = prevInfo.findIndex((u) => u?.id == userRefresh?.id);
      
      if (index >= 0) {
        prevInfo[index] = userRefresh;
      }
      setUsers(prevInfo);
    } else if (typeAction === "delete") {
      setUsers(users.filter((u) => u?.id != userRefresh?.id));
    }
    
  }

  const triggerModal = () => {
    setModal(true);
  };

  const getUserForPageable = async () => {
    const data: any = await service.getAllForPageable(page);
    return data?.content;
  };

  const getUserForFilter = async (page: number, filter: UserFilter) => {
    const data: any = await service.getForSearch(page, filter);
    return data.content;
  };

  const getDownloadFile = async (filter: UserFilter) => {
    const data: any = await service.getDownloadFile(filter);
    return data.content;
  };

  useEffect(() => {
    configInitial();
  }, []);

  const configInitial = async () => {
    // Carga inicial

    const usersInfo: any = await getUserForPageable();

    setPage(1);
    setUsers(usersInfo);
    setmodalStudents(true);
  };

  const handleSelectUser = (selected: any) => {
    setSelectUser(selected.id);
    setUserSelected(selected);
    triggerModal();
  };

  const handleCreateUser = () => {
    setUserSelected(undefined);
    triggerModal();
  };

  const handleDownloadDocument = () => {
    try {
      sweetAlert({
        title: "The document has been successfully created",
        text: "",
        icon: "success",
      });
      getDownloadFile({
        [field]: search,
        estado: state,
      });
    } catch (error) {
      sweetAlert({
        title: "Document has not been created correctly",
        text: "",
        icon: "warning",
      });
    }
  };

  const handleSearching = async () => {
    setFinished(false);
    setPage(1);

    
    const payload: UserFilter = {
      [field]: search,
      estado: state,
    };
    console.log(payload);

    const usersInfo = await getUserForFilter(0, payload);

    setUsers(usersInfo);
  };

  const handleChangePage = async () => {
    let usersInfo = [];
    if (search) {
      usersInfo = await getUserForFilter(page, {
        [field]: search,
        estado: state,
      });
    } else if (state) {
      usersInfo = await getUserForFilter(page, {
        estado: state,
      });
    } else {
      usersInfo = await getUserForPageable();
    }

    setUsers([...users, ...usersInfo]);
    setPage(page + 1);

    if (usersInfo?.length < pageSize) {
      setFinished(true);
    }
  };

  return (
    <>
      <div style={{ width: "100vw",height: "105vh", position: "relative", zIndex: "2" }}>
        <div className="nav-bar">
          <div className="grid-container">
            <h1 className="home">Pacific College</h1>
            <h2 className="new-user efecto-hover" onClick={handleCreateUser}>
              <img className="add-user " src={plusSign} alt="add" /> New User
            </h2>
            <h2
              className="download-file efecto-hover"
              onClick={handleDownloadDocument}
            >
              <img src={downloadFile} alt="" /> Sheet Excel
            </h2>
            <h2
              className="close-session efecto-hover"
              onClick={() => {
                localStorage.removeItem("user_token");
                navigate("/login");
              }}
            >
              <img src={closeSession} alt="close session" /> Log out
            </h2>
          </div>
        </div>
        <Search
          field={{ value: field, onChange: setField }}
          search={{ value: search, onChange: setSearch }}
          state={{ value: state, onChange: setState }}
          handleOnSearch={handleSearching}
        />
        <InfiniteScroll
          dataLength={users.length}
          hasMore={!finished}
          next={handleChangePage}
          loader={""}
        >
          <div className="margin-card">
            {users?.map((card, num) => {
              return (
                <CardUser
                  clickHandler={(selected) => handleSelectUser(selected)}
                  key={num}
                  data={card}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>

      {modal && (
        <ModalUser
          showModal={modal}
          closeModal={setModal}
          handleOnSubmit={modalFuntion}
          register={userSelected}
          idUserSelect={selectUser}
          refreshInfo={refreshUsers}
        />
      )}

      {modalStudents && (
        <ModalLateStudents
          showModal={modalStudents}
          closeModal={setmodalStudents}
        />
      )}
    </>
  );
};

export default ListUsers;
