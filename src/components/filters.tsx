import React from "react";
import OverviewComponent from "./OverviewComponent";

export const Filter = ({ column }) => {
    const totalEarn = 0;
    const received = [];
    const pending = [];
    const failed = [];
    const delivered = [];
    const arr = column?.filteredRows;

    for (let x = 0; x < arr?.length; x++) {
        if (arr[x]?.original?.status === "received") {
            received.push(arr[x].original);
        } else if (arr[x]?.original?.status === "delivered") {
            delivered.push(arr[x].original);
        } else if (arr[x]?.original?.status === "pending") {
            pending.push(arr[x].original);
        } else {
            failed.push(arr[x].original);
        }
        totalEarn += arr[x]?.original?.total;
    }

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

export const DefaultColumnFilter = ({
                                        column: { filterValue, setFilter, preFilteredRows: { length } }
                                    }) => {
    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`buscar (${length}) ...`}
        />
    );
};

export const SelectColumnFilter = ({
                                       column: { filterValue, setFilter, preFilteredRows, id }
                                   }) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            id="custom-select"
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
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

export function dateBetweenFilterFn(rows, id, filterValues) {
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
    if (ed || sd) {
        return rows.filter((r) => {
            const dateAndHour = r.values[id].split(" ");
            const [year, month, day] = dateAndHour[0].split("-");
            const date = [month, day, year].join("/");
            const hour = dateAndHour[1];
            const formattedData = date + " " + hour;

            const cellDate = new Date(formattedData);

            if (ed && sd) {
                return cellDate >= sd && cellDate <= ed;
            } else if (sd) {
                return cellDate >= sd;
            } else {
                return cellDate <= ed;
            }
        });
    } else {
        return rows;
    }
}

export function DateRangeColumnFilter({
                                          column: { filterValue = [], preFilteredRows, setFilter, id }
                                      }) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);
        let max = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);

        preFilteredRows.forEach((row) => {
            const rowDate = new Date(row.values[id]);
            min = rowDate <= min ? rowDate : min;
            max = rowDate >= max ? rowDate : max;
        });

        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div className="text-sm">
            <input
                className="text-sm p-1"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [val ? val : undefined, old[1]]);
                }}
                type="date"
                value={filterValue[0] || ""}
            />
            {" to "}
            <input
                className="text-sm p-1"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? val.concat("T23:59:59.999Z") : undefined
                    ]);
                }}
                type="date"
                value={filterValue[1]?.slice(0, 10) || ""}
            />
        </div>
    );
}
