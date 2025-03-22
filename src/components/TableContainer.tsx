import { Fragment } from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
    Column,
    TableState,
    UseSortByColumnProps,
    Row,
    TableOptions
} from "react-table";
import { Filter, DefaultColumnFilter } from "./filters";
import { Order } from "@/types/order";

interface TableContainerProps {
    columns: Array<Column<Order>>;
    data: Order[];
}

type ExtendedColumn = Column<Order> & {
    Filter?: typeof DefaultColumnFilter;
    canFilter?: boolean;
    filteredRows?: Row<Order>[];
};

type SortableColumn = Column<Order> & UseSortByColumnProps<Order> & {
    canFilter?: boolean;
    filteredRows?: Row<Order>[];
    render: (type: string) => React.ReactNode;
};

const TableContainer: React.FC<TableContainerProps> = ({ columns, data }) => {
    const tableOptions: TableOptions<Order> = {
        columns,
        data,
        defaultColumn: {
            Filter: DefaultColumnFilter,
            canFilter: true
        } as Partial<ExtendedColumn>,
        initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableState<Order>>
    };

    const {
        getTableProps,
        headerGroups,
    } = useTable<Order>(
        tableOptions,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );

    const generateSortingIndicator = (column: SortableColumn) => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
    };

    return (
        <Fragment>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                    <thead className="bg-gray-50">
                        {headerGroups.map((headerGroup) => {
                            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={headerGroupKey} {...headerGroupProps}>
                                    {headerGroup.headers.map((column) => {
                                        const sortableColumn = column as unknown as SortableColumn;
                                        const sortByProps = sortableColumn.getSortByToggleProps?.();
                                        const { key: columnKey, ...columnProps } = column.getHeaderProps(sortByProps);
                                        
                                        return (
                                            <th
                                                key={columnKey}
                                                {...columnProps}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div className="flex flex-col">
                                                    <div className="flex items-center space-x-1">
                                                        <span>{sortableColumn.render("Header")}</span>
                                                        <span className="text-gray-400">
                                                            {generateSortingIndicator(sortableColumn)}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        {sortableColumn.canFilter && (
                                                            <Filter 
                                                                column={{
                                                                    filteredRows: sortableColumn.filteredRows || [],
                                                                    canFilter: sortableColumn.canFilter,
                                                                    render: sortableColumn.render
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    {/* Pagination controls can be added here */}
                </div>
            </div>
        </Fragment>
    );
};

export default TableContainer;
