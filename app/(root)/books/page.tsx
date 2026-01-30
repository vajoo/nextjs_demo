const Books = async () => {
  const response = await fetch('http://localhost:3000/api/books');
  const books = await response.json()
  return (
    <div>
        <h1 className="text-2xl font-bold">Books</h1>
        <code>
            {JSON.stringify(books, null, 2)}
        </code>
    </div>
  )
}

export default Books