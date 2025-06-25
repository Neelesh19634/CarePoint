import { ID } from "appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { Query } from "node-appwrite";
import { parseStringify } from "../utils";

// ✅ Removed: import { InputFile } from 'node-appwrite/file'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return newUser;
  } catch (error: any) {
    if (error && error.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    console.error("User creation failed:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const fileBlob = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      const arrayBuffer = await fileBlob.arrayBuffer();
      const fileForUpload = new File([arrayBuffer], fileName);

      file = await storage.createFile(
        '6850bf25003ce33a42be', //Bucketid
        ID.unique(),
        fileForUpload
      );
    }
    console.log("Uploading file:", file);
  console.log("Creating patient with data:", {
  identificationDocumentId: file?.$id || null,
  identificationDocumentUrl: file ? `...url...` : null,
  ...patient
});


    const newpatient = await databases.createDocument(   
      '6850bdd8001223ab597d'!, //Databaseid
      '6850be450010f86fb0b0'!, //patient collection id
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `https://cloud.appwrite.io/v1/storage/buckets/6850bf25003ce33a42be/files/${file?.$id}/view?project=6850bc92002fe864954a`
          : null,
        ...patient,
      }
    );

    return parseStringify(newpatient);
  } catch (error) {
    console.log(error);
  }
};
