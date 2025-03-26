import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService{

    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
 
    }

    async CreateAccount({email, password, name}) {
        try {
            const userAcc = await this.account.create(ID.unique(), email, password, name);
    
            if (userAcc) {  
                await this.login({ email, password }); // Ensure login completes
                return userAcc;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite AuthService :: CreateAccount :: error", error);
        }
    }
    
    async login({email,password}){

        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwite Authservice :: login :: error ",error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            if (error.code === 401) { 
                console.log("User is not logged in.");
            } else {
                console.log("Appwrite AuthService :: getCurrentUser :: error", error);
            }
            return null;
        }
    }
    

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully.");
            return true;
        } catch (error) {
            console.log("Appwrite AuthService :: logout :: error", error);
            return false;
        }
    }
    

}

const authService= new AuthService();

export default authService