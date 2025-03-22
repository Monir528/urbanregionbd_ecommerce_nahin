import React from "react";
import { Row } from "react-table";
import OverviewComponent from "./OverviewComponent";
import { Order } from "@/types/order";

interface FilterProps {
    column: {
        filteredRows: Row<Order>[];
        canFilter?: boolean;
        render: (type: string) => React.ReactNode;
    };
}

interface ColumnFilterProps {
    column: {
        filterValue: string | undefined;
        setFilter: (value: string | undefined) => void;
        preFilteredRows: Row<Order>[];
        id?: string;
    };
}

interface DateRangeColumnFilterProps {
    column: {
        filterValue?: [string | undefined, string | undefined];
        preFilteredRows: Row<Order>[];
        setFilter: (value: [string | undefined, string | undefined]) => void;
        id: string;
    };
}

export const Filter: React.FC<FilterProps> = ({ column }) => {
    const received: Order[] = [];
    const pending: Order[] = [];
    const failed: Order[] = [];
    const delivered: Order[] = [];
    const arr = column.filteredRows;

    arr.forEach((row) => {
        const status = row.original?.status;
        if (status === "received") {
            received.push(row.original);
        } else if (status === "delivered") {
            delivered.push(row.original);
        } else if (status === "pending") {
            pending.push(row.original);
        } else {
            failed.push(row.original);
        }
    });

    return (
        <div style={{ marginTop: 5 }}>
            {column.canFilter && column.render("Filter")}
            <OverviewComponent
                received={received}
                pending={pending}
                failed={failed}
                delivered={delivered}
            />
        </div>
    );
};

export const DefaultColumnFilter: React.FC<ColumnFilterProps> = ({
    column: { filterValue, setFilter, preFilteredRows }
}) => {
    return (
        <input
            value={filterValue ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`buscar (${preFilteredRows.length}) ...`}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    );
};

export const SelectColumnFilter: React.FC<ColumnFilterProps> = ({
    column: { filterValue, setFilter, preFilteredRows, id }
}) => {
    const options = React.useMemo(() => {
        const optionsSet = new Set<string>();
        preFilteredRows.forEach((row) => {
            if (id && row.values[id]) {
                optionsSet.add(String(row.values[id]));
            }
        });
        return [...optionsSet.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            id="custom-select"
            value={filterValue ?? ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFilter(e.target.value || undefined);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">Todos</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export function dateBetweenFilterFn(
    rows: Row<Order>[],
    id: string,
    filterValues: [string | undefined, string | undefined]
): Row<Order>[] {
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

    if (!ed && !sd) return rows;

    return rows.filter((r) => {
        const cellValue = r.values[id];
        if (!cellValue) return true;

        const dateAndHour = cellValue.split(" ");
        if (dateAndHour.length !== 2) return true;

        const [year, month, day] = dateAndHour[0].split("-");
        if (!year || !month || !day) return true;

        const date = [month, day, year].join("/");
        const hour = dateAndHour[1];
        const formattedData = `${date} ${hour}`;
        const cellDate = new Date(formattedData);

        if (ed && sd) {
            return cellDate >= sd && cellDate <= ed;
        }
        if (sd) {
            return cellDate >= sd;
        }
        if (ed) {
            return cellDate <= ed;
        }
        return true;
    });
}

export const DateRangeColumnFilter: React.FC<DateRangeColumnFilterProps> = ({
    column: { filterValue = [undefined, undefined], preFilteredRows, setFilter, id }
}) => {
    const [min, max] = React.useMemo(() => {
        if (!preFilteredRows.length) {
            return [new Date(0), new Date(0)];
        }

        let minDate = new Date(preFilteredRows[0].values[id]);
        let maxDate = new Date(preFilteredRows[0].values[id]);

        preFilteredRows.forEach((row) => {
            const value = row.values[id];
            if (!value) return;

            const rowDate = new Date(value);
            if (rowDate <= minDate) minDate = rowDate;
            if (rowDate >= maxDate) maxDate = rowDate;
        });

        return [minDate, maxDate];
    }, [id, preFilteredRows]);

    console.log(min, ' ', max, filterValue);

    return (
        <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col">
                <label htmlFor="start-date" className="text-sm font-medium text-gray-600 mb-1">
                    Start Date
                </label>
                <input
                    id="start-date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        setFilter([val || undefined, filterValue[1]]);
                    }}
                    type="date"
                    value={filterValue[0] ?? ""}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="end-date" className="text-sm font-medium text-gray-600 mb-1">
                    End Date
                </label>
                <input
                    id="end-date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        setFilter([
                            filterValue[0],
                            val ? val.concat("T23:59:59.999Z") : undefined,
                        ]);
                    }}
                    type="date"
                    value={filterValue[1]?.slice(0, 10) ?? ""}
                />
            </div>
        </div>
    );
};
