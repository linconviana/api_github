import axios from "axios";
import { useState } from "react";
import Modal from "../../components/Modal";
import "./styles.css";

type GitHubUser = {
  user: string;
};

type UserData = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
};

const Home = () => {
  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(true);
    alert("show modal");
  }

  const [userData, setUserData] = useState<UserData>();

  const [userGit, setUserGit] = useState<GitHubUser>({
    user: "",
  });

  const handleChange = (event: any) => {
    const user = event.target.name;
    const value = event.target.value;

    setUserGit({ ...userGit, [user]: value });
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    let user = userGit.user.trim();

    debugger;
    const url = `https://api.github.com/users/${user}`;

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) setUserData(response.data);
        else alert("Usuário não encontrado");
      })
      .catch((error) => {
        alert("Usuário não encontrado");
      });
  };

  return (
    <>
      <div className="row">
        <h1>Bem vindo a Home</h1>

        <br />
        <div className="col-md-4 mt-4">
          <button type="button" onClick={showModal}>show Modal</button>
        </div>
        <br />

        <form onSubmit={handleFormSubmit}>
          <div>
            <div className="col-md-4 mt-4">
              <input
                type="text"
                name="user"
                value={userGit.user}
                onChange={handleChange}
                className="form-control"
                placeholder="Digite o nome do usuario git"
              ></input>
            </div>
            <div className="col-md-4 mt-2">
              <button type="submit" className="btn btn-primary ">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
      {userData && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5">
              <img src={userData.avatar_url} alt={userData.login} />
            </div>
            <div className="col-md-7">
              <div className="row">
                <label>
                  <h3>Login:</h3>
                </label>
                <label>{userData.login}</label>
              </div>
              <div className="row">
                <label>
                  <h3>url:</h3>
                </label>
                <label>{userData.html_url}</label>
              </div>
              <div className="row">
                <label>
                  <h3>name:</h3>
                </label>
                <label>{userData.name}</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
