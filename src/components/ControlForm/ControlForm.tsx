import  { useEffect } from "react";
import { useState } from "react";
import Button from "@/components/Button/Button";
import "./ControlForm.scss";

import {
  useAddUserMutation,
  useGetUsersQuery,
} from "@/components/api/userApi";
import Modal from "@/components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/components/api/cartHandler";

const ControlForm = () => {
  const [role, setRole] = useState("moderator");
  const { data:findUser } = useGetUsersQuery();
  const [addUser, { isSuccess}]= useAddUserMutation()

  const [search, setSearch] = useState("");
  const [result, setResult] = useState();

  const dispatch= useDispatch()

  const {modalCondition}= useSelector(state=>state.cartCondition) || {}

  // debounce handler start
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    setSearch(value);
  };
  const handleSearch = debounceHandler(doSearch, 500);
  // debounce handler end

  // check either it exist or not
  useEffect(() => {
    setResult(findUser?.find((e) => e.email === search));
  }, [search, findUser]);

  console.log(search);

  useEffect(()=>{
    if(isSuccess){
      setSearch("")
      dispatch(modalOpen())
    }
  },[isSuccess,dispatch, role])

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ email: search, role });
  };

  return (
    <form onSubmit={handleSubmit} className="text-base ControlForm">
      {
        modalCondition && <Modal></Modal>
      }
      <label htmlFor="product-name">Enter Email</label>
      <input
        type="text"
        id="control-email"
        name="control-email"
        // value={search}
        onChange={(e) => handleSearch(e.target.value)}
        required
      />
      <label htmlFor="controller">Select Role</label>
      <select
        name="category"
        required
        id=""
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>
      <div className="submit-btn">
        <Button disabled={!result}>Submit</Button>
      </div>
    </form>
  );
};

export default ControlForm;
