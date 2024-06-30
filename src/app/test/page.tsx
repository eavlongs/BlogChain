import { getUsers } from "@/repositories/users";

export default async function Test() {
    const users = await getUsers();

    return (
        <div>
            <h1>Test</h1>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <img src={user.profilePicture || ""} />
                    </div>
                );
            })}
        </div>
    );
}

export const dynamic = "force-dynamic";
