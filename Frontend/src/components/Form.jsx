export default function Form({ url, setUrl, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 w-full max-w-md">
      <div className="flex gap-2 w-full">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the URL"
          className="w-full py-4 px-6 flex-1 focus:border-blue-500 focus:outline-none rounded-lg border border-gray-500 border-dashed"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-red-500 text-white px-5 py-4 font-medium hover:bg-red-600"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
