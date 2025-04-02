import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAcc = await this.account.create(ID.unique(), email, password, name);

            if (userAcc) {
                console.log("Account created successfully:", userAcc);
                const session = await this.login({ email, password });

                if (session) {
                    return userAcc;
                } else {
                    console.error("Login failed after account creation.");
                    return null;
                }
            } 
        } catch (error) {
            console.error("Appwrite AuthService :: createAccount :: error", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Appwrite AuthService :: login :: error", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            if (error.code === 401) {
                console.log("User is not logged in.");
            } else {
                console.error("Appwrite AuthService :: getCurrentUser :: error", error);
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
            console.error("Appwrite AuthService :: logout :: error", error);
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;
