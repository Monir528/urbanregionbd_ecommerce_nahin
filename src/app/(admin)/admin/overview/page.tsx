'use client';

import {useGetAllOrderedQuery} from "@/components/api/confirmOrder/confirmOrder";
import {useMemo} from "react";
import {dateBetweenFilterFn, DateRangeColumnFilter} from "@/components/filters";
import TableContainer from "@/components/TableContainer";

const Overview = () => {

    const { data, isLoading } = useGetAllOrderedQuery();
    const columns = useMemo(
        () => [
            {
                Header: "Date",
                accessor: "date",
                Filter: DateRangeColumnFilter,
                filter: dateBetweenFilterFn,
            },
        ],
        []
    );

    return (
        <main>
            <div className="font-abc">
                {!isLoading && data && <TableContainer columns={columns} data={data} />}
            </div>
        </main>

    );
};

export default Overview;
