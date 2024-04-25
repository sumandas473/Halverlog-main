import { Client, Account,ID } from "appwrite";
import service from './config.js';
import conf from '../conf/conf.js'

export class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteProjectUrl).setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,username,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,username);
            if(userAccount){
                const newUser=await service.saveUserToDB({
                    accountId: userAccount.$id,
                    name: name,
                    email: userAccount.email,
                    username:userAccount.name,
                  }); 
                return newUser;
            }
        }catch(error){
            console.log("Appwrite service :: createAccount() ::",error)
        }
    }

    async login({email,password}){
        try {
            const user= await this.account.createEmailSession(email,password);
            if(user){
                return user;
            }
        } catch (error) {
            console.log("Appwrite service :: loginAccount() ::",error);
        }
    }

    async getCurrentUser(){
        try{
            const currentAccount= await this.account.get();
            if(currentAccount){
                const currentUser=await service.getUserData({accountId:currentAccount.$id});
                return currentUser;
            }
        }catch(error){
            console.log("Appwrite service :: getCurrentUser() ::",error);
            return null;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout() ::",error);
        }
    }

}

const authService=new AuthService()
export default authService;