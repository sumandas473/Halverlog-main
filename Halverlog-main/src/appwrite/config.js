import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID, Avatars } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  avatars;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteProjectUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.avatars = new Avatars(this.client);
  }
  async saveUserToDB({ accountId, name, email, username }) {
    const imageUrl = this.avatars.getInitials(name);
    try {
      const newUser = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        ID.unique(),
        { accountId, name, email, username, imageUrl }
      );
      return newUser;
    } catch (error) {
      console.log("Service : saveUserToDB :: ", error);
    }
  }

  async getUserData({ accountId }) {
    // console.log("accountId",accountId);
    try {
      const currentUserData = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [Query.equal("accountId", accountId)]
      );
      return currentUserData.documents[0];
    } catch (error) {
      console.log("service : getUserData :: ", error);
    }
  }

  async deleteFileFromBucket({ fileId }) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("service : deleteFileFromBucket() :: ", error);
    }
  }

  async addProfileImg({ profileImg, documentId }) {
    console.log("add profile Image called");
    try {
      const profileimgId = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        profileImg
      );
      if (profileimgId) {
        const fileUrl = this.getFilePreview(profileimgId.$id);
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          documentId,
          { imageUrl: fileUrl, imageId: profileimgId.$id }
        );
      }
    } catch (error) {
      console.log("service : addProfileImg :: ", error);
    }
  }

  async updateProfileImg({ profileImg, previmgId, documentId }) {
    console.log("update profile image call");
    try {
      const process = await this.addProfileImg({
        profileImg: profileImg,
        documentId: documentId,
      });
      if (process) {
        return await this.deleteFileFromBucket({ fileId: previmgId });
      }
    } catch (error) {
      console.log("service : updateProfileImg :: ", error);
    }
  }

  async addCoverImg({ coverImg, documentId }) {
    console.log("add cover Image called");
    try {
      const coverimgId = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        coverImg
      );
      if (coverimgId) {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          documentId,
          { coverImageId: coverimgId.$id }
        );
      }
    } catch (error) {
      console.log("service : addCoverImg :: ", error);
    }
  }

  async updateCoverImg({ coverImg, previmgId, documentId }) {
    console.log("update cover image call");
    try {
      const process = await this.addCoverImg({
        coverImg: coverImg,
        documentId: documentId,
      });
      if (process) {
        return await this.deleteFileFromBucket({ fileId: previmgId });
      }
    } catch (error) {
      console.log("service : updateCoverImg :: ", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }

  async createPost(data) {
    try {
      const file = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        data.image
      );
      if (file) {
        const imageUrl = this.getFilePreview(file.$id);
        const post = await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwritePostsCollectionId,
          ID.unique(),
          {
            creator: data.creator,
            caption: data.caption,
            imageId: file.$id,
            status: data.status,
            imageUrl: imageUrl,
          }
        );
        return post;
      }
    } catch (error) {
      console.log("service : createPost :: ", error);
    }
  }

  async fetchPublicPost() {
    try {
      const fetch = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [Query.orderDesc("$createdAt"), Query.equal("status", ["public"])]
      );
      return fetch.documents;
    } catch (error) {
      console.log("service : fetchPublicPost :: ", error);
    }
  }
  async fetchPost() {
    try {
      const fetch = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [Query.orderDesc("$createdAt")]
      );
      return fetch.documents;
    } catch (error) {
      console.log("service : fetchPost :: ", error);
    }
  }

  async fetchProfilePost(userId) {
    try {
      const fetch = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [Query.orderDesc("$createdAt"), Query.equal("creator", [userId])]
      );
      return fetch.documents;
    } catch (error) {
      console.log("service : fetchProfilePost :: ", error);
    }
  }

  async deletePost(post) {
    try {
      const response = this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        post.$id
      );
      if (response) {
        return await this.deleteFileFromBucket({ fileId: post.imageId });
      }
    } catch (error) {
      console.log("service : deletePost() :: ", error);
    }
  }

  async updateLike(postId, newLikes) {
    // console.log("updating Like...")
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        { likes: newLikes }
      );
    } catch (error) {
      console.log("service : updateLike() :: ", error);
    }
  }

  async getUsers() {
    // console.log("accountId",accountId);
    try {
      const currentUserData = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId
      );
      return currentUserData.documents;
    } catch (error) {
      console.log("service : getUsers() :: ", error);
    }
  }

  async addFriend({ userId, friendId }) {
    // console.log("called");
    // console.log("userId: ", userId);
    // console.log("friend: ", friendId);
    try {
      const adding = await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteFriendsCollectionId,ID.unique(),{user: userId, friendId: friendId})
      // console.log(adding);
      return adding;
    } catch (error) {
      console.log("service : addingFriend() :: ", error);
    }
  }
  async addMessage(payload) {
    console.log("called");
    try {
      const adding = await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteMessageCollectionId,ID.unique(),payload)
      // console.log(adding);
      return adding;
    } catch (error) {
      console.log("service : addingMessage() :: ", error);
    }
  }
  async getMessage(identification1,identification2){
    try{
      const response=await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteMessageCollectionId,
        [Query.orderDesc("$createdAt"), Query.equal("user_receiver_id",[identification1,identification2])]);
        return response;
    }catch(error){
      console.log("service : getMessage() :: ", error);
    }
  }
}

const service = new Service();
export default service;
