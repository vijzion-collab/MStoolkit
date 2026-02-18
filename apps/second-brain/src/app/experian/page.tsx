export default function ExperianPage() {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* PDF Viewer Section */}
            <div className="w-1/2 h-full border-r border-gray-700">
                <iframe
                    src="/experian.pdf"
                    className="w-full h-full"
                    title="Experian Credit Report"
                />
            </div>

            {/* Form Section */}
            <div className="w-1/2 h-full overflow-y-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-emerald-400">Credit Report Data</h1>
                <p className="mb-6 text-gray-400">
                    The PDF appears to be image-based. Please view the report on the left and enter key details below.
                </p>

                <form className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Personal Info</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input type="text" className="w-full bg-gray-900 border border-gray-600 rounded p-2 focus:border-emerald-500 outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Report Date</label>
                                <input type="date" className="w-full bg-gray-900 border border-gray-600 rounded p-2 focus:border-emerald-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Credit Score</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">FICO Score</label>
                            <input type="number" className="w-full bg-gray-900 border border-gray-600 rounded p-2 focus:border-emerald-500 outline-none text-2xl font-mono text-emerald-400" placeholder="750" />
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-pink-400">Account Summary</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Total Accounts</label>
                                <input type="number" className="w-full bg-gray-900 border border-gray-600 rounded p-2 focus:border-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Total Debt</label>
                                <input type="text" className="w-full bg-gray-900 border border-gray-600 rounded p-2 focus:border-emerald-500 outline-none" placeholder="$0.00" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-colors">
                            Save Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
