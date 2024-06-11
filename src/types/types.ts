export interface BlogType {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    user: UserType;
    createdAt: string;
}

export interface UserType {
    id: number;
    name: string;
    profilePicture: string;
}
