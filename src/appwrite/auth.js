import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService{

    client = new Client();
    account;

    AuthService(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(client); 
    }

    async CreateAccount({email,password,name}){  //aync wait until account will done

        try {
            
            const userAcc= await this.account.create(ID.unique(), email, password,name);

            //Check wheter acccount is created or not yes then login

            if (userAcc) {  //login    
                this.login({email,password});
            }else{
                return userAcc;
            }

        } catch (error) {   // may occur excetion
            throw error;
        }
    }

    async login({email,password}){

        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){   // islogin

        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null; // if user not found
    }

    async logout(){

        try {
            return await this.account.deleteSessions();  //Delete all sessions from the user account 
        } catch (error) {
            throw error;
        }
    }

}

const authService= new AuthService();

export default authService