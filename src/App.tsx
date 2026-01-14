import { useState, useEffect } from 'react'
import Results from './components/Results'

function App() {
    const [userId, setUserId] = useState<string>('')
    const [filter] = useState({
        recordingType: '',
        gender: '',
        ethnicity: '',
        maxAmount: 100000000,
        minAmount: 0,
        minAge: 0,
        maxAge: 200,
        page: 0,
        perPage: 10
    })

    useEffect(() => {
        // Get user_id from URL query params
        const params = new URLSearchParams(window.location.search)
        const user = params.get('user_id')
        if (user) {
            setUserId(user)
        }
    }, [])

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold text-white">🏆 Leaderboard</h1>
                    <p className="text-gray-400">Rankings based on user recording activity</p>
                    {userId && (
                        <p className="mt-2 text-sm text-reflex-teal">
                            Viewing as: {userId}
                        </p>
                    )}
                </div>
                <Results filter={filter} userId={userId} />
            </div>
        </div>
    )
}

export default App

