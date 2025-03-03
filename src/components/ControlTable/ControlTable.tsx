/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ControlTable.scss";
import { useDeleteUserMutation, useEditUserMutation, useGetSingleUserQuery, useGetUsersQuery } from "@/components/api/userApi";
import { ImBin } from "react-icons/im";
import Modal from "@/components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/components/api/cartHandler";

const ControlTable = () => {
  const { data: findUser, isLoading: findLoading } = useGetUsersQuery();
  const [editUser, {isLoading, isError, isSuccess}]= useEditUserMutation()
  const [deleteUser, {isLoading:deleteLoading, isError:deleteError, isSuccess:deleteSuccess}]= useDeleteUserMutation()
  const {modalCondition}= useSelector(state=>state.cartHandler) || {}
  const dispatch= useDispatch()


  useEffect(()=>{
    if(deleteSuccess){
      dispatch(modalOpen())
    }
  },[deleteSuccess, dispatch])

  const handleDelete = (id) => {
    deleteUser(id)
  };
  const handleEdit=(_id)=>{
    editUser({_id})
  }

  const [controlUser, setControlUser] = useState([]);

  // Find user with role property
  useEffect(() => {
    if (findUser?.length > 0) {
      setControlUser(findUser.filter((user) => user?.role));
    }
  }, [findUser]);

  return (
    <div className="ControlTable text-base">
      {
        modalCondition && <Modal/>
      }
      {findLoading && "Loading"}
      {!findLoading && findUser && controlUser?.length === 0 && (
        <h3>No user found</h3>
      )}
      {!findLoading && findUser && controlUser?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {controlUser.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className=""
                    onClick={() => handleDelete(user._id)}
                  >
                    <ImBin />{" "}
                  </span>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ControlTable;
