const conf={
    appwriteProjectUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwritePostsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    appwriteFriendsCollectionId: String(import.meta.env.VITE_APPWRITE_FRIENDS_COLLECTION_ID),
    appwriteMessageCollectionId: String(import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID),
}
export default conf;