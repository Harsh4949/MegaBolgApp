import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService{

    client = new Client();
    account;

    constructor(){
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
            console.log("Appwite Authservice :: CreateAccount :: error ",error);
        }
    }

    async login({email,password}){

        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwite Authservice :: login :: error ",error);
        }
    }

    async getCurrentUser(){   // islogin

        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwite Authservice :: getCurrentUser :: error ",error);
        }

        return null; // if user not found
    }

    async logout(){

        try {
            return await this.account.deleteSessions();  //Delete all sessions from the user account 
        } catch (error) {
            console.log("Appwite Authservice :: logout :: error ",error);
        }
    }

}

const authService= new AuthService();

export default authService