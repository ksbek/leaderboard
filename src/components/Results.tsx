import React, { useState, useEffect } from 'react'
import Table from './Table'
import ReactPaginate from 'react-paginate'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchResults } from '../store/resultsSlice'
import { secondsToDhms } from '../_utils/index'

interface FilterProps {
    recordingType?: string
    gender?: string
    ethnicity?: string
    maxAmount?: number
    minAmount?: number
    minAge?: number
    maxAge?: number
    page?: number
    perPage?: number
}

interface ResultsProps {
    filter: FilterProps
    userId?: string
}

const SORT_COLUMN_MAP: Record<number, string> = {
    1: 'total_durations',
    2: 'total_amount',
    3: 'counts.normal',
    4: 'durations.normal',
    5: 'counts.sleep',
    6: 'durations.sleep',
    7: 'counts.rest',
    8: 'durations.rest',
    9: 'counts.posture',
    10: 'durations.posture',
    11: 'counts.exercise',
    12: 'durations.exercise'
}

const Results: React.FC<ResultsProps> = ({ filter, userId }) => {
    const {
        recordingType,
        gender,
        ethnicity,
        maxAmount,
        minAmount,
        minAge,
        maxAge
    } = filter

    const dispatch = useAppDispatch()

    const { isDataLoading, data } = useAppSelector((s) => ({
        isDataLoading: s.results.isDataLoading,
        data: s.results.data
    }))

    const [currentPage, setCurrentPage] = useState(0)
    const [postsPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState<number>(2)
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>(
        'descending'
    )

    useEffect(() => {
        dispatch(
            fetchResults({
                recording_type: recordingType || '',
                gender: gender || '',
                ethnicity: ethnicity || '',
                max_amount: maxAmount ?? 100000000,
                min_amount: minAmount ?? 0,
                min_age: minAge ?? 0,
                max_age: maxAge ?? 200,
                page: currentPage,
                per_page: postsPerPage,
                sort_by: SORT_COLUMN_MAP[sortColumn] || 'total_amount',
                sort_direction: sortDirection
            })
        )
    }, [
        currentPage,
        postsPerPage,
        recordingType,
        gender,
        ethnicity,
        maxAmount,
        minAmount,
        minAge,
        maxAge,
        sortColumn,
        sortDirection,
        dispatch
    ])

    const paginate = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    }

    const handleSort = (columnIndex: number) => {
        if (sortColumn === columnIndex) {
            setSortDirection(
                sortDirection === 'ascending' ? 'descending' : 'ascending'
            )
        } else {
            setSortColumn(columnIndex)
            setSortDirection('ascending')
        }
    }

    const rowsData = data?.rows || []
    const totalCount = data?.totalCount || 0
    const pageCount = Math.ceil(totalCount / postsPerPage)

    const rows: React.ReactNode[][] = rowsData.map((e: any, i: number) => {
        const isCurrentUser =
            userId &&
            (e.id === userId)

        const textClass = isCurrentUser
            ? 'text-reflex-teal font-medium'
            : 'text-white'

        return [
            <div key={`user-${i}`} className={`text-sm ${textClass}`}>
                {isCurrentUser && '👤 '}
                {e.id}
            </div>,
            <div
                key={`dur-${i}`}
                className={textClass}
                dangerouslySetInnerHTML={{
                    __html: secondsToDhms(e.recording_data?.total_durations)
                }}
            ></div>,
            <div key={`amt-${i}`} className={textClass}>
                {e.recording_data?.total_amount}
            </div>,
            <div key={`n-a-${i}`} className={textClass}>
                {e.recording_data?.counts?.normal ?? 0}
            </div>,
            <div key={`n-d-${i}`} className={textClass}>
                {e.recording_data?.durations?.normal ?? 0}
            </div>,
            <div key={`s-a-${i}`} className={textClass}>
                {e.recording_data?.counts?.sleep ?? 0}
            </div>,
            <div key={`s-d-${i}`} className={textClass}>
                {e.recording_data?.durations?.sleep ?? 0}
            </div>,
            <div key={`r-a-${i}`} className={textClass}>
                {e.recording_data?.counts?.rest ?? 0}
            </div>,
            <div key={`r-d-${i}`} className={textClass}>
                {e.recording_data?.durations?.rest ?? 0}
            </div>,
            <div key={`p-a-${i}`} className={textClass}>
                {e.recording_data?.counts?.posture ?? 0}
            </div>,
            <div key={`p-d-${i}`} className={textClass}>
                {e.recording_data?.durations?.posture ?? 0}
            </div>,
            <div key={`e-a-${i}`} className={textClass}>
                {e.recording_data?.counts?.exercise ?? 0}
            </div>,
            <div key={`e-d-${i}`} className={textClass}>
                {e.recording_data?.durations?.exercise ?? 0}
            </div>
        ]
    })

    return (
        <div className="mt-10 rounded-lg border border-reflex-border-light bg-reflex-dark-card p-1 relative">
            {/* Overlay loading message */}
            {isDataLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 text-white text-lg font-medium">
                    Loading...
                </div>
            )}

            <Table
                header={[
                    'User',
                    'Total Recording Length',
                    'Total Uploads',
                    'Normal Count',
                    'Normal Duration',
                    'Sleep Count',
                    'Sleep Duration',
                    'Rest Count',
                    'Rest Duration',
                    'Posture Count',
                    'Posture Duration',
                    'Breathing Count',
                    'Breathing Duration'
                ]}
                rows={rows}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
            />

            {rows.length === 0 && !isDataLoading && (
                <div className="p-5 text-sm font-medium text-white">No List.</div>
            )}

            <ReactPaginate
                onPageChange={paginate}
                forcePage={currentPage}
                pageCount={pageCount}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                previousClassName="w-1/2 ml-3"
                nextClassName="w-1/2 text-right mr-3"
                containerClassName={'flex items-center justify-center py-2.5 '}
                pageClassName={'w-12'}
                pageLinkClassName="text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-700"
                previousLinkClassName={
                    'border border-reflex-border-light text-sm px-4 py-2 rounded-md text-white hover:bg-gray-700'
                }
                nextLinkClassName={
                    'border border-reflex-border-light text-sm px-4 py-2 rounded-md text-white hover:bg-gray-700'
                }
                activeLinkClassName={'bg-reflex-teal text-reflex-button-text font-medium'}
                disabledClassName={'opacity-50 cursor-not-allowed'}
                breakLabel={'...'}
                breakClassName={'px-3 py-1.5 text-white'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
            />
        </div>
    )
}

export default Results
