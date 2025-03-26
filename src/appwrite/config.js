import conf from "../conf/conf.js"
import { Client, ID,Databases,Storage,Query } from "appwrite";
import {  Account } from "appwrite";
export class Service{

    client = new Client()
    databases;
    bucket;

    constructor(){

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title,sulg,content,feturedImage,status,userId}){

        try {

            return await databases.createDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                sulg, // documentId
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userId,
                }, // data
            );
            
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ",error);  
        }
    }
 
    async updatePost(sulg,{title,content,feturedImage,status}){

        try {

            return await databases.updateDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                sulg, // documentId
                {
                    title,
                    content,
                    feturedImage,
                    status,
                }, // data (optional)
               
            );
            
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error ",error);  
        }
    }

    async deletePost(sulg){

        try {

             await databases.deleteDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                sulg    // documentId
            );
            
            return true;

        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error ",error);    
            
            return true;
        }
    }

    async getPost(sulg){

        try {

            return await databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                sulg, // documentId
            );

       } catch (error) {
           console.log("Appwrite Service :: getPost :: error ",error);    
 
       }
    }

    async getPosts(queries= [Query.equal("status","active")]){ // to chage qury in feature

        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                /*
                    [ same
                        Query.equal("status","active")
                    ]
                */
            );

        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error ",error);  
        }
    }


    //File Uploaidng  Servises

    async uploadFile(file){

        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            
        } catch (error) {
            
            console.log("Appwrite Service :: uploadFile :: error ",error);  
        
        }
    }

    async deleteFile(fileId){

        try {

            await this.bucket.deleteFile(

                conf.appwriteBucketId, // bucketId
                fileId // fileId
            );

            return true;
            
        } catch (error) {
            
            console.log("Appwrite Service :: deleteFile :: error ",error);  
            return false;
        }
    }

    getFilePreview(fileId){

        try {

            return this.bucket.getFilePreview(
                conf.appwriteBucketId, // bucketId
                fileId, // fileId
            );
            
        } catch (error) {
            
            console.log("Appwrite Service :: getFilePreview :: error ",error);  
        
        }
    }
}

const service = new Service();

export default service;
