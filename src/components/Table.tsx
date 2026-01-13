import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
    header: ReactNode[]
    rows: ReactNode[][]
    onClick?: (row: any) => void
    onSort?: (columnIndex: number) => void
    sortColumn?: number
    sortDirection?: 'ascending' | 'descending'
}

function Table({
    header,
    rows,
    onClick,
    onSort,
    sortColumn,
    sortDirection
}: Props) {
    const headerElement = header.map((e, i) => (
        <th
            key={i}
            className={classNames(
                'px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300',
                {
                    'cursor-pointer hover:bg-gray-700 select-none': onSort
                }
            )}
            onClick={() => {
                if (onSort && ([1, 2, 3, 5, 7, 9, 11].includes(i))) {
                    onSort(i)
                }
            }}
        >
            <div className="flex items-center gap-2">
                {e}
                {onSort && ([1, 2, 3, 5, 7, 9, 11].includes(i)) && (
                    <span className="text-gray-400">
                        {sortColumn === i ? (
                            sortDirection === 'ascending' ? '▲' : '▼'
                        ) : (
                            '⇅'
                        )}
                    </span>
                )}
            </div>
        </th>
    ))

    const rowsElement = rows.map((r, i) => (
        <tr
            key={i}
            onClick={() => onClick?.(r)}
            className={classNames(
                'border-b border-reflex-border-light',
                { 'hover:bg-gray-700 cursor-pointer': onClick }
            )}
        >
            {r.map((d, j) => (
                <td
                    key={`${i}-${j}`}
                    className="whitespace-nowrap px-5 py-4 text-left text-sm text-white"
                >
                    {d}
                </td>
            ))}
        </tr>
    ))

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-full">
                <thead className="sticky top-0 bg-gray-800">
                    {rows.length > 0 && <tr>{headerElement}</tr>}
                </thead>
                <tbody className="divide-y divide-reflex-border-light bg-reflex-dark-card">
                    {rowsElement}
                </tbody>
            </table>
        </div>
    )
}

export default Table