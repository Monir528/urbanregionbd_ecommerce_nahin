/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination
} from "react-table";
import { Filter, DefaultColumnFilter } from "./filters";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,

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
          {headerGroups.map((headerGroup) => (
            
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {/* // find data from here  */}
                  {/* {
                    console.log(column)
                  } */}
                  
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* //table body removed  and placed in important text*/}
      </table>

      <div
        className="row"
        style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
      >
      </div>
    </Fragment>
  );
};

export default TableContainer;



