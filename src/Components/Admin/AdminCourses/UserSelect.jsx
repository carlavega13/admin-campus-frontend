import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import s from "../../../css/UserSelect.module.css";

const UserSelect = ({ info, setInfo }) => {
  const users = useSelector((state) => state.allUsers);
  const [user, setUSer] = useState("");
  const [active, setActive] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {}, [users]);
  const handleClick = (e, name,username) => {
    setUSer(name);
    setInfo({
      ...info,
      userid: Number(e.target.id),
      userfullname: name,
      username:username

    });
    setActive(false);
  };
  const handlerChange = (e) => {
    setUSer(e.target.value);
    if (e.target.value.length > 1) {
      setFilteredUsers(
        users?.filter((u) =>
          u.fullname.includes(
            `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
          )
        )
      );
    } else {
      setFilteredUsers(
        users?.filter((u) => u.fullname.includes(e.target.value))
      );
    }
    if (user === e.target.value) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (user.length === 0) {
      setFilteredUsers(users);
    }
  }, [user, users]);
  return (
    <div>
      <div className={s.divInputIcons}>
        <input onChange={handlerChange} value={user} type="text" />
        <div>
          {user.length > 0 && (
            <RiDeleteBin2Line onClick={() => setUSer("")}   className={s.icons} />
            )}
          <IoIosArrowDown
            onClick={() => setActive(!active)}
            className={s.icons}
            />
        </div>
      </div>

      {active && (
        <div className={s.containerUserNames}>
          {filteredUsers.length === 0 && 
          <div className={s.noUsersFound}>No hay usuarios encontrados</div>
          }
          {filteredUsers?.map((user, i) => {
            return (
              <div
                onClick={(e) => handleClick(e, user.fullname,user.username)}
                id={user.id}
                style={{ background: i % 2 === 0 ? "#EAEAEA" : "#D9D9D9" }}
                className={s.divUserName}
              >
                {user.fullname}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default UserSelect;