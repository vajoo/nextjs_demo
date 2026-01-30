import books from '@/app/api/db'

export async function GET(request: Request) {
    return Response.json(books)
}

export async function POST(request: Request) {
    const { name } = await request.json()
    const newBook = { id: books.length + 1, name }
    books.push(newBook)
    return Response.json(newBook)
}
