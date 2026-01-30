import type { Metadata } from 'next'

// Dynamic metadata using generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    
    // In a real app, you would fetch user data here
    // const user = await fetchUser(id)
    
    return {
        title: `User #${id} - Dashboard`,
        description: `View details and information for user #${id} in the dashboard.`,
        openGraph: {
            title: `User #${id} - Dashboard`,
            description: `View details and information for user #${id} in the dashboard.`,
            type: 'profile',
        },
    }
}

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    return (
        <div>
            <h1>Showing details for user #{id}</h1>
        </div>
    )
}

export default UserDetails