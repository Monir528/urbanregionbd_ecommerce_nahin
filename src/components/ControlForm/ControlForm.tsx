import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/components/api/cartHandler";
import {
    useAddUserMutation,
    useGetUsersQuery,
} from "@/components/api/userApi";
import Modal from "@/components/Modal/Modal";
import {RootState} from "@/reduxToolKit/store";
import {SysUser} from "@/types/user";

const ControlForm = () => {
    const [role, setRole] = useState("moderator");
    const { data: findUser } = useGetUsersQuery(undefined);
    const [addUser, { isSuccess }] = useAddUserMutation();

    const [search, setSearch] = useState("");
    const [result, setResult] = useState();

    const dispatch = useDispatch();
    const { modalCondition } = useSelector((state: RootState) => state.cartHandler) || {};
    // Debounce function to optimize search input
    const debounceHandler = (fn: (...args: never[]) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: never[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const doSearch = (value:string) => {
        setSearch(value);
    };

    const handleSearch = debounceHandler(doSearch, 500);

    useEffect(() => {
        setResult(findUser?.find((e: SysUser) => e.email === search));
    }, [search, findUser]);

    useEffect(() => {
        if (isSuccess) {
            setSearch("");
            dispatch(modalOpen());
        }
    }, [isSuccess, dispatch, role]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        addUser({ email: search, role });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            {modalCondition && <Modal />}

            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="control-email" className="block text-sm font-medium text-gray-700">
                    Enter Email
                </label>
                <input
                    type="text"
                    id="control-email"
                    name="control-email"
                    placeholder="Enter a valid email address"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value as never)}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">This email must belong to an existing user.</p>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
                <label htmlFor="controller" className="block text-sm font-medium text-gray-700">
                    Select Role
                </label>
                <select
                    name="category"
                    required
                    id="controller"
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Choose the role for the selected user.</p>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    disabled={!result}
                    className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-all duration-300 ${
                        result ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ControlForm;
