import React, { useEffect, useState } from "react";
import { useDeleteUserMutation, useEditUserMutation, useGetUsersQuery } from "@/components/api/userApi";
import { ImBin } from "react-icons/im";
import Modal from "@/components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/components/api/cartHandler";

const ControlTable = () => {
  const { data: findUser, isLoading: findLoading } = useGetUsersQuery();
  const [editUser] = useEditUserMutation();
  const [deleteUser, { isSuccess: deleteSuccess }] = useDeleteUserMutation();
  const { modalCondition } = useSelector((state) => state.cartHandler) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(modalOpen());
    }
  }, [deleteSuccess, dispatch]);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleEdit = (_id) => {
    editUser({ _id });
  };

  const [controlUser, setControlUser] = useState([]);

  useEffect(() => {
    if (findUser?.length > 0) {
      setControlUser(findUser.filter((user) => user?.role));
    }
  }, [findUser]);

  return (
      <div className="p-4 bg-white shadow-md rounded-md">
        {modalCondition && <Modal />}
        {findLoading && <p className="text-center text-gray-600">Loading...</p>}
        {!findLoading && findUser && controlUser.length === 0 && (
            <h3 className="text-center text-gray-600">No user found</h3>
        )}
        {!findLoading && findUser && controlUser.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-md">
                <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 border border-gray-300 text-left">Name</th>
                  <th className="p-3 border border-gray-300 text-left">Email</th>
                  <th className="p-3 border border-gray-300 text-left">Role</th>
                  <th className="p-3 border border-gray-300 text-left">Action</th>
                </tr>
                </thead>
                <tbody>
                {controlUser.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="p-3 border border-gray-300">{user.name}</td>
                      <td className="p-3 border border-gray-300">{user.email}</td>
                      <td className="p-3 border border-gray-300">{user.role}</td>
                      <td className="p-3 border border-gray-300">
                    <span
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(user._id)}
                    >
                      <ImBin />
                    </span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default ControlTable;
