import { Fragment } from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination
} from "react-table";
import { Filter, DefaultColumnFilter } from "./filters";

const TableContainer = ({ columns, data,
                            // renderRowSubComponent
}) => {
    const {
        getTableProps,
        // getTableBodyProps,
        headerGroups,
        // page,
        // prepareRow,
        // visibleColumns,
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
    };

    return (
        <Fragment>
            <table className="table table-hover w-full" {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => {
                    // Destructure key from headerGroup props
                    const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={headerGroupKey} {...headerGroupProps}>
                            {headerGroup.headers.map((column) => {
                                // Destructure key from column props
                                const { key: columnKey, ...columnProps } = column.getHeaderProps();
                                return (
                                    <th key={columnKey} {...columnProps}>
                                        <div {...column.getSortByToggleProps()}>
                                            {column.render("Header")}
                                            {generateSortingIndicator(column)}
                                        </div>
                                        <Filter column={column} />
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
                </thead>
                {/* Table body removed for brevity */}
            </table>

            <div
                className="row"
                style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
            >
                {/* Pagination or other controls could go here */}
            </div>
        </Fragment>
    );
};

export default TableContainer;
