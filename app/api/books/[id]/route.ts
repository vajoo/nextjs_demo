import books from '@/app/api/db'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const book = books.find((book) => book.id === parseInt(id))
    if (!book) {
        return Response.json({ error: 'Book not found' }, { status: 404 })
    }
    return Response.json(book)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { name } = await request.json()
    const book = books.find((book) => book.id === parseInt(id))
    if (!book) {
        return Response.json({ error: 'Book not found' }, { status: 404 })
    }
    book.name = name
    return Response.json(book)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const book = books.find((book) => book.id === parseInt(id))
    if (!book) {
        return Response.json({ error: 'Book not found' }, { status: 404 })
    }
    books.splice(books.indexOf(book), 1)
    return Response.json({ message: 'Book deleted' })
}